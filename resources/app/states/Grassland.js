var grassland;
var layer0;
var layer1;
var layer2;
var layer3;
var layer4;
var jude;
var door;
var judeCollisionGroup;
var wallsCollisionGroup;
var doorCollisionGroup;
var up;
var down;
var left;
var right;
var cursors;

class State {


    preload() {

        game.load.spritesheet('jude', 'images/JudeChar.png', 32, 32, 12);

        game.load.tilemap('grassland', 'images/grassland.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grassTiles', 'images/GLtownTiles.png');

        game.load.image('redWall', 'images/RED.png');

    };

    create() {

        grassland = game.add.tilemap('grassland');
        grassland.addTilesetImage('GLtowntiles', 'grassTiles');
        layer0 = grassland.createLayer('green');
        layer0.resizeWorld();
        layer1 = grassland.createLayer('ground1');
        layer2 = grassland.createLayer('ground2');
        layer3 = grassland.createLayer('trees_flowers');

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        judeCollisionGroup = game.physics.p2.createCollisionGroup();
        wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        doorCollisionGroup = game.physics.p2.createCollisionGroup();

        jude = game.add.sprite(32*32+16, 16, 'jude');
        jude.anchor.setTo(0.5);
        game.physics.p2.enable(jude);
        jude.body.fixedRotation = true;

        layer4 = grassland.createLayer('above_trees');

        jude.body.setCollisionGroup(judeCollisionGroup);

        jude.body.collides([wallsCollisionGroup, doorCollisionGroup]);

        up = jude.animations.add('up', [9, 10, 11], 10, true);
        down = jude.animations.add('down', [0, 1, 2], 10, true);
        left = jude.animations.add('left', [3, 4, 5], 10, true);
        right = jude.animations.add('right', [6, 7, 8], 10, true);



        // door.anchor.setTo(0.5);
        // game.physics.p2.enable(door);
        // door.body.setCollisionGroup(doorCollisionGroup);
        // door.body.collides(judeCollisionGroup, this.toTown, this);
        // door.body.static = true;

        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(jude);
        jude.body.collideWorldBounds = true;
        this.setUpRed();
    };

    update() {

        jude.body.setZeroVelocity();

        var xDir = 0;
        var yDir = 0;
        var speed = 0;

        if (cursors.up.isDown) {
            yDir--;
        }
        if (cursors.down.isDown) {
            yDir++;
        }
        if (cursors.left.isDown) {
            xDir--;
        }
        if (cursors.right.isDown) {
            xDir++;
        }
        if (xDir && yDir){
            speed = 106;
        } else {
            speed = 150;
        }
        jude.body.velocity.x = xDir*speed;
        jude.body.velocity.y = yDir*speed;
        if (yDir === -1){
            jude.animations.play('up');
        } else if (yDir === 1){
            jude.animations.play('down');
        } else if (xDir === -1){
            jude.animations.play('left');
        }else if (xDir === 1){
            jude.animations.play('right');
        }else {
            jude.animations.stop();
        }

    };

    setUpRed() {
        var jsonData = fs.readFileSync('./resources/app/images/grassland.json');
        this.jsonData(jsonData);
    }

    jsonData(jsondata) {
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

                redWall.body.setCollisionGroup(wallsCollisionGroup);
                redWall.body.collides(judeCollisionGroup);

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