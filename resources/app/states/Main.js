
class State {

    preload() {
        game.load.image('jungle_1', 'images/backgrounds/Jungle_1.png');
        game.load.image('button', 'images/button.png');
        game.load.image('exitButton', 'images/exitButton.png');
        game.load.audio('openingMusic', ['audio/openingMusic.ogg']);
    };

    create() {

        this.music = game.add.audio('openingMusic');
        //this.music.play();

        game.stage.backgroundColor = "#0d2b00";

        this.jungle = game.add.sprite(game.camera.width/2, game.camera.height/2, 'jungle_1');

        this.jungle.anchor.setTo(0.5);

        this.jungle.scale.x = 1.5;
        this.jungle.scale.y = 1.5;

        this.button = game.add.image(game.camera.width/2, game.camera.height/2, 'button' );
        this.button.anchor.setTo(0.5);
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(toTown);

        this.exitButton = game.add.image(game.camera.width/2, game.camera.height/2+150, 'exitButton' );
        this.exitButton.anchor.setTo(0.5);
        this.exitButton.inputEnabled = true;
        this.exitButton.events.onInputDown.add(closeWindow);

    };

    update() {

    };
}

function toTown() {

    game.state.start('Town');
    //this.music.stop();
    world.playerGold = 100;

}


module.exports = {
    state: State
};
