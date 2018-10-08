
class State extends ShopFunctions {

    init(){
    }

    preload() {
       // game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('grassland', 'images/grasslandTown/weaponShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('weaponTiles', 'images/interiorTiles.png');

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);

        game.load.image('redWall', 'images/RED.png');

        game.load.spritesheet('weaponDealer', 'images/grasslandTown/weaponChar.png', 32, 32, 12);

        game.load.image('weaponShopMenu', 'images/weaponShopMenu.png');
        game.load.image('sword', 'images/weapons/sword.png');
        game.load.image('swordWood', 'images/weapons/swordWood.png');
        game.load.image('weaponShopMenuContainer', 'images/weaponShopMenuContainer.png');
        game.load.image('inventoryMenuContainer', 'images/inventoryMenuContainer.png');
        game.load.image ('cowBrown', 'images/creatures/Cow.png');

    };

    create() {

        this.weaponShopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.weaponShop = game.add.tilemap('grassland');
        this.weaponShop.addTilesetImage('interiorTiles', 'weaponTiles');
        this.layer0 = this.weaponShop.createLayer('floor_walls', 544, 480);
        this.layer0.resizeWorld();
        this.layer1 = this.weaponShop.createLayer('furniture', 544, 480);
        this.weaponShopGraphics.add(this.layer0);
        this.weaponShopGraphics.add(this.layer1);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.weaponDealer = this.weaponShopGraphics.create(256, 96,'weaponDealer');
        this.weaponDealer.frame = 1;

        this.player = this.weaponShopGraphics.create(336, 430, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);


        this.door = this.weaponShopGraphics.create(336, 464, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.setUpMap('./resources/app/images/grasslandTown/weaponShop.json');

        this.weaponShopGraphics.fullScreen();

        let enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onUp.add(this.openShopMenu, this);

        game.input.mouse.mouseWheelCallback = this.scrollInventory.bind(this);
    };

    update() {
    };

    toTown () {
        game.state.start('Town', true, false, 20, 31);

    }
    openShopMenu (){
        if (this.talkPromptText){
            if (this.shopGroup){
               this.destroyShopMenu();
            }else {
                this.inventoryScroll = 0;
                this.shopScroll = 0;
                this.createShopMenu();
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
        this.talkPromptText = game.add.text(266, 45, "!", textStyle, this.weaponShopGraphics);
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