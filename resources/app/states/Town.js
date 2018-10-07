//var door;
//var doorAnim;

class State extends OverworldFunctions{

    init(){
        this.doorTransition = [
            { x:37, y:37, state:'HerbShop'},
            { x:39, y:19, state:'ScienceShop'},
            { x:20, y:29, state:'WeaponShop'},
            { x:35, y:8, state:'Inn'},
            { x:23, y:59, state:'Grassland', newX:32, newY:1},
            { x:11, y:0, state:'OutsideHome'},
            { x:11, y:15, state:'MedicalShop'},
            { x:8, y:43, state:'AnimalShop'},
            { x:39, y:47, state:'FoodShop'},

        ];
        this.pickUpItems = [
            //{x:28, y:29, spriteName:'swordWood', displayName:'woodenSword', attack:3, cost: 25},
            {x:35, y:32, spriteName:'sword', displayName:'Sword', attack:50, cost: 200},
            {...world.itemList.swordWood, x:28, y:29, cost:25},
            {...world.itemList.animalPen, x:29, y:29},
        ]

    }


    preload() {
        world.region = "Town";


        game.load.spritesheet('player', 'images/playerChar.png', 32, 32, 12);

        game.load.tilemap('town', 'images/GLtown.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('townTiles', 'images/GLtowntiles.png');

        game.load.image('redWall', 'images/RED.png');

        game.load.spritesheet('door', 'images/door.png', 32, 32, 12);
        game.load.image('doorSprite', 'images/doorSprite.png');

        game.load.audio('townMusic', ['audio/townMusic.ogg']);

        game.load.image('inventorySprite', 'images/inventory.png');

        game.load.image('pauseMenuGroup', 'images/pauseMenu.png');
        game.load.image('menuLeaveToDesktop', 'images/leaveToD.png');
        game.load.image('menuLeaveToMenu', 'images/leaveToM.png');
        game.load.image('menuSaveButton', 'images/saveButton.png');
        game.load.image('menuResumeButton', 'images/resumeButton.png');

        game.load.image('swordWood', 'images/weapons/swordWood.png');
        game.load.image('sword', 'images/weapons/sword.png');
        game.load.image('cowBrown', 'images/creatures/cow.png');
        game.load.image('animalPen', 'images/animalPenPen.png');
    };

    create() {

        this.music = game.add.audio('townMusic');
        //this.music.play();

        this.town = game.add.tilemap('town');
        this.town.addTilesetImage('GLtowntiles', 'townTiles');
        this.layers = [];

        this.layers.push(this.town.createLayer('ground'));
        this.layers[0].resizeWorld();
        this.layers.push(this.town.createLayer('trees_buildings'));
        this.layers.push(this.town.createLayer('signs_windows'));
        this.layers.push(this.town.createLayer('tree_tops'));


        this.player = game.add.sprite(world.playerPixelX, world.playerPixelY, 'player');
        this.player.anchor.setTo(0.5);
        game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;

        game.world.bringToTop(this.layers[3]);

        this.up = this.player.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.player.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.player.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.player.animations.add('right', [6, 7, 8], 10, true);

        //door = game.add.sprite(0, 0, 'door');
        //door.alpha = 0;
        //doorAnim = door.animations.add('doorAnim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);

        game.camera.follow(this.player);

        let enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onUp.add(this.pickUp, this);

        this.setUpMap('./resources/app/images/GLtown.json');

    };

    update() {
    };
}

module.exports = {
    state: State
};
