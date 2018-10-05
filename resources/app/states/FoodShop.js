class State extends OverworldFunctions{
    preload() {
        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('foodShopGraphic', 'images/foodShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('foodTiles', 'images/interiorTiles.png');

        game.load.spritesheet('foodDealer', 'images/grasslandTown/foodChar.png', 32, 32, 12);

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);

    };

    create() {
        this.foodShopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.foodShop = game.add.tilemap('foodShopGraphic');
        this.foodShop.addTilesetImage('interiorTiles', 'foodTiles');

        this.layer0 = this.foodShop.createLayer('floor', 544, 416);
        this.layer0.resizeWorld();
        this.layer1 = this.foodShop.createLayer('furniture', 544, 416);
        this.layer2 = this.foodShop.createLayer('food', 544, 416);
        this.foodShopGraphics.add(this.layer0);
        this.foodShopGraphics.add(this.layer1);
        this.foodShopGraphics.add(this.layer2);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.foodDealer = this.foodShopGraphics.create(272, 112,'foodDealer');
        this.foodDealer.frame = 1;
        game.physics.p2.enable(this.foodDealer);
        this.foodDealer.body.setCollisionGroup(this.wallsCollisionGroup);
        this.foodDealer.body.collides(this.playerCollisionGroup);
        this.foodDealer.body.static = true;

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.foodShopGraphics.create(272, 368, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        this.setUpMap('./resources/app/images/foodShop.json');

        this.door = this.foodShopGraphics.create(272, 400, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.foodShopGraphics.fullScreen();
    };

    update() {
      
    };
    toTown () {
        game.state.start('Town', true, false, 37, 38);

    }
}

module.exports = {
    state: State
};