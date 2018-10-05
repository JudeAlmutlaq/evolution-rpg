class State extends OverworldFunctions{

    preload() {
        game.load.tilemap('outsideHome', 'images/outsidehome.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('outsideHomeTiles', 'images/GLtownTiles.png');

        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);
        game.load.image('redWall', 'images/RED.png');

    };

    create() {
        this.outsideHomeGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.outsideHome = game.add.tilemap('outsideHome');
        this.outsideHome.addTilesetImage('GLtowntiles', 'outsideHomeTiles');

        this.layer0 = this.outsideHome.createLayer('ground', 480, 416);
        this.layer0.resizeWorld();
        this.layer1 = this.outsideHome.createLayer('other', 480, 416);
        this.outsideHomeGraphics.add(this.layer0);
        this.outsideHomeGraphics.add(this.layer1);

        this.outsideHomeGraphics.fullScreen();

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.outsideHomeGraphics.create(240, 400, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        game.camera.follow(this.player);
        this.player.body.collideWorldBounds = true;

        this.setUpMap('./resources/app/images/outsideHome.json');

        //this.layers = [this.layer0,this.layer1,this.layer2];



    };

    update() {
      
    };
}

module.exports = {
    state: State
};