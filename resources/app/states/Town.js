var town;
var door;
var down;
var left;
var right;
var up;

var judeCollisionGroup;
var wallsCollisionGroup;
var doorCollisionGroup;
//var doorAnim;
var doorSprite;
var layer0;
var layer1;
var layer2;
var layer3;
var music;
var doorTransition = [
    //{ x:37, y:37, state:'PlantShop'},
    //{ x:20, y:29, state:'Inn'},
    { x:20, y:29, state:'WeaponShop'},
    { x:23, y:58, state:'Grassland'},

];
var startX;
var startY;
var inventoryKey;
var inventoryGroup;
var goldText;
var menuKey;
var pauseMenuGroup;
var menuLeaveToMenu;

class State extends OverworldFunctions{

    init(x=28,y=31){
        startX = x;
        startY = y;

    }


    preload() {


        game.load.spritesheet('jude', 'images/JudeChar.png', 32, 32, 12);

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
        layer2 = town.createLayer('signs_windows');

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        judeCollisionGroup = game.physics.p2.createCollisionGroup();
        wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.jude = game.add.sprite(startX*32+16, startY*32+16, 'jude');
        this.jude.anchor.setTo(0.5);
        game.physics.p2.enable(this.jude);
        this.jude.body.fixedRotation = true;

        layer3 = town.createLayer('tree_tops');

        this.jude.body.setCollisionGroup(judeCollisionGroup);

        this.jude.body.collides([wallsCollisionGroup, doorCollisionGroup]);

        up = this.jude.animations.add('up', [9, 10, 11], 10, true);
        down = this.jude.animations.add('down', [0, 1, 2], 10, true);
        left = this.jude.animations.add('left', [3, 4, 5], 10, true);
        right = this.jude.animations.add('right', [6, 7, 8], 10, true);

        //door = game.add.sprite(0, 0, 'door');
        //door.alpha = 0;
        //doorAnim = door.animations.add('doorAnim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);

        this.cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(this.jude);

        this.setUpRed();

        inventoryGroup = this.game.add.group();
        inventoryGroup.scale.set(0.25);
        inventoryGroup.fixedToCamera = true;


        var style = { font: "55px Arial", fill: "#af8f00", align: "center" };
        inventoryGroup.create(0,0, 'inventorySprite');
        goldText = game.add.text(1080, 1535, world.playerGold, style, inventoryGroup);
        goldText.anchor.setTo(1);

        inventoryGroup.cameraOffset.x = game.camera.width-inventoryGroup.width;
        inventoryGroup.cameraOffset.y = game.camera.height-inventoryGroup.height;

        inventoryGroup.visible = false;

        inventoryKey = game.input.keyboard.addKey(Phaser.KeyCode.I);
        inventoryKey.onUp.add(this.openInventory);

        menuKey = game.input.keyboard.addKey(Phaser.KeyCode.ESC);
        menuKey.onUp.add(this.openMenu);


        pauseMenuGroup = this.game.add.group();
        pauseMenuGroup.create(0,0, 'pauseMenuGroup');

        menuLeaveToMenu = pauseMenuGroup.create(110,200, 'menuLeaveToMenu');
        this.menuLeaveToDesktop = pauseMenuGroup.create(0,350, 'menuLeaveToDesktop');
        this.menuResumeButton = pauseMenuGroup.create(0,500, 'menuResumeButton');

        menuLeaveToMenu.x = pauseMenuGroup.width/2;
        this.menuLeaveToDesktop.x = pauseMenuGroup.width/2;
        this.menuResumeButton.x = pauseMenuGroup.width/2;

        pauseMenuGroup.scale.x = 0.6;
        pauseMenuGroup.scale.y = 0.6;

        menuLeaveToMenu.inputEnabled = true;
        menuLeaveToMenu.events.onInputDown.add(this.toMain);
        menuLeaveToMenu.anchor.set(0.5);

        this.menuLeaveToDesktop.inputEnabled = true;
        this.menuLeaveToDesktop.events.onInputDown.add(closeWindow);
        this.menuLeaveToDesktop.anchor.set(0.5);

        this.menuResumeButton.inputEnabled = true;
        this.menuResumeButton.events.onInputDown.add(this.closeMenu);
        this.menuResumeButton.anchor.set(0.5);

        pauseMenuGroup.fixedToCamera = true;
        pauseMenuGroup.visible = false;

        game.fixColors(0x0d2b00, [layer0,layer1,layer2, layer3]);
    };

    update() {
        this.handleMovement();

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
        var data = mapInfo.layers[4].data;


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
                doorSprite = game.add.sprite(x * 32 + 16, y * 32 + 16, 'doorSprite');
                game.physics.p2.enable(doorSprite);
                doorSprite.body.static = true;

                doorSprite.body.doorX = x;
                doorSprite.body.doorY = y;

                doorSprite.anchor.setTo(0.5);
                doorSprite.body.setCollisionGroup(doorCollisionGroup);

                doorSprite.body.collides(judeCollisionGroup, openDoor, this);

                console.log(x, y);

            } else if (data [i] === 3) {
                redWall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(wallsCollisionGroup);
                redWall.body.collides(judeCollisionGroup);

            } else if (data [i] === 5) {
                redWall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.body.doorX = x;
                redWall.body.doorY = y;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(wallsCollisionGroup);
                redWall.body.collides(judeCollisionGroup, openDoor, this);
            }
        }
    }

    openInventory(){
        if (inventoryGroup.visible === false ){
            inventoryGroup.visible = true;
            console.log('yes');
        } else if (inventoryGroup.visible === true){
            inventoryGroup.visible = false;
            console.log('no');
        }
        console.log(inventoryGroup.alpha);
    }

    openMenu(){
        if (pauseMenuGroup.visible === false ){
            pauseMenuGroup.visible = true;
            console.log('yes');
        } else if (pauseMenuGroup.visible === true){
            pauseMenuGroup.visible = false;
            console.log('no');
        }
        console.log(inventoryGroup.alpha);
    }

    closeMenu(){
        pauseMenuGroup.visible = false;
    }

    toMain(){
        game.state.start('Main');
    }
}

function openDoor (doorBody, judeBody) {
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
