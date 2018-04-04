var text;
var style;
var button;
var jungle;
var music;


class State {

    preload() {
        game.load.image('jungle_1', 'images/backgrounds/Jungle_1.png');
        game.load.image('button', 'images/button.png');
        game.load.audio('openingMusic', ['audio/openingMusic.ogg']);
    };

    create() {

        music = game.add.audio('openingMusic');
        music.play();

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

        style = { font: "35px Arial", fill: "#adffcd", allign: "center" };

        text = game.add.text(game.world.centerX, game.world.centerY, "Begin Adventure!", style);

        text.anchor.setTo(0.5);

    };

    update() {

    };
}

function toTown() {

    game.state.start('Town');

}

module.exports = {
    state: State
};
