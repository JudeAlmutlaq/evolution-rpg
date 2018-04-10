//var door;
//var doorAnim;
var inventoryGroup;
var pauseMenuGroup;

class State extends OverworldFunctions{

    constructor(){
        super();
        this.doorTransition = [
            //{ x:37, y:37, state:'PlantShop'},
            //{ x:20, y:29, state:'Inn'},
            { x:20, y:29, state:'WeaponShop'},
            { x:23, y:58, state:'Grassland'},

        ];
        this.pickUpItems = [
            {x:28, y:29, itemName:'swordWood'},
        ]
    }

    init(x=28,y=31){
        this.startX = x;
        this.startY = y;

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

        game.load.image('swordWood', 'images/weapons/swordWood.png');
    };

    create() {

        this.music = game.add.audio('townMusic');
        //this.music.play();

        this.town = game.add.tilemap('town');
        this.town.addTilesetImage('GLtowntiles', 'townTiles');
        this.layer0 = this.town.createLayer('Ground');
        this.layer0.resizeWorld();
        this.layer1 = this.town.createLayer('trees_buildings');
        this.layer2 = this.town.createLayer('signs_windows');

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        this.judeCollisionGroup = game.physics.p2.createCollisionGroup();
        this.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
        this.doorCollisionGroup = game.physics.p2.createCollisionGroup();

        this.jude = game.add.sprite(this.startX*32+16, this.startY*32+16, 'jude');
        this.jude.anchor.setTo(0.5);
        game.physics.p2.enable(this.jude);
        this.jude.body.fixedRotation = true;

        this.layer3 = this.town.createLayer('tree_tops');

        this.jude.body.setCollisionGroup(this.judeCollisionGroup);

        this.jude.body.collides([this.wallsCollisionGroup, this.doorCollisionGroup]);

        this.up = this.jude.animations.add('up', [9, 10, 11], 10, true);
        this.down = this.jude.animations.add('down', [0, 1, 2], 10, true);
        this.left = this.jude.animations.add('left', [3, 4, 5], 10, true);
        this.right = this.jude.animations.add('right', [6, 7, 8], 10, true);

        //door = game.add.sprite(0, 0, 'door');
        //door.alpha = 0;
        //doorAnim = door.animations.add('doorAnim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 5, true);

        this.cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(this.jude);

        this.setUpMap();
        this.setUpItems();

        inventoryGroup = this.game.add.group();
        inventoryGroup.scale.set(0.25);
        inventoryGroup.fixedToCamera = true;


        this.goldTextStyle = { font: "55px Arial", fill: "#af8f00", align: "center" };
        inventoryGroup.create(0,0, 'inventorySprite');
        this.goldText = game.add.text(1080, 1633, world.playerGold, this.goldTextStyle, inventoryGroup);
        this.goldText.anchor.setTo(1);

        inventoryGroup.cameraOffset.x = game.camera.width-inventoryGroup.width;
        inventoryGroup.cameraOffset.y = game.camera.height-inventoryGroup.height;

        inventoryGroup.visible = false;

        this.inventoryKey = game.input.keyboard.addKey(Phaser.KeyCode.I);
        this.inventoryKey.onUp.add(this.openInventory);

        this.menuKey = game.input.keyboard.addKey(Phaser.KeyCode.ESC);
        this.menuKey.onUp.add(this.openMenu);

        let enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onUp.add(this.pickUp, this);




        pauseMenuGroup = this.game.add.group();
        pauseMenuGroup.create(0,0, 'pauseMenuGroup');

        this.menuLeaveToMenu = pauseMenuGroup.create(110,200, 'menuLeaveToMenu');
        this.menuLeaveToDesktop = pauseMenuGroup.create(0,350, 'menuLeaveToDesktop');
        this.menuResumeButton = pauseMenuGroup.create(0,500, 'menuResumeButton');

        this.menuLeaveToMenu.x = pauseMenuGroup.width/2;
        this.menuLeaveToDesktop.x = pauseMenuGroup.width/2;
        this.menuResumeButton.x = pauseMenuGroup.width/2;

        pauseMenuGroup.scale.x = 0.6;
        pauseMenuGroup.scale.y = 0.6;

        this.menuLeaveToMenu.inputEnabled = true;
        this.menuLeaveToMenu.events.onInputDown.add(this.toMain);
        this.menuLeaveToMenu.anchor.set(0.5);

        this.menuLeaveToDesktop.inputEnabled = true;
        this.menuLeaveToDesktop.events.onInputDown.add(closeWindow);
        this.menuLeaveToDesktop.anchor.set(0.5);

        this.menuResumeButton.inputEnabled = true;
        this.menuResumeButton.events.onInputDown.add(this.closeMenu);
        this.menuResumeButton.anchor.set(0.5);

        pauseMenuGroup.fixedToCamera = true;
        pauseMenuGroup.visible = false;

        game.fixColors(0x0d2b00, [this.layer0,this.layer1,this.layer2, this.layer3]);
    };

    update() {
        this.handleMovement();

    };

    setUpMap() {
        var jsondata = fs.readFileSync('./resources/app/images/GLtown.json');
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

                redWall.body.setCollisionGroup(this.wallsCollisionGroup);
                redWall.body.collides(this.judeCollisionGroup);

            } else if (data [i] === 2) {
                this.doorSprite = game.add.sprite(x * 32 + 16, y * 32 + 16, 'doorSprite');
                game.physics.p2.enable(this.doorSprite);
                this.doorSprite.body.static = true;

                this.doorSprite.body.doorX = x;
                this.doorSprite.body.doorY = y;

                this.doorSprite.anchor.setTo(0.5);
                this.doorSprite.body.setCollisionGroup(this.doorCollisionGroup);

                this.doorSprite.body.collides(this.judeCollisionGroup, openDoor, this);

                console.log(x, y);

            } else if (data [i] === 3) {
                redWall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(this.wallsCollisionGroup);
                redWall.body.collides(this.judeCollisionGroup);

            } else if (data [i] === 5) {
                redWall = game.add.sprite(x * 32 + 16, y * 32 + 16, 'redWall');
                game.physics.p2.enable(redWall);
                redWall.body.static = true;

                redWall.body.doorX = x;
                redWall.body.doorY = y;

                redWall.anchor.setTo(0.5);

                redWall.body.setCollisionGroup(this.wallsCollisionGroup);
                redWall.body.collides(this.judeCollisionGroup, openDoor, this);
            }
        }
    }

    setUpItems(){
        this.itemSprites = [];
        for (var i in this.pickUpItems){
            let item = this.pickUpItems [i];
            let sprite = game.add.sprite(item.x*32+16, item.y*32+16, item.itemName);
            sprite.anchor.set(0.5);
            this.itemSprites.push(sprite);
        }
    }

    pickUp(){
        for (var i in this.itemSprites){
            if (this.jude.overlap(this.itemSprites [i])){
                this.itemSprites [i].destroy();
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
    this.music.stop();

    for (var i in this.doorTransition){
        let transition = this.doorTransition[i];
        if (transition.x === doorBody.doorX && transition.y === doorBody.doorY){
            game.state.start(transition.state);
        }
    }

}

module.exports = {
    state: State
};
