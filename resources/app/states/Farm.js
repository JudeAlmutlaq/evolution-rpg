class State extends FarmFunctions {
    preload() {
        game.load.tilemap('farm', 'images/farm.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('farmTiles', 'images/GLtownTiles.png');

        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);
        game.load.image('redWall', 'images/RED.png');
    };

    create() {
        this.farmGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.farm = game.add.tilemap('farm');
        this.farm.addTilesetImage('GLtowntiles', 'farmTiles');

        this.layer0 = this.farm.createLayer('ground', 1248, 704);
        this.layer0.resizeWorld();
        this.layer1 = this.farm.createLayer('dirt', 1248, 704);
        this.layer2 = this.farm.createLayer('foreground', 1248, 704);
        this.farmGraphics.add(this.layer0);
        this.farmGraphics.add(this.layer1);
        this.farmGraphics.add(this.layer2);



        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.farmGraphics.add(this.player);

        game.camera.follow(this.player);
        this.player.body.collideWorldBounds = true;

        this.setUpMap('./resources/app/images/farm.json');

        //this.objectGroup.bringToTop();
    };

    getPlayerPosition() {
        return {x: 16, y: 304};
    }

    update() {
      
    };
}

module.exports = {
    state: State
};