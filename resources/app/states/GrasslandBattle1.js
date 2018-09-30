class State extends MenuFunctions {
    preload() {

        game.load.image('grassBattleBack', 'images/GrasslandBattleBackground.png');
        game.load.image ('cowBrown', 'images/creatures/Cow.png');
        game.load.image ('cowBlack', 'images/creatures/BlackCow.png');
        game.load.image ('brownHorse', 'images/creatures/brownHorse.png');
        game.load.image ('zebra', 'images/creatures/zebra.png');
        game.load.image ('elephant', 'images/creatures/elephant.png');
        game.load.image ('armadillo', 'images/creatures/armadillo.png');
        game.load.image ('hyena', 'images/creatures/hyena.png');
        game.load.image ('lioness', 'images/creatures/lioness.png');
        game.load.image('playerLeft', 'images/playerLeft2.png');
        game.load.image ('brownLlama', 'images/creatures/brownLlama.png');
        game.load.image('captureButton', 'images/CaptureButton.png');
        game.load.image('captureButtonDown', 'images/CaptureButtonDown.png');


    };

    create() {
        this.grasslandBattleGraphics = game.add.group();
        this.battleBack = this.grasslandBattleGraphics.create(0, 0, world.currentEncounterBattleBack);
        this.allCreatures = [];


        //console.log(world.currentEncounterCreatures);
        this.totalCaptured = 0;

        for (let i = 0; i < world.currentEncounterCreatures.length; i++){
            let creature = world.currentEncounterCreatures[i];
            let creatureSprite = this.grasslandBattleGraphics.create(creature.x, creature.y, creature.name);
            let creatureStats = {captureOdds: game.rnd.between(1,10), ...world.creatureList[creature.name], itemSprite: creatureSprite, captured: false};
            this.allCreatures.push(creatureStats);
            game.add.text(47+50*i, 5, creatureStats.captureOdds, {font: "12px Arial", fill: "#fff", align: "center" });

            creatureSprite.width=creature.width;
            creatureSprite.scale.set(creatureSprite.scale.x);
        }
        this.playerLeft = this.grasslandBattleGraphics.create(900, 300, 'playerLeft');
        this.playerLeft.scale.set(.5);

        let buttons = [
            {text: "Capture", function: this.captureChance},
            {text: "Use Item", function: this.itemMenu}
        ];

        for (let i = 0; i < buttons.length; i++){
            this.captureButton = this.grasslandBattleGraphics.create(900, 400+i*100, 'captureButton');
            this.captureButton.scale.set(.25);
            this.captureButton.inputEnabled = true;
            this.captureButton.events.onInputOver.add(this.buttonHighlight, this, 0, i);
            this.captureButton.events.onInputOut.add(this.buttonUnhighlight, this);
            this.captureButton.events.onInputDown.add(buttons[i].function, this);
        }

        this.grasslandBattleGraphics.fullScreen();

    };

    update() {

    };
    itemMenu(){
        console.log("Item Menu");
    }
    buttonHighlight (sprite, game, i) {
        this.captureButtonDown = this.grasslandBattleGraphics.create(900, 400+i*100, 'captureButtonDown');
        this.captureButtonDown.scale.set(0.25);
    }
    buttonUnhighlight (){
        this.captureButtonDown.destroy();
    }

    captureChance (){
        for (let i = 0; i < this.allCreatures.length; i++){
            let creature = this.allCreatures[i];

            let randomNumber = game.rnd.between(1,creature.captureOdds);
            if (randomNumber === 1 && creature.captured === false) {
                this.totalCaptured ++;
                creature.captured = true;
                creature.itemSprite.destroy();
                world.inventory.push(creature);
            }
        }
        if (this.totalCaptured === this.allCreatures.length){
            game.state.start(world.region, true, false, world.playerX, world.playerY);
        }

    }
}



module.exports = {
    state: State
};