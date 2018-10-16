class MenuFunctions {
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
        } else if (this.pauseMenuGroup.visible === true){
            this.pauseMenuGroup.visible = false;
        }
    }

    closeMenu(){
        this.pauseMenuGroup.visible = false;
    }

    toMain(){
        game.state.start('Main');
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
            for (var i in world.inventory){
                let x = i%8;
                let y = Math.floor(i/8);
                let item = this.inventoryGroup.create(x*128+100, y*128+280, world.inventory[i].spriteName);
                world.inventory[i].itemSprite = item;
                item.width = 96;
                item.height = 96;

                item.inputEnabled = true;
                item.events.onInputDown.add(this.clickItem, this, true, world.inventory[i], i);


            }
        } else if (this.inventoryGroup.visible === true){
            this.inventoryGroup.visible = false;
            for (var i in world.inventory){
                if (world.inventory[i].itemSprite) {
                    world.inventory[i].itemSprite.destroy();
                    world.inventory[i].itemSprite = null;
                }
            }
        }
    }

    clickItem(sprite, pointer, itemInfo, itemNumber) {
        if (itemInfo.nutrition > 0){
            sprite.destroy();
            world.inventory.splice(itemNumber, 1);
            this.openInventory();
            this.openInventory();
            world.player.hunger -= itemInfo.nutrition;
            if (world.player.hunger < 0){
                world.player.hunger = 0;
            }
        }

    }
}