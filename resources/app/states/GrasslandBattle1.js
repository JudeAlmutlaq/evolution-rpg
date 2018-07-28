class State {
    preload() {
        game.load.image('battleBack', 'images/backgrounds/grassland.png');

    };

    create() {

        this.grasslandBattleGraphics = game.add.group();
        this.battleBack = game.add.image('battleBack');

        this.grasslandBattleGraphics.fullScreen();
        
    };

    update() {
      
    };
}

module.exports = {
    state: State
};