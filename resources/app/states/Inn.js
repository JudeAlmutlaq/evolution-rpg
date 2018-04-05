class State {
    preload() {
        game.load.image('fightScene', 'images/Fightscene.jpg');

    };

    create() {
        game.add.sprite(0,0,'fightScene');

    };

    update() {

    };
}

module.exports = {
    state: State
};