class FarmFunctions extends MovementFunctions {

    clickItem(sprite, pointer, itemInfo, itemNumber) {
        if (itemInfo.itemType === 'pen' && this.talkZone){
            sprite.destroy();
            world.inventory.splice(itemNumber, 1);
            this.openInventory();
            this.openInventory();
            this.penInHand = true;
            this.createPen();
        }
    }

    talkPrompt() {
        console.log(world.playerX, world.playerY);
        let textStyle = { font: "50px Arial", fill: "#fff", align: "center" };
        this.talkPromptText = game.add.text(165, 155, "!", textStyle, this.farmGraphics);
        this.talkZone = true;
    }

    removeTalkPrompt(){
        this.talkPromptText.destroy();
        this.talkZone = false;
        this.talkPromptText = null;
    }

    createPen () {
        if (this.penInHand && this.talkZone){
            console.log('pen in hand');
            this.animalPen = game.add.sprite(0, 0, 'animalPen');
        }
    }

    beginObjectCollision(properties) {
        console.log("I've collided", properties);
    };

    endObjectCollision(properties) {
        console.log("not");
    };
}