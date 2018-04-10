
class State extends OverworldFunctions {


    preload() {

        game.load.spritesheet('jude', 'images/JudeChar.png', 32, 32, 12);

        game.load.tilemap('grassland', 'images/GLWeaponShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('weaponTiles', 'images/interiorTiles.png');

        game.load.spritesheet('door', 'images/door.png', 32, 32, 12);
        game.load.image('doorSprite', 'images/doorSprite.png');

        game.load.image('redWall', 'images/RED.png');

        game.load.spritesheet('weaponDealer', 'images/GLWeaponsDealer.png', 32, 32, 12);

    };

    create() {

        this.weaponShopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.weaponShop = game.add.tilemap('grassland');
        this.weaponShop.addTilesetImage('interiorTiles', 'weaponTiles');
        this.layer0 = this.weaponShop.createLayer('floor_walls', 544, 480);
        this.layer0.resizeWorld();
        this.layer1 = this.weaponShop.createLayer('furniture', 544, 480);
        this.weaponShopGraphics.add(this.layer0);
        this.weaponShopGraphics.add(this.layer1);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.weaponDealer = this.weaponShopGraphics.create(256, 96,'weaponDealer');
        this.weaponDealer.frame = 1;

        this.judeCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.jude = this.weaponShopGraphics.create(336, 432, 'jude');
        this.jude.anchor.setTo(0.5);
        game.physics.p2.enable(this.jude);
        this.jude.body.fixedRotation = true;

        this.jude.body.setCollisionGroup(this.judeCollisionGroup);

        this.jude.body.collides([this.wallsCollisionGroup, this.doorCollisionGroup]);

        this.up = this.jude.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.jude.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.jude.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.jude.animations.add('right', [6, 7, 8], 10, true);


        this.door = this.weaponShopGraphics.create(336, 464, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.judeCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.cursors = game.input.keyboard.createCursorKeys();

        this.setUpMap();

        this.weaponShopGraphics.fullScreen();
    };

    update() {
        this.handleMovement();
    };

    setUpMap() {
        var jsonData = fs.readFileSync('./resources/app/images/GLWeaponShop.json');
        var mapInfo = JSON.parse(jsonData);
        console.log(mapInfo);

        var height = mapInfo.layers[0].height;
        var width = mapInfo.layers[0].width;
        var data = mapInfo.layers[2].data;


        for (var i = 0; i < height * width; i++) {

            var x = i % width;
            var y = i / width;
            y = Math.floor(y);

            if (data [i] === 1) {

                var redWall = this.weaponShopGraphics.create(x*32 +16, y*32+16, 'redWall');
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