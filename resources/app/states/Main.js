
class State {

    preload() {
        game.load.image('jungle_1', 'images/openingGraphics.png');
        game.load.image('button', 'images/startButton.png');
        game.load.image('exitButton', 'images/exitButton.png');
        game.load.audio('openingMusic', ['audio/openingMusic.ogg']);

        game.load.image('barBackground', 'images/load_bar_bg.png');
        game.load.image('staminaBar', 'images/load_bar_1.png');
        game.load.image('hungerBar', 'images/load_bar_2.png');
        game.load.image('healthBar', 'images/load_bar_3.png');
    };

    create() {
        this.music = game.add.audio('openingMusic');
        //this.music.play();

        game.stage.backgroundColor = "#0d2b00";

        this.jungle = game.add.sprite(game.camera.width/2, game.camera.height/2, 'jungle_1');

        this.jungle.anchor.setTo(0.5);

        this.button = game.add.image(game.camera.width/2, game.camera.height/2, 'button' );
        this.button.anchor.setTo(0.5);
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(newGame);

        this.exitButton = game.add.image(game.camera.width/2, game.camera.height/2+150, 'exitButton' );
        this.exitButton.anchor.setTo(0.5);
        this.exitButton.inputEnabled = true;
        this.exitButton.events.onInputDown.add(closeWindow);

        world.inventory = [];

    };

    update() {

    };
}

function newGame() {
    world.playerX = 28;
    world.playerY = 31;
    world.playerPixelX = world.playerX*32+16;
    world.playerPixelY = world.playerY*32+16;

    world.player = {};
    world.player.stamina = 1;
    world.player.health = 1;
    world.player.hunger = 0;

    game.state.start('Town');
    //this.music.stop();
    world.playerGold = 100;
    world.weaponShopGold = 150;
    world.weaponShopItems = [
        {spriteName:'swordWood', displayName:'Wooden Sword', attack: 3, cost: 50},
        {spriteName:'sword', displayName:'Sword', attack: 50, cost: 400},
        {spriteName:'sword', displayName:'Sword', attack: 50, cost: 300},
        {spriteName:'sword', displayName:'Sword', attack: 50, cost: 800},
    ]

}


module.exports = {
    state: State
};
