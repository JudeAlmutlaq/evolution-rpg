class State extends OverworldFunctions {
    preload() {
        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('homeGraphic', 'images/home.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('homeTiles', 'images/interiorTiles.png');

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);
    };

    create() {
        this.homeGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.home = game.add.tilemap('homeGraphic');
        this.home.addTilesetImage('interiorTiles', 'homeTiles');

        this.layer0 = this.home.createLayer('floor', 480, 416);
        this.layer0.resizeWorld();
        this.layer1 = this.home.createLayer('furniture', 480, 416);
        this.homeGraphics.add(this.layer0);
        this.homeGraphics.add(this.layer1);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.homeGraphics.create(240, 368, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        this.setUpMap('./resources/app/images/home.json');

        this.door = this.homeGraphics.create(240, 400, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toOutsideHome, this);
        this.door.body.static = true;

        this.homeGraphics.fullScreen();

    };

    update() {
      
    };
    toOutsideHome () {
        game.state.start('OutsideHome', true, false, 1, 1);

    }
}

module.exports = {
    state: State
};