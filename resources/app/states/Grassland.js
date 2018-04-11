
class State extends OverworldFunctions{


    preload() {

        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('grassland', 'images/grassland.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grassTiles', 'images/GLtownTiles.png');

        game.load.image('redWall', 'images/RED.png');
    };

    create() {

        this.grassland = game.add.tilemap('grassland');
        this.grassland.addTilesetImage('GLtowntiles', 'grassTiles');
        this.layer0 = this.grassland.createLayer('green');
        this.layer0.resizeWorld();
        this.layer1 = this.grassland.createLayer('ground1');
        this.layer2 = this.grassland.createLayer('ground2');
        this.layer3 = this.grassland.createLayer('trees_flowers');

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = game.add.sprite(32*32+16, 16, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.layer4 = this.grassland.createLayer('above_trees');

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);



        // this.door.anchor.setTo(0.5);
        // game.physics.p2.enable(this.door);
        // this.door.body.setCollisionGroup(this.doorCollisionGroup);
        // this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        // this.door.body.static = true;

        game.camera.follow(this.player);
        this.player.body.collideWorldBounds = true;

        this.setUpMap('./resources/app/images/grassland.json');

        game.fixColors('#0d2b00', [this.layer0,this.layer1,this.layer2, this.layer3, this.layer4]);

    };

    update() {
    };


    toTown () {
        game.state.start('Town', true, false, 20, 31);

    }
}

module.exports = {
    state: State
};