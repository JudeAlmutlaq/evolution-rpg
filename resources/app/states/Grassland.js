
class State extends OverworldFunctions{


    preload() {

        game.load.spritesheet('jude', 'images/JudeChar.png', 32, 32, 12);

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

        this.judeCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.jude = game.add.sprite(32*32+16, 16, 'jude');
        this.jude.anchor.setTo(0.5);
        game.physics.p2.enable(this.jude);
        this.jude.body.fixedRotation = true;

        this.layer4 = this.grassland.createLayer('above_trees');

        this.jude.body.setCollisionGroup(this.judeCollisionGroup);

        this.jude.body.collides([this.wallsCollisionGroup, this.doorCollisionGroup]);

        this.up = this.jude.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.jude.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.jude.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.jude.animations.add('right', [6, 7, 8], 10, true);



        // this.door.anchor.setTo(0.5);
        // game.physics.p2.enable(this.door);
        // this.door.body.setCollisionGroup(this.doorCollisionGroup);
        // this.door.body.collides(this.judeCollisionGroup, this.toTown, this);
        // this.door.body.static = true;

        this.cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(this.jude);
        this.jude.body.collideWorldBounds = true;
        this.setUpMap();

        game.fixColors(0x0d2b00, [this.layer0,this.layer1,this.layer2, this.layer3, this.layer4]);

    };

    update() {
        this.handleMovement();
    };

    setUpMap() {
        var jsondata = fs.readFileSync('./resources/app/images/grassland.json');
        var mapInfo = JSON.parse(jsondata);
        console.log(mapInfo);

        var height = mapInfo.layers[0].height;
        var width = mapInfo.layers[0].width;
        var data = mapInfo.layers[5].data;


        for (var i = 0; i < height * width; i++) {

            var x = i % width;
            var y = i / width;
            y = Math.floor(y);

            if (data [i] === 1) {

                var redWall = game.add.sprite(x*32 +16, y*32+16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(this.wallsCollisionGroup);
                redWall.body.collides(this.judeCollisionGroup);

            }


        }
    }

    toTown () {
        game.state.start('Town', true, false, 20, 31);

    }
}

module.exports = {
    state: State
};