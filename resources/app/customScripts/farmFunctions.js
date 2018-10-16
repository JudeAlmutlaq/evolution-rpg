class FarmFunctions extends MovementFunctions {

    clickItem(sprite, pointer, itemInfo, itemNumber) {
        if (itemInfo.itemType === 'pen'){
            sprite.destroy();
            world.inventory.splice(itemNumber, 1);
            this.openInventory();
            this.openInventory();
            this.penInHand = true;
        }
        if (this.penInHand && this.talkZone){
            console.log('pen in hand');
            this.animalPen = game.add.sprite(0, 0, 'animalPen');
        }

    }

    talkPrompt(){
        let textStyle = { font: "50px Arial", fill: "#fff", align: "center" };
        this.talkPromptText = game.add.text(165, 155, "!", textStyle, this.farmGraphics);
        this.talkZone = true;
    }

    removeTalkPrompt(){
        this.talkPromptText.destroy();
        this.talkZone = false;
        //this.talkPromptText = null;

    }

    createPen (){

    }
}