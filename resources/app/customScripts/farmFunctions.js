class FarmFunctions extends MovementFunctions {

    clickItem(sprite, pointer, itemInfo, itemNumber) {
        var jsondata = fs.readFileSync('./resources/app/images/farm.json');
        this.mapInfo = JSON.parse(jsondata);

        if (itemInfo.itemType === 'pen' && this.talkZone){
            sprite.destroy();
            world.inventory.splice(itemNumber, 1);
            this.openInventory();
            this.openInventory();
            this.penInHand = true;
            this.createPen();
        }
    }

    // talkPrompt() {
    //     console.log(world.playerX, world.playerY);
    //     let textStyle = { font: "50px Arial", fill: "#fff", align: "center" };
    //     this.talkPromptText = game.add.text(165, 155, "!", textStyle, this.farmGraphics);
    //     this.talkZone = true;
    // }

    // removeTalkPrompt(){
    //     this.talkPromptText.destroy();
    //     this.talkZone = false;
    //     this.talkPromptText = null;
    // }

    createPen () {
        if (this.penInHand && this.talkZone){
            console.log('pen in hand');
            this.animalPen = game.add.sprite(0, 0, 'animalPen');
        }
    }

    beginObjectCollision(properties) {
        console.log(properties);
        let textStyle = { font: "50px Arial", fill: "#fff", align: "center" };
        this.talkPromptText = game.add.text(properties.xPos*32+40, properties.yPos*32+80, "!", textStyle, this.farmGraphics);
        this.talkZone = true;
    };

    endObjectCollision(properties) {
        this.talkPromptText.destroy();
        this.talkZone = false;
        this.talkPromptText = null;
    };
}