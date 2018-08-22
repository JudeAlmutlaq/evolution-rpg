class State extends MenuFunctions {
    preload() {

        game.load.image('battleBack', 'images/GrasslandBattleBackground.png');
        game.load.image ('cowBrown', 'images/creatures/Cow.png');
        game.load.image ('cowBlack', 'images/creatures/BlackCow.png');
        game.load.image ('brownHorse', 'images/creatures/brownHorse.png');
        game.load.image ('zebra', 'images/creatures/zebra.png');
        game.load.image ('hyena', 'images/creatures/hyena.png');
        game.load.image ('lioness', 'images/creatures/lioness.png');
        game.load.image('playerLeft', 'images/playerLeft2.png');
        game.load.image ('brownLlama', 'images/creatures/brownLlama.png');
        game.load.image('captureButton', 'images/CaptureButton.png');
        game.load.image('captureButtonDown', 'images/CaptureButtonDown.png');


    };

    create() {
        this.grasslandBattleGraphics = game.add.group();
        this.battleBack = this.grasslandBattleGraphics.create(0, 0, 'battleBack');
        this.allCreatures = [];


        console.log(world.currentEncounterCreatures);
        this.totalCaptured = 0;

        for (let i = 0; i < world.currentEncounterCreatures.length; i++){
            let creatureSprite = this.grasslandBattleGraphics.create(350+650*i, 900+700*i, world.currentEncounterCreatures[i]);
            let creatureStats = {captureOdds: game.rnd.between(1,10), ...world.creatureList[world.currentEncounterCreatures[i]], itemSprite: creatureSprite, captured: false};
            this.allCreatures.push(creatureStats);
            game.add.text(47+50*i, 5, creatureStats.captureOdds, {font: "12px Arial", fill: "#fff", align: "center" });
            creatureSprite.scale.set(.7);
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