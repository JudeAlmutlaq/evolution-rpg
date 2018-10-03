class State {
    preload() {

        game.load.tilemap('scienceShopGraphic', 'images/scienceShop.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('scienceTiles', 'images/interiorTiles.png');

        //game.load.spritesheet('scienceDealer', 'images/GLScienceDealer.png', 32, 32, 12);
    };

    create() {
        this.scienceShopGraphics = game.add.group();

        game.stage.backgroundColor = "#000000";

        this.scienceShop = game.add.tilemap('scienceShopGraphic');
        this.scienceShop.addTilesetImage('interiorTiles', 'scienceTiles');

        this.layer0 = this.scienceShop.createLayer('walls', 544, 480);
        this.layer0.resizeWorld();
        this.layer1 = this.scienceShop.createLayer('potions', 544, 480);
        this.weaponShopGraphics.add(this.layer0);
        this.weaponShopGraphics.add(this.layer1);

        this.scienceShopGraphics.fullScreen();

        //this.scienceDealer = this.weaponShopGraphics.create(1, 1,'scienceDealer');
        //this.scienceDealer.frame = 1;
    };

    update() {
      
    };
}

module.exports = {
    state: State
};