class State extends OverworldFunctions {
    preload() {
        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('scienceShopGraphic', 'images/grasslandTown/scienceShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('scienceTiles', 'images/interiorTiles.png');

        game.load.spritesheet('scienceDealer', 'images/grasslandTown/scienceChar.png', 32, 32, 12);

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);
    };

    create() {
        this.scienceShopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.scienceShop = game.add.tilemap('scienceShopGraphic');
        this.scienceShop.addTilesetImage('interiorTiles', 'scienceTiles');

        this.layer0 = this.scienceShop.createLayer('walls', 544, 416);
        this.layer0.resizeWorld();
        this.layer1 = this.scienceShop.createLayer('potions', 544, 416);
        this.scienceShopGraphics.add(this.layer0);
        this.scienceShopGraphics.add(this.layer1);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.scienceDealer = this.scienceShopGraphics.create(272, 144,'scienceDealer');
        this.scienceDealer.frame = 1;
        game.physics.p2.enable(this.scienceDealer);
        this.scienceDealer.body.setCollisionGroup(this.wallsCollisionGroup);
        this.scienceDealer.body.collides(this.playerCollisionGroup);
        this.scienceDealer.body.static = true;

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.scienceShopGraphics.create(240, 368, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        this.setUpMap('./resources/app/images/grasslandTown/scienceShop.json');

        this.door = this.scienceShopGraphics.create(240, 400, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.scienceShopGraphics.fullScreen();
    };

    update() {
      
    };

    toTown () {
        game.state.start('Town', true, false, 39, 20);

    }
}

module.exports = {
    state: State
};