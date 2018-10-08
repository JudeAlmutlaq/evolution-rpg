class MovementFunctions extends MenuFunctions {

    preload__Cursors(){

        this.cursors = {
            up:game.input.keyboard.addKey(Phaser.KeyCode.W),
            down:game.input.keyboard.addKey(Phaser.KeyCode.S),
            left:game.input.keyboard.addKey(Phaser.KeyCode.A),
            right:game.input.keyboard.addKey(Phaser.KeyCode.D),
        };
    }

    create__collisionGroups(){
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();
        this.talkCollisionGroup = game.physics.p2.createCollisionGroup();
    }

    create__player (){
        this.player = game.add.sprite(world.playerOverworldX, world.playerOverworldY, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        game.camera.follow(this.player);
    }

    postCreate__setCollisions(){

        this.player.body.setCollisionGroup(this.playerCollisionGroup);
        this.player.body.collides([this.wallsCollisionGroup, this.doorCollisionGroup, this.talkCollisionGroup]);

        this.doorOnCoolDown = true;

        this.player.bringToTop();
        this.player.moveDown();
    }

    setUpMap(file) {
        var jsondata = fs.readFileSync(file);
        this.mapInfo = JSON.parse(jsondata);


        var data = this.layerToGrid(this.mapInfo.layers[0]);
        this.encounterZone = this.layerToGrid(this.mapInfo.layers[1]);

        this.doorGroup = game.add.group();

        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data[x].length; y++) {

                if (data [x][y] === 1) {

                    let wall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                    game.physics.p2.enable(wall);
                    wall.body.static = true;
                    wall.body.setCollisionGroup(this.wallsCollisionGroup);
                    wall.body.collides(this.playerCollisionGroup);

                } else if (data [x][y] === 2) {
                    let door = game.add.sprite(x * 32 + 16, y * 32 + 16, 'doorSprite');
                    this.doorGroup.add(door);

                    game.physics.p2.enable(door);
                    door.body.static = true;

                    door.body.doorX = x;
                    door.body.doorY = y;

                    door.body.setCollisionGroup(this.doorCollisionGroup);
                    door.body.collides(this.playerCollisionGroup, this.openDoor, this);

                } else if (data [x][y] === 3) {
                    let water = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                    game.physics.p2.enable(water);
                    water.body.static = true;
                    water.body.setCollisionGroup(this.wallsCollisionGroup);
                    water.body.collides(this.playerCollisionGroup);

                } else if (data [x][y] === 5) {
                    let warp = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                    game.physics.p2.enable(warp);
                    warp.body.static = true;
                    warp.body.doorX = x;
                    warp.body.doorY = y;
                    warp.body.setCollisionGroup(this.wallsCollisionGroup);
                    warp.body.collides(this.playerCollisionGroup, this.openDoor, this);

                } else if (data [x][y] === 6) {
                    let talkZone = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                    game.physics.p2.enable(talkZone);
                    talkZone.body.static = true;
                    talkZone.body.setCollisionGroup(this.talkCollisionGroup);
                    talkZone.body.sensor = true;
                    talkZone.body.collides(this.playerCollisionGroup);
                    talkZone.body.onBeginContact.add(this.talkPrompt, this);
                    talkZone.body.onEndContact.add(this.removeTalkPrompt, this);

                }
            }
        }
    }

    layerToGrid(layer){
        let grid = [];
        for (let x = 0; x < layer.width; x++){
            grid.push([]);
            for (let y = 0; y < layer.height; y++){
                grid[x].push(0);
            }
        }
        for (var i = 0; i < layer.height * layer.width; i++) {

            var x = i % layer.width;
            var y = i / layer.width;
            y = Math.floor(y);
            grid[x][y]=layer.data[i];
        }
        return grid;
    }

    openDoor (doorBody, playerBody) {
        console.log('open door');
        if (this.doorOnCoolDown){
            return;
        }
        for (var i in this.doorTransition) {
            let transition = this.doorTransition[i];
            if (transition.x === doorBody.doorX && transition.y === doorBody.doorY && transition.state) {
                if (transition.newX !== undefined && transition.newY !== undefined){
                    world.playerX = transition.newX;
                    world.playerY = transition.newY;
                    world.playerOverworldX = world.playerX*32+16;
                    world.playerOverworldY = world.playerY*32+16;
                }
                game.state.start(transition.state);

            }
        }
    }

    update__handleMovement(){
        world.playerX = Math.floor (this.player.body.x/32);
        world.playerY = Math.floor (this.player.body.y/32);
        //this.findEncounterZone();
        this.player.body.setZeroVelocity();

        var xDir = 0;
        var yDir = 0;
        var speed = 0;

        if (this.cursors.up.isDown) {
            yDir--;
        }
        if (this.cursors.down.isDown) {
            yDir++;
        }
        if (this.cursors.left.isDown) {
            xDir--;
        }
        if (this.cursors.right.isDown) {
            xDir++;
        }
        if (xDir && yDir){
            speed = 106;
        } else {
            speed = 150;
        }
        if (xDir || yDir) {
            this.doorOnCoolDown = false;
        }
        this.player.body.velocity.x = xDir*speed;
        this.player.body.velocity.y = yDir*speed;
        if (yDir === -1){
            this.player.animations.play('up');
        } else if (yDir === 1){
            this.player.animations.play('down');
        } else if (xDir === -1){
            this.player.animations.play('left');
        }else if (xDir === 1){
            this.player.animations.play('right');
        }else {
            this.player.animations.stop();
        }

    }

}