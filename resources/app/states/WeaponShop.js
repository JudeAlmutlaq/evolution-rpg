
class State extends OverworldFunctions {

    preload() {

        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

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

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.weaponShopGraphics.create(336, 430, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);


        this.door = this.weaponShopGraphics.create(336, 464, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.setUpMap('./resources/app/images/GLWeaponShop.json');

        this.weaponShopGraphics.fullScreen();
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