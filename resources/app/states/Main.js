var button;
var jungle;
var music;
var exitButton;


class State {

    preload() {
        game.load.image('jungle_1', 'images/backgrounds/Jungle_1.png');
        game.load.image('button', 'images/button.png');
        game.load.image('exitButton', 'images/exitButton.png');
        game.load.audio('openingMusic', ['audio/openingMusic.ogg']);
    };

    create() {

        music = game.add.audio('openingMusic');
        //music.play();

        game.stage.backgroundColor = "#0d2b00";

        jungle = game.add.sprite(game.camera.width/2, game.camera.height/2, 'jungle_1');

        jungle.anchor.setTo(0.5);

        jungle.scale.x = 1.5;
        jungle.scale.y = 1.5;

        button = game.add.image(game.camera.width/2, game.camera.height/2, 'button' );
        button.anchor.setTo(0.5);
        button.inputEnabled = true;
        button.events.onInputDown.add(toTown);

        exitButton = game.add.image(game.camera.width/2, game.camera.height/2+150, 'exitButton' );
        exitButton.anchor.setTo(0.5);
        exitButton.inputEnabled = true;
        exitButton.events.onInputDown.add(closeWindow);

    };

    update() {

    };
}

function toTown() {

    game.state.start('Town');
    music.stop();
    world.playerGold = 100;

}


module.exports = {
    state: State
};
