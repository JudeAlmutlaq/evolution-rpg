class State extends MenuFunctions {
    preload() {
        game.load.image('battleBack', 'images/GrasslandBattleBackground.png');
        game.load.image ('brownCow', 'images/Cow.png');
        game.load.image('playerLeft', 'images/playerLeft2.png');
        game.load.image('captureButton', 'images/CaptureButton.png');
        game.load.image('captureButtonDown', 'images/CaptureButtonDown.png');


    };

    create() {

        this.grasslandBattleGraphics = game.add.group();
        this.battleBack = this.grasslandBattleGraphics.create(0, 0, 'battleBack');
        this.brownCow = this.grasslandBattleGraphics.create(350, 900, 'brownCow');
        this.brownCow.scale.set(.7);
        this.playerLeft = this.grasslandBattleGraphics.create(4700, 1200, 'playerLeft');
        this.playerLeft.scale.set(2.5);

        this.captureButton = this.grasslandBattleGraphics.create(4600, 2700, 'captureButton');
        this.captureButton.inputEnabled = true;
        this.captureButton.events.onInputOver.add(buttonHighlight, this);
        this.captureButton.events.onInputDown.add(captureChance, this);

        this.grasslandBattleGraphics.fullScreen();
        
    };

    update() {
      
    };
}

function buttonHighlight () {
    this.captureButtonDown = this.grasslandBattleGraphics.create(4600, 2700, 'captureButtonDown');
}

function captureChance (){
    let randomNumber = game.rnd.between(1,4);
    if (randomNumber == 4) {
        console.log("you did it!");
        this.brownCow.destroy();
        //this.brownCow = null;
        world.inventory.push(this.brownCow);
    }
}

module.exports = {
    state: State
};