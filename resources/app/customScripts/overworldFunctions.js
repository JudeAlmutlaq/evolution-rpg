console.log('hello');

class OverworldFunctions {

    preload__Cursors(){
        this.cursors = game.input.keyboard.createCursorKeys();
        console.log('bananas2')
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
        } else if (this.inventoryGroup.visible === true){
            this.inventoryGroup.visible = false;
            console.log('no');
        }
    }

    create__setUpPauseMenu(){
        this.pauseMenuGroup = this.game.add.group();
        this.pauseMenuGroup.create(0,0, 'pauseMenuGroup');
        this.pauseMenuGroup.fixedToCamera = true;
        this.pauseMenuGroup.visible = false;
        this.pauseMenuGroup.fullScreen();

        this.menuKey = game.input.keyboard.addKey(Phaser.KeyCode.ESC);
        this.menuKey.onUp.add(this.openMenu, this);

        //buttons
        this.menuLeaveToMenu = this.pauseMenuGroup.create(110,200, 'menuLeaveToMenu');
        this.menuLeaveToMenu.x = this.pauseMenuGroup.getLocalBounds().width/2;
        this.menuLeaveToMenu.inputEnabled = true;
        this.menuLeaveToMenu.events.onInputDown.add(this.toMain, this);
        this.menuLeaveToMenu.anchor.set(0.5);

        this.menuLeaveToDesktop = this.pauseMenuGroup.create(0,350, 'menuLeaveToDesktop');
        this.menuLeaveToDesktop.x = this.pauseMenuGroup.getLocalBounds().width/2;
        this.menuLeaveToDesktop.inputEnabled = true;
        this.menuLeaveToDesktop.events.onInputDown.add(closeWindow);
        this.menuLeaveToDesktop.anchor.set(0.5);

        this.menuResumeButton = this.pauseMenuGroup.create(0,500, 'menuResumeButton');
        this.menuResumeButton.x = this.pauseMenuGroup.getLocalBounds().width/2;
        this.menuResumeButton.inputEnabled = true;
        this.menuResumeButton.events.onInputDown.add(this.closeMenu, this);
        this.menuResumeButton.anchor.set(0.5);



    }

    openMenu(){
        if (this.pauseMenuGroup.visible === false ){
            this.pauseMenuGroup.visible = true;
            game.world.bringToTop(this.pauseMenuGroup);
            console.log('yes');
        } else if (this.pauseMenuGroup.visible === true){
            this.pauseMenuGroup.visible = false;
            console.log('no');
        }
    }

    closeMenu(){
        this.pauseMenuGroup.visible = false;
    }

    toMain(){
        game.state.start('Main');
    }

    postCreate__finalize(){
        game.fixColors('#0d2b00', this.layers);
    }

    postCreate__setUpItems(){
        for (var i in this.pickUpItems){
            let item = this.pickUpItems [i];
            let sprite = game.add.sprite(item.x*32+16, item.y*32+16, item.itemName);
            sprite.anchor.set(0.5);
            this.pickUpItems[i].itemSprite = sprite;


        }
    }

    pickUp(){
        for (var i in this.pickUpItems){
            if (this.player.overlap(this.pickUpItems[i].itemSprite)){
                console.log(this.pickUpItems[i]);
                console.log([i]);
                //this.pickUpItems[i].itemSprite.destroy();
                world.inventory.push(this.pickUpItems[i]);
                console.log(world.inventory);
            }

        }
    }

    setUpMap(file) {
        var jsondata = fs.readFileSync(file);
        var mapInfo = JSON.parse(jsondata);
        console.log(mapInfo);

        var height = mapInfo.layers[0].height;
        var width = mapInfo.layers[0].width;
        var data = mapInfo.layers[0].data;


        for (var i = 0; i < height * width; i++) {

            var x = i % width;
            var y = i / width;
            y = Math.floor(y);

            if (data [i] === 1) {

                var redWall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(this.wallsCollisionGroup);
                redWall.body.collides(this.playerCollisionGroup);

            } else if (data [i] === 2) {
                this.doorSprite = game.add.sprite(x * 32 + 16, y * 32 + 16, 'doorSprite');
                game.physics.p2.enable(this.doorSprite);
                this.doorSprite.body.static = true;

                this.doorSprite.body.doorX = x;
                this.doorSprite.body.doorY = y;

                this.doorSprite.anchor.setTo(0.5);
                this.doorSprite.body.setCollisionGroup(this.doorCollisionGroup);

                this.doorSprite.body.collides(this.playerCollisionGroup, this.openDoor, this);

                console.log(x, y, 'MONKEYS');

            } else if (data [i] === 3) {
                redWall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(this.wallsCollisionGroup);
                redWall.body.collides(this.playerCollisionGroup);

            } else if (data [i] === 5) {
                redWall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.body.doorX = x;
                redWall.body.doorY = y;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(this.wallsCollisionGroup);
                redWall.body.collides(this.playerCollisionGroup, this.openDoor, this);
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