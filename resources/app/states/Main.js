
class State {

    preload() {
        game.load.image('openingGraphics', 'images/backgrounds/openingGraphics.png');
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

        this.openingGraphics = game.add.sprite(0, 0, 'openingGraphics');

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
    world.playerX = 6;
    world.playerY = 6;
    world.playerOverworldX = world.playerX*32+16;
    world.playerOverworldY = world.playerY*32+16;

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
