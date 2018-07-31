class State extends MenuFunctions {
    preload() {
        game.load.image('battleBack', 'images/GrasslandBattleBackground.png');
        game.load.image ('cowBrown', 'images/Cow.png');
        game.load.image('playerLeft', 'images/playerLeft2.png');
        game.load.image('captureButton', 'images/CaptureButton.png');
        game.load.image('captureButtonDown', 'images/CaptureButtonDown.png');


    };

    create() {
        this.grasslandBattleGraphics = game.add.group();
        this.battleBack = this.grasslandBattleGraphics.create(0, 0, 'battleBack');
        this.allCreatures = [];

        let numberOfCows = game.rnd.between(1,3);
        this.totalCaptured = 0;

        for (let i = 0; i < numberOfCows; i++){
            let cowBrownSprite = this.grasslandBattleGraphics.create(350+650*i, 900+700*i, 'cowBrown');
            let cowStats = {captureOdds: game.rnd.between(1,10), ...world.creatureList.cowBrown, itemSprite: cowBrownSprite, captured: false};
            this.allCreatures.push(cowStats);
            game.add.text(47+50*i, 5, cowStats.captureOdds, {font: "12px Arial", fill: "#fff", align: "center" });
            cowBrownSprite.scale.set(.7);
        }
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
    for (let i = 0; i < this.allCreatures.length; i++){
        let creature = this.allCreatures[i];

        let randomNumber = game.rnd.between(1,creature.captureOdds);
        if (randomNumber === 1 && creature.captured === false) {
            this.totalCaptured ++;
            creature.captured = true;
            console.log("you did it!");
            creature.itemSprite.destroy();
            //this.cowBrown = null;
            world.inventory.push(creature);
            //game.state.start("Town");
        }
    }
    if (this.totalCaptured === this.allCreatures.length){
        game.state.start("Town");
    }

}

module.exports = {
    state: State
};