var jude;
var town;
var door;
var down;
var left;
var right;
var up;
var cursors;
var judeCollisionGroup;
var wallsCollisionGroup;
var doorCollisionGroup;
var doorAnim;
var doorSprite;
var layer0;
var layer1;
var layer2;
var music;
var doorTransition = [
    { x:37, y:37, state:'PlantShop'},
    //{ x:20, y:29, state:'Inn'},
    { x:20, y:29, state:'WeaponShop'},

];


class State {


    preload() {


        game.load.spritesheet('jude', 'images/JudeChar.png', 32, 32, 12);

        game.load.tilemap('town', 'images/GLtown.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('townTiles', 'images/GLtowntiles.png');

        game.load.image('redWall', 'images/RED.png');

        game.load.spritesheet('door', 'images/door.png', 32, 32, 12);
        game.load.image('doorSprite', 'images/doorSprite.png');

        game.load.audio('townMusic', ['audio/townMusic.ogg']);
    };

    create() {

        music = game.add.audio('townMusic');
        //music.play();

        //  The 'towm' key here is the Loader key given in game.load.tilemap
        town = game.add.tilemap('town');
        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'
        town.addTilesetImage('GLtowntiles', 'townTiles');
        //  Creates a layer from the ground layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        layer0 = town.createLayer('Ground');
        //  This resizes the game world to match the layer dimensions
        layer0.resizeWorld();
        layer1 = town.createLayer('trees_buildings');
        layer1.resizeWorld();
        layer2 = town.createLayer('signs_windows');
        layer2.resizeWorld();

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        judeCollisionGroup = game.physics.p2.createCollisionGroup();
        wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        doorCollisionGroup = game.physics.p2.createCollisionGroup();

        jude = game.add.sprite(game.world.centerX, game.world.centerY, 'jude');
        jude.anchor.setTo(0.5);
        game.physics.p2.enable(jude);
        jude.body.fixedRotation = true;

        jude.body.setCollisionGroup(judeCollisionGroup);

        jude.body.collides([wallsCollisionGroup, doorCollisionGroup]);

        up = jude.animations.add('up', [9, 10, 11], 10, true);
        down = jude.animations.add('down', [0, 1, 2], 10, true);
        left = jude.animations.add('left', [3, 4, 5], 10, true);
        right = jude.animations.add('right', [6, 7, 8], 10, true);

        door = game.add.sprite(0, 0, 'door');
        door.alpha = 0;
        doorAnim = door.animations.add('doorAnim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);

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
        var data = mapInfo.layers[3].data;


        for (var i = 0; i < height * width; i++) {

            var x = i % width;
            var y = i / width;
            y = Math.floor(y);

            if (data [i] === 1) {

                var redWall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(wallsCollisionGroup);
                redWall.body.collides(judeCollisionGroup);

            } else if (data [i] === 2) {
                doorSprite = game.add.sprite(x * 32+16, y * 32+16, 'doorSprite');
                game.physics.p2.enable(doorSprite);
                doorSprite.body.static = true;

                doorSprite.body.doorX = x;
                doorSprite.body.doorY = y;

                doorSprite.anchor.setTo(0.5);
                doorSprite.body.setCollisionGroup(doorCollisionGroup);

                doorSprite.body.collides(judeCollisionGroup, openDoor, this);

                console.log(x,y);

            } else if (data [i] === 3) {
                var redWall = game.add.sprite(x * 32+16, y * 32+16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(wallsCollisionGroup);
                redWall.body.collides(judeCollisionGroup);

            }


        }

    }


}

function openDoor (doorBody, judeBody) {
    //door.animations.play('doorAnim');
    music.stop();

    for (var i in doorTransition){
        var transition = doorTransition[i];
        if (transition.x === doorBody.doorX && transition.y === doorBody.doorY){
            game.state.start(transition.state);
        }
    }

}

module.exports = {
    state: State
};
