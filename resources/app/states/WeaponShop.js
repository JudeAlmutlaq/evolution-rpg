var weaponShop;
var layer0;
var layer1;
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

        game.load.tilemap('weaponShop', 'images/GLWeaponShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('weaponTiles', 'images/interiorTiles.png');

        game.load.spritesheet('door', 'images/door.png', 32, 32, 12);
        game.load.image('doorSprite', 'images/doorSprite.png');

        game.load.image('redWall', 'images/RED.png');

    };

    create() {

        game.stage.backgroundColor = "#000000";

        weaponShop = game.add.tilemap('weaponShop');
        weaponShop.addTilesetImage('interiorTiles', 'weaponTiles');
        layer0 = weaponShop.createLayer('floor_walls', 544, 480);
        layer0.resizeWorld();
        layer1 = weaponShop.createLayer('furniture', 544, 480);
        layer1.resizeWorld();

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        judeCollisionGroup = game.physics.p2.createCollisionGroup();
        wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        doorCollisionGroup = game.physics.p2.createCollisionGroup();

        jude = game.add.sprite(336, 432, 'jude');
        jude.anchor.setTo(0.5);
        game.physics.p2.enable(jude);
        jude.body.fixedRotation = true;

        jude.body.setCollisionGroup(judeCollisionGroup);

        jude.body.collides([wallsCollisionGroup, doorCollisionGroup]);

        up = jude.animations.add('up', [9, 10, 11], 10, true);
        down = jude.animations.add('down', [0, 1, 2], 10, true);
        left = jude.animations.add('left', [3, 4, 5], 10, true);
        right = jude.animations.add('right', [6, 7, 8], 10, true);


        door = game.add.sprite(336, 464, 'door');
        door.anchor.setTo(0.5);

        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(jude);

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
        var jsonData = fs.readFileSync('./resources/app/images/GLtown.json');
        this.jsonData(jsonData);
    }

    jsonData(jsondata) {
        var mapInfo = JSON.parse(jsondata);
        console.log(mapInfo);

        var height = mapInfo.layers[0].height;
        var width = mapInfo.layers[0].width;
        var data = mapInfo.layers[2].data;


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
}

module.exports = {
    state: State
};