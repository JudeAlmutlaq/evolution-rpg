var text;
var exitText;
var style;
var style2;
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

        jungle = game.add.sprite(game.world.centerX, game.world.centerY, 'jungle_1')

        jungle.anchor.setTo(0.5);

        jungle.scale.x = 1.5;
        jungle.scale.y = 1.5;

        button = game.add.image(game.world.centerX, game.world.centerY, 'button' );
        button.anchor.setTo(0.5);
        button.scale.x = 0.2;
        button.scale.y = 0.2;
        button.inputEnabled = true;
        button.events.onInputDown.add(toTown);

        exitButton = game.add.image(game.world.centerX, game.world.centerY+150, 'exitButton' );
        exitButton.anchor.setTo(0.5);
        exitButton.scale.x = 0.2;
        exitButton.scale.y = 0.2;
        exitButton.inputEnabled = true;
        exitButton.events.onInputDown.add (closeWindow);

        style = { font: "35px Arial", fill: "#adffcd", allign: "center" };
        style2 ={ font: "35px Arial", fill: "#ffc1c1", allign: "center" };

        text = game.add.text(game.world.centerX, game.world.centerY, "Begin Adventure!", style);
        exitText = game.add.text(game.world.centerX, game.world.centerY+150, "Leave!", style2);

        text.anchor.setTo(0.5);
        exitText.anchor.setTo(0.5);

    };

    update() {

    };
}

function toTown() {

    game.state.start('Town');
    music.stop();

}

module.exports = {
    state: State
};
