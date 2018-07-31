
class OverworldFunctions extends MenuFunctions {

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

    postCreate__setCollisions(){

        this.player.body.setCollisionGroup(this.playerCollisionGroup);
        this.player.body.collides([this.wallsCollisionGroup, this.doorCollisionGroup, this.talkCollisionGroup]);
    }

    create__setUpInventory(){
        this.inventoryGroup = this.game.add.group();
        this.inventoryGroup.scale.set(0.25);
        this.inventoryGroup.fixedToCamera = true;


        this.goldTextStyle = { font: "55px Arial", fill: "#af8f00", align: "center" };
        this.inventoryGroup.create(0,0, 'inventorySprite');
        this.goldText = game.add.text(1080, 1633, world.playerGold, this.goldTextStyle, this.inventoryGroup);
        this.goldText.anchor.setTo(1);

        this.inventoryGroup.cameraOffset.x = game.camera.width-this.inventoryGroup.width;
        this.inventoryGroup.cameraOffset.y = game.camera.height-this.inventoryGroup.height;

        this.inventoryGroup.visible = false;

        this.inventoryKey = game.input.keyboard.addKey(Phaser.KeyCode.I);
        this.inventoryKey.onUp.add(this.openInventory, this);
    }

    openInventory(){
        if (this.inventoryGroup.visible === false ){
            this.inventoryGroup.visible = true;
            game.world.bringToTop(this.inventoryGroup);
            console.log('yes');
            for (var i in world.inventory){
                let x = i%8;
                let y = Math.floor(i/8);
                world.inventory[i].itemSprite = this.inventoryGroup.create(x*128+100, y*128+280, world.inventory[i].spriteName);
                world.inventory[i].itemSprite.width = 96;
                world.inventory[i].itemSprite.height = 96;

            }
        } else if (this.inventoryGroup.visible === true){
            this.inventoryGroup.visible = false;
            for (var i in world.inventory){
                world.inventory[i].itemSprite.destroy();
                world.inventory[i].itemSprite = null;
            }
            console.log('no');
        }
    }


    postCreate__finalize(){
        game.fixColors('#0d2b00', this.layers);
    }

    postCreate__setUpItems(){
        for (var i in this.pickUpItems){
            let item = this.pickUpItems [i];
            let sprite = game.add.sprite(item.x*32+16, item.y*32+16, item.spriteName);
            sprite.anchor.set(0.5);
            this.pickUpItems[i].itemSprite = sprite;


        }
    }

    pickUp(){
        for (var i in this.pickUpItems){
            if (this.pickUpItems[i].itemSprite && this.player.overlap(this.pickUpItems[i].itemSprite)){
                console.log(this.pickUpItems[i]);
                console.log([i]);
                this.pickUpItems[i].itemSprite.destroy();
                this.pickUpItems[i].itemSprite = null;
                world.inventory.push(this.pickUpItems[i]);
                console.log(world.inventory);
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

    setUpMap(file) {
        var jsondata = fs.readFileSync(file);
        this.mapInfo = JSON.parse(jsondata);
        console.log(this.mapInfo);
        this.encounterZone = this.mapInfo.layers[6];

        var data = this.layerToGrid(this.mapInfo.layers[0]);


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

    openDoor (doorBody, playerBody) {
        this.music.stop();

        for (var i in this.doorTransition) {
            let transition = this.doorTransition[i];
            if (transition.x === doorBody.doorX && transition.y === doorBody.doorY && transition.state) {
                game.state.start(transition.state);
            }
        }
    }


    update__handleMovement(){
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