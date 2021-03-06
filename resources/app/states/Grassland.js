
class State extends OverworldFunctions{

    init() {
        this.doorTransition = [
            //{ x:37, y:37, state:'PlantShop'},
            //{ x:20, y:29, state:'Inn'},
            {x: 32, y: 0, state: 'Town', newX:23, newY:57},

        ];
        this.pickUpItems = [
            {...world.itemList.yellowFlower, x:28, y:3},
            {...world.itemList.pinkFlower, x:39, y:3},
            {...world.itemList.blueLeaves, x:33, y:9},
        ]
    }

    preload() {

        world.region = "Grassland";

        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.image('yellowFlower', 'images/herbs/yellowFlower.png');
        game.load.image('pinkFlower', 'images/herbs/pinkFlower.png');
        game.load.image('blueLeaves', 'images/herbs/blueLeaves.png');

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

        this.player = game.add.sprite(world.playerOverworldlX, world.playerOverworldY, 'player');
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

        this.layers = [this.layer0,this.layer1,this.layer2, this.layer3, this.layer4];

        let enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onUp.add(this.pickUp, this);

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