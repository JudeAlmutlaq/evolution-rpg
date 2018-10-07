class State extends OverworldFunctions {
    preload() {
        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('innGraphic', 'images/grasslandTown/inn.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('innTiles', 'images/interiorTiles.png');

        game.load.spritesheet('innKeeper', 'images/grasslandTown/innChar.png', 32, 32, 12);

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);
    };

    create() {
        this.innGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.inn = game.add.tilemap('innGraphic');
        this.inn.addTilesetImage('interiorTiles', 'innTiles');

        this.layer0 = this.inn.createLayer('floor', 832, 384);
        this.layer0.resizeWorld();
        this.layer1 = this.inn.createLayer('furniture', 832, 384);
        this.innGraphics.add(this.layer0);
        this.innGraphics.add(this.layer1);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.innKeeper = this.innGraphics.create(176, 176,'innKeeper');
        this.innKeeper.frame = 1;
        game.physics.p2.enable(this.innKeeper);
        this.innKeeper.body.setCollisionGroup(this.wallsCollisionGroup);
        this.innKeeper.body.collides(this.playerCollisionGroup);
        this.innKeeper.body.static = true;

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.innGraphics.create(176, 336, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        this.setUpMap('./resources/app/images/grasslandTown/inn.json');

        this.door = this.innGraphics.create(176, 368, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.innGraphics.fullScreen();
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