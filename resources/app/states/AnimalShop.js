class State extends OverworldFunctions {
    preload() {
        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('animalShopGraphic', 'images/animalShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('animalTiles', 'images/interiorTiles.png');

        game.load.spritesheet('animalDealer', 'images/grasslandTown/animalChar.png', 32, 32, 12);

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);

    };

    create() {
        this.animalShopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.animalShop = game.add.tilemap('animalShopGraphic');
        this.animalShop.addTilesetImage('interiorTiles', 'animalTiles');

        this.layer0 = this.animalShop.createLayer('floor', 544, 544);
        this.layer0.resizeWorld();
        this.layer1 = this.animalShop.createLayer('animals', 544, 544);
        this.animalShopGraphics.add(this.layer0);
        this.animalShopGraphics.add(this.layer1);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.animalDealer = this.animalShopGraphics.create(272, 144,'animalDealer');
        this.animalDealer.frame = 1;
        game.physics.p2.enable(this.animalDealer);
        this.animalDealer.body.setCollisionGroup(this.wallsCollisionGroup);
        this.animalDealer.body.collides(this.playerCollisionGroup);
        this.animalDealer.body.static = true;

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.animalShopGraphics.create(368, 496, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        this.setUpMap('./resources/app/images/animalShop.json');

        this.door = this.animalShopGraphics.create(368, 528, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.animalShopGraphics.fullScreen();
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