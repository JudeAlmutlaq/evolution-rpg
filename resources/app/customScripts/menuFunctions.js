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

}