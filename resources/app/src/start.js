class Start {
    preload() {
        this.fullScreenSetup();
    };

    create() {
        
    };

    update() {
      
    };

    fullScreenSetup() {
        this.game.stage.backgroundColor = '#000000';

        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setResizeCallback(function() {$('body').show();}, this);
    }
}

module.exports = {
    Start: Start
};