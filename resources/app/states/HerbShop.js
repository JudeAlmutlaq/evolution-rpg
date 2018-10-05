class State extends OverworldFunctions {
    preload() {
        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('herbShopGraphic', 'images/HerbShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('herbTiles', 'images/interiorTiles.png');

        game.load.spritesheet('herbDealer', 'images/herbChar.png', 32, 32, 12);

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);
    };

    create() {
        this.herbShopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.herbShop = game.add.tilemap('herbShopGraphic');
        this.herbShop.addTilesetImage('interiorTiles', 'herbTiles');

        this.layer0 = this.herbShop.createLayer('walls', 480, 416);
        this.layer0.resizeWorld();
        this.layer1 = this.herbShop.createLayer('tables', 480, 416);
        this.layer2 = this.herbShop.createLayer('plants', 480, 416);
        this.herbShopGraphics.add(this.layer0);
        this.herbShopGraphics.add(this.layer1);
        this.herbShopGraphics.add(this.layer2);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.herbDealer = this.herbShopGraphics.create(240, 112,'herbDealer');
        this.herbDealer.frame = 1;
        game.physics.p2.enable(this.herbDealer);
        this.herbDealer.body.setCollisionGroup(this.wallsCollisionGroup);
        this.herbDealer.body.collides(this.playerCollisionGroup);
        this.herbDealer.body.static = true;

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.herbShopGraphics.create(240, 368, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        this.setUpMap('./resources/app/images/herbShop.json');

        this.door = this.herbShopGraphics.create(240, 400, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.herbShopGraphics.fullScreen();
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