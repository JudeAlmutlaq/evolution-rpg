class State extends OverworldFunctions {
    preload() {
        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('shop', 'images/grasslandTown/animalShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('interiorTiles', 'images/interiorTiles.png');

        game.load.spritesheet('shopKeeper', 'images/grasslandTown/animalChar.png', 32, 32, 12);

        game.load.spritesheet('door', 'images/door.png', 32, 32, 9);

    };

    create() {
        this.shopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.shop = game.add.tilemap('shop');
        this.shop.addTilesetImage('interiorTiles', 'interiorTiles');

        this.layer0 = this.shop.createLayer('ground', 544, 544);
        this.layer0.resizeWorld();
        this.layer1 = this.shop.createLayer('foreground1', 544, 544);
        this.layer2 = this.shop.createLayer('foreground2', 544, 544);
        this.layer3 = this.shop.createLayer('above', 544, 544);
        this.shopGraphics.add(this.layer0);
        this.shopGraphics.add(this.layer1);
        this.shopGraphics.add(this.layer2);
        this.shopGraphics.add(this.layer3);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.shopKeeper = this.shopGraphics.create(272, 144,'shopKeeper');
        this.shopKeeper.frame = 1;
        game.physics.p2.enable(this.shopKeeper);
        this.shopKeeper.body.setCollisionGroup(this.wallsCollisionGroup);
        this.shopKeeper.body.collides(this.playerCollisionGroup);
        this.shopKeeper.body.static = true;

        this.player = this.shopGraphics.add(this.player);

        this.setUpMap('./resources/app/images/grasslandTown/animalShop.json');

        this.door = this.shopGraphics.create(368, 528, 'door');
        this.door.anchor.setTo(0.5);
        game.physics.p2.enable(this.door);
        this.door.body.setCollisionGroup(this.doorCollisionGroup);
        this.door.body.collides(this.playerCollisionGroup, this.toTown, this);
        this.door.body.static = true;

        this.shopGraphics.fullScreen();
    };

    getPlayerPosition() {
        return {x: 368, y: 496};
    }

    update() {
      
    };
    toTown () {
        game.state.start('Town', true, false, 37, 38);

    }
}

module.exports = {
    state: State
};