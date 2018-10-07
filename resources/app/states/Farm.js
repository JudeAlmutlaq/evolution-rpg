class State extends OverworldFunctions {
    preload() {
        game.load.tilemap('farm', 'images/farm.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('farmTiles', 'images/GLtownTiles.png');

        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);
        game.load.image('redWall', 'images/RED.png');
    };

    create() {
        this.farmGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.farm = game.add.tilemap('farm');
        this.farm.addTilesetImage('GLtowntiles', 'farmTiles');

        this.layer0 = this.farm.createLayer('ground', 1248, 704);
        this.layer0.resizeWorld();
        this.layer1 = this.farm.createLayer('dirt', 1248, 704);
        this.farmGraphics.add(this.layer0);
        this.farmGraphics.add(this.layer1);

        //this.farmGraphics.fullScreen();

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.farmGraphics.create(16, 304, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        game.camera.follow(this.player);
        this.player.body.collideWorldBounds = true;

        this.setUpMap('./resources/app/images/farm.json');
        
    };

    update() {
      
    };
}

module.exports = {
    state: State
};