class Startup {
    preload() {
        this.fullScreenSetup();
        game.state.start('Main');
    };

    fullScreenSetup() {
        console.log(world);
        game.stage.backgroundColor = world.electronPhaserSettings.canvasBackgroundColor;

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setResizeCallback(function() {$('body').show();}, this);
    }
}

module.exports = {
    startup: Startup
};