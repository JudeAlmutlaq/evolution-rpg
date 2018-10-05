class State extends OverworldFunctions{
    preload() {
        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('medicalShopGraphic', 'images/medicalShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('medicalTiles', 'images/interiorTiles.png');

        game.load.spritesheet('nurse', 'images/medicalChar.png', 32, 32, 12);

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);
    };

    create() {
        this.medicalShopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.medicalShop = game.add.tilemap('medicalShopGraphic');
        this.medicalShop.addTilesetImage('interiorTiles', 'medicalTiles');

        this.layer0 = this.medicalShop.createLayer('floor', 512, 416);
        this.layer0.resizeWorld();
        this.layer1 = this.medicalShop.createLayer('furniture', 512, 416);
        this.layer2 = this.medicalShop.createLayer('medicine', 512, 416);
        this.medicalShopGraphics.add(this.layer0);
        this.medicalShopGraphics.add(this.layer1);
        this.medicalShopGraphics.add(this.layer2);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.nurse = this.medicalShopGraphics.create(272, 112,'nurse');
        this.nurse.frame = 1;
        game.physics.p2.enable(this.nurse);
        this.nurse.body.setCollisionGroup(this.wallsCollisionGroup);
        this.nurse.body.collides(this.playerCollisionGroup);
        this.nurse.body.static = true;

        this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.player = this.medicalShopGraphics.create(144, 368, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        this.setUpMap('./resources/app/images/medicalShop.json');

        this.door = this.medicalShopGraphics.create(144, 400, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.medicalShopGraphics.fullScreen();
    };

    update() {
      
    };
    toTown () {
        game.state.start('Town', true, false, 37, 38);

    }
}

module.exports = {
    state: State
};