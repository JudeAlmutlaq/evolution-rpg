
class State extends ShopFunctions {

    init(){
    }

    preload() {
        this.shopGUI = new GUI('./resources/app/gui/shop/shop.gui');
        this.playerGUI = new GUI('./resources/app/gui/shop/shop.gui');
        game.load.tilemap('shop', 'images/grasslandTown/weaponShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('interiorTiles', 'images/interiorTiles.png');

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);

        game.load.spritesheet('shopKeeper', 'images/grasslandTown/weaponChar.png', 32, 32, 12);

        game.load.image('weaponShopMenu', 'images/weaponShopMenu.png');
        game.load.image('weaponShopMenuContainer', 'images/weaponShopMenuContainer.png');
        game.load.image('inventoryMenuContainer', 'images/inventoryMenuContainer.png');

    };

    create() {
        this.shopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.shop = game.add.tilemap('shop');
        this.shop.addTilesetImage('interiorTiles', 'interiorTiles');

        this.layer0 = this.shop.createLayer('ground', 544, 480);
        this.layer0.resizeWorld();
        this.layer1 = this.shop.createLayer('foreground1', 544, 480);
        this.layer2 = this.shop.createLayer('foreground2', 544, 480);
        this.layer3 = this.shop.createLayer('above', 544, 480);
        this.shopGraphics.add(this.layer0);
        this.shopGraphics.add(this.layer1);
        this.shopGraphics.add(this.layer2);
        this.shopGraphics.add(this.layer3);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.shopKeeper = this.shopGraphics.create(256, 96,'shopKeeper');
        this.shopKeeper.frame = 1;

        this.player = this.shopGraphics.add(this.player);

        this.door = this.shopGraphics.create(336, 464, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.setUpMap('./resources/app/images/grasslandTown/weaponShop.json');

        this.shopGraphics.fullScreen();

        let enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onUp.add(this.openShopMenu, this);

        game.input.mouse.mouseWheelCallback = this.scrollInventory.bind(this);

        this.shopGUI.render();
        this.fillShopInventory();
        this.shopGUI.visible = false;
        this.shopGUI.x = 255;
        this.shopGUI.y = 45;

        this.playerGUI.render();
        this.fillPlayerInventory();
        this.playerGUI.visible = false;
        this.playerGUI.x = 755;
        this.playerGUI.y = 45;
    };

    getPlayerPosition() {
        return {x: 336, y: 430};
    }

    update() {
    };

    toTown () {
        game.state.start('Town', true, false, 20, 31);

    }

    fillShopInventory() {
        for (let index in world.weaponShopItems) {
            let item = world.weaponShopItems[index];
            let itemGraphic = this.shopGUI.groups.group1.addInstance();
            itemGraphic.goldNumber.text = item.cost;
            itemGraphic.itemName.text = item.displayName;
            itemGraphic.stat.text = 'Attack: ' + item.attack;
            itemGraphic.image.swap(item.spriteName);
            itemGraphic.itemZone.onInputDown.add(this.itemClick, this, 0, index);
        }
    }

    fillPlayerInventory() {
        for (let index in world.inventory) {
            let item = world.inventory[index];
            let itemGraphic = this.playerGUI.groups.group1.addInstance();
            itemGraphic.goldNumber.text = item.cost;
            itemGraphic.itemName.text = item.displayName;
            itemGraphic.stat.text = 'Attack: ' + item.attack;
            itemGraphic.image.swap(item.spriteName);
            // itemGraphic.itemZone.onInputDown.add(this.itemClick, this, 0, index);
        }
    }

    itemClick (target, pointer, index) {
        console.log('item is clicked');
        this.shopGUI.groups.group1.removeInstance(index);
    }

    openShopMenu (){
        if (this.talkPromptText){
            if (this.shopGUI.visible === false){
                this.shopGUI.visible = true;
                this.playerGUI.visible = true;
            }else {
                this.shopGUI.visible = false;
                this.playerGUI.visible = false;
            }
        }
    }

    displayItem(x,y,item){
        let itemGroup = game.add.group();
        let textStyle = { font: "12px Arial", fill: "#fff", align: "center" };
        itemGroup.position.set(x,y);
        let itemBar = itemGroup.create(0, 0, 'weaponShopMenu');
        let itemSprite = itemGroup.create(10, 5, item.spriteName);
        itemSprite.width = 32;
        itemSprite.height = 32;
        game.add.text(47, 5, item.displayName, textStyle, itemGroup);
        game.add.text(47, 20, "Attack: "+item.attack, textStyle, itemGroup);
        game.add.text(190, 20, item.cost+" Gold", textStyle, itemGroup).anchor.set(1,0);
        this.shopGroup.add(itemGroup);
        return itemBar;
    }

    buyItem(sprite, test, item, itemNumber){
        if (world.playerGold >= item.cost){
            sprite.parent.destroy();
            world.weaponShopItems.splice(itemNumber, 1);
            world.inventory.push(item);
            world.playerGold -= item.cost;
            world.weaponShopGold += item.cost;
            item.cost /= 2;
            this.remakeShopMenu();
        }


    }

    sellItem(sprite, test, item, itemNumber){
        if (world.weaponShopGold >= item.cost){
            sprite.parent.destroy();
            world.inventory.splice(itemNumber, 1);
            world.weaponShopItems.push(item);
            world.playerGold += item.cost;
            world.weaponShopGold -= item.cost;
            item.cost *= 2;
            this.remakeShopMenu();
        }


    }

    createShopMenu (){
        this.shopGroup = game.add.group();
        this.shopGroup.create(game.camera.width/2-255, 37,'weaponShopMenuContainer');
        this.shopGroup.create(game.camera.width/2+45, 37,'inventoryMenuContainer');

        for (let i in world.weaponShopItems){
            if (i >= this.shopScroll && i < this.shopScroll+8){
                let itemBar = this.displayItem(game.camera.width/2-250, (i-this.shopScroll)*48+100, world.weaponShopItems[i]);
                itemBar.inputEnabled = true;
                itemBar.events.onInputDown.add(this.buyItem, this, 0, world.weaponShopItems[i], i);
            }
        }
        for (let i in world.inventory){
            if (i >= this.inventoryScroll && i < this.inventoryScroll+8){
                let itemBar = this.displayItem(game.camera.width/2+50, (i-this.inventoryScroll)*48+100, world.inventory[i]);
                itemBar.inputEnabled = true;
                itemBar.events.onInputDown.add(this.sellItem, this, 0, world.inventory[i], i);
            }
        }
        this.goldTextStyle = { font: "15px Arial", fill: "#af8f00", align: "center" };
        this.inventoryGold = game.add.text(game.camera.width/2+245, 510, world.playerGold, this.goldTextStyle, this.shopGroup);
        this.inventoryGold.anchor.setTo(1);
        this.shopGold = game.add.text(game.camera.width/2-55, 510, world.weaponShopGold, this.goldTextStyle, this.shopGroup);
        this.shopGold.anchor.setTo(1);
    }

    destroyShopMenu (){
        this.shopGroup.destroy();
        this.shopGroup = null;
    }

    remakeShopMenu () {
        this.destroyShopMenu();
        this.createShopMenu();
    }

    talkPrompt () {
        let textStyle = { font: "50px Arial", fill: "#fff", align: "center" };
        this.talkPromptText = game.add.text(266, 45, "!", textStyle, this.shopGraphics);
    }
    removeTalkPrompt (){
        if (this.shopGroup){
            this.shopGroup.destroy();
            this.shopGroup = null;
        }
        this.talkPromptText.destroy();
        this.talkPromptText = null;

    }

    scrollInventory (event){
        if (game.input.y < 50 || game.input.y > 510){
            return
        }
        if (game.input.x > 385 && game.input.x < 595){
            this.shopScroll+=event.deltaY/100;
            if (this.shopScroll < 0){
                this.shopScroll = 0;
            }
        }
        if (game.input.x > 685 && game.input.x < 895){
            this.inventoryScroll+=event.deltaY/100;
            if (this.inventoryScroll < 0){
                this.inventoryScroll = 0;
            }
        }
        this.remakeShopMenu();

    }

}


module.exports = {
    state: State
};