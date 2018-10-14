
class OverworldFunctions extends MovementFunctions {

    postCreate__statBars (){
        console.log('Stat Bars');
        this.drawStats();

    }

    postCreate__finalize(){
        game.fixColors('#0d2b00', this.layers);
    }

    postCreate__setUpItems(){
        for (var i in this.pickUpItems){
            let item = this.pickUpItems [i];
            let sprite = game.add.sprite(item.x*32+16, item.y*32+16, item.spriteName);
            sprite.anchor.set(0.5);
            this.pickUpItems[i].itemSprite = sprite;
        }
    }

    getPlayerPosition() {
        return {x: world.playerOverworldX, y: world.playerOverworldY};
    }

    pickUp(){
        for (var i in this.pickUpItems){
            if (this.pickUpItems[i].itemSprite && this.player.overlap(this.pickUpItems[i].itemSprite)){
                this.pickUpItems[i].itemSprite.destroy();
                this.pickUpItems[i].itemSprite = null;
                world.inventory.push(this.pickUpItems[i]);
                this.openInventory();
                this.openInventory();
            }

        }
    }

    findEncounterZone (){
        if (this.encounterZone){
            return this.encounterZone[world.playerX][world.playerY];
        }
        return 0;
    }

    update__checkForEncounters() {
        if (game.rnd.between(1,600) !== 1){
            return;
        }
        let encounterZone = this.findEncounterZone();
        if (world.region){
            if (world.encounterList[world.region][encounterZone]){
                let possibleEncounters = world.encounterList[world.region][encounterZone].possibleEncounters;
                world.currentEncounterCreatures = this.randomizeEncounter(possibleEncounters);
                world.currentEncounterBattleBack = world.encounterList[world.region][encounterZone].battleBack;
                game.state.start("GrasslandBattle1");
            }
        }
    }

    update__overworldPosition () {
        world.playerOverworldX = this.player.body.x;
        world.playerOverworldY = this.player.body.y;
    }

    randomizeEncounter (possibleEncounters){
        let totalWeight = 0;
        for (let i = 0; i < possibleEncounters.length; i++){
            totalWeight += possibleEncounters[i].weight;
        }
        let randomEncounter = game.rnd.between(1,totalWeight);

        totalWeight = 0;
        for (let i = 0; i < possibleEncounters.length; i++){
            totalWeight += possibleEncounters[i].weight;
            if (totalWeight >= randomEncounter){
                return possibleEncounters[i].creatures;
            }
        }

    }

    update__statBars (){
        this.staminaBar.cropRect.width = this.statBarWidth*world.player.stamina;
        this.staminaBar.updateCrop();

        this.healthBar.cropRect.width = this.statBarWidth*world.player.health;
        this.healthBar.updateCrop();

        this.hungerBar.cropRect.width = this.statBarWidth*world.player.hunger;
        this.hungerBar.updateCrop();

    }

    update__stats(){
        world.player.hunger += .001;
        if (world.player.hunger >= .8) {
            world.player.stamina -= .001
        }
        if (world.player.stamina <= .2) {
            world.player.health -= .001
        }
    }

    drawStats (){
        this.statBars = game.add.group();

        this.statBars.create(10,625, 'barBackground');
        this.staminaBar = this.statBars.create(13,628, 'staminaBar');
        this.statBarWidth = this.staminaBar.width;
        let staminaRectangle = new Phaser.Rectangle(0,0,this.staminaBar.width*world.player.stamina,this.staminaBar.height);
        this.staminaBar.crop (staminaRectangle);

        this.statBars.create(10,655, 'barBackground');
        this.healthBar = this.statBars.create(13,658, 'healthBar');
        let healthRectangle = new Phaser.Rectangle(0,0,this.healthBar.width*world.player.health,this.healthBar.height);
        this.healthBar.crop (healthRectangle);

        this.statBars.create(10,685, 'barBackground');
        this.hungerBar = this.statBars.create(13,688, 'hungerBar');
        let hungerRectangle = new Phaser.Rectangle(0,0,this.hungerBar.width*world.player.hunger,this.hungerBar.height);
        this.hungerBar.crop (hungerRectangle);

        this.statBars.fixedToCamera = true;

    }
}