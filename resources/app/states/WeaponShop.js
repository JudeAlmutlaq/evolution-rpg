
class State extends OverworldFunctions {

    init(){
        this.weaponShopItems = [
            {spriteName:'swordWood', displayName:'Wooden Sword', attack: 3, cost: 50},
            {spriteName:'sword', displayName:'Sword', attack: 50, cost: 400},
            {spriteName:'sword', displayName:'Sword', attack: 50, cost: 300},
            {spriteName:'sword', displayName:'Sword', attack: 50, cost: 800},
        ]
    }

    preload() {

        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('grassland', 'images/GLWeaponShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('weaponTiles', 'images/interiorTiles.png');

        game.load.spritesheet('door', 'images/door.png', 32, 32, 12);
        game.load.image('doorSprite', 'images/doorSprite.png');

        game.load.image('redWall', 'images/RED.png');

        game.load.spritesheet('weaponDealer', 'images/GLWeaponsDealer.png', 32, 32, 12);

        game.load.image('weaponShopMenu', 'images/weaponShopMenu.png');
        game.load.image('sword', 'images/weapons/sword.png');
        game.load.image('swordWood', 'images/weapons/swordWood.png');
        game.load.image('weaponShopMenuContainer', 'images/weaponShopMenuContainer.png');
        game.load.image('inventoryMenuContainer', 'images/inventoryMenuContainer.png');

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

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

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

        this.setUpMap('./resources/app/images/GLWeaponShop.json');

        this.weaponShopGraphics.fullScreen();

        let enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onUp.add(this.openShopMenu, this);
    };

    update() {
    };

    toTown () {
        game.state.start('Town', true, false, 20, 31);

    }
    openShopMenu (){
        if (this.talkPromptText){
            if (this.shopGroup){
                this.shopGroup.destroy();
                this.shopGroup = null;
            }else {
                this.shopGroup = game.add.group();
                this.shopGroup.create(game.camera.width/2-255, 37,'weaponShopMenuContainer');
                this.shopGroup.create(game.camera.width/2+45, 37,'inventoryMenuContainer');
                for (let i in this.weaponShopItems){
                    this.displayItem(game.camera.width/2-250, i*48+100, this.weaponShopItems[i]);
                }
                for (let i in world.inventory){
                    this.displayItem(game.camera.width/2+50, i*48+100, world.inventory[i]);
                }
            }


        }
    }

    displayItem(x,y,item){
        let textStyle = { font: "12px Arial", fill: "#fff", align: "center" };
        this.shopGroup.create(x, y, 'weaponShopMenu');
        this.shopGroup.create(x+10, y+5, item.spriteName);
        game.add.text(x+47, y+5, item.displayName, textStyle, this.shopGroup);
        game.add.text(x+47, y+20, "Attack: "+item.attack, textStyle, this.shopGroup);
        game.add.text(x+190, y+20, item.cost+" Gold", textStyle, this.shopGroup).anchor.set(1,0);
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
}


module.exports = {
    state: State
};