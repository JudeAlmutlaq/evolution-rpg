Phaser.StateManager.prototype.__setCurrentState = Phaser.StateManager.prototype.setCurrentState;

Phaser.StateManager.prototype.setCurrentState = function(key) {

    this.__setCurrentState(key);

    let state = this.states[key];

    let allMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(state))
    for(let i in allMethods) {
        methodName = allMethods[i];
        if (methodName.startsWith('__pre')) {
            state[methodName](key);
        }
    }
};

Phaser.Sprite.prototype.fullScreen = function() {
    this.fixedToCamera = false;

    this.anchor.setTo(.5);
    this.position.x = game.camera.width / 2;
    this.position.y = game.camera.height / 2;

    let spriteRatio = this.width/this.height;
    let screenRatio = world.electronPhaserSettings.canvasResolution[0] / world.electronPhaserSettings.canvasResolution[1];

    let scaleFactor;
    if (spriteRatio >= screenRatio) {
        scaleFactor = world.electronPhaserSettings.canvasResolution[0] / this.width;
    } else {
        scaleFactor = world.electronPhaserSettings.canvasResolution[1] / this.height;
    }


    this.setScale(scaleFactor);
};

Phaser.Group.prototype.fullScreen = function() {
    this.fixedToCamera = false;

    let spriteRatio = this.width/this.height;
    let screenRatio = world.electronPhaserSettings.canvasResolution[0] / world.electronPhaserSettings.canvasResolution[1];

    let scaleFactor;
    if (spriteRatio >= screenRatio) {
        scaleFactor = world.electronPhaserSettings.canvasResolution[0] / this.width;
    } else {
        scaleFactor = world.electronPhaserSettings.canvasResolution[1] / this.height;
    }

    this.scale.set(scaleFactor, scaleFactor);

    this.position.x = game.camera.width / 2 - this.width / 2;
    this.position.y = game.camera.height / 2 - this.height / 2;

    console.log(this.children);
};

var ColorFix = new Phaser.Plugin(null, Phaser.PluginManager);
ColorFix.frame = 0;
ColorFix.fixingColors = false;
ColorFix.postUpdate = function() {
    if (ColorFix.fixingColors === true) {
        if (ColorFix.frame === 0) {
            raiseWindowShield(ColorFix.color);
            ColorFix.originalX = game.camera.x;
            ColorFix.originalY = game.camera.y;

            game.camera.x += 1;
            game.camera.y += 1;

            if (game.camera.x === ColorFix.originalX && game.camera.y === ColorFix.originalY) {
                game.camera.x -= 2;
                game.camera.y -= 2;
            }
        } else if (ColorFix.frame === 1) {
            game.camera.x = ColorFix.originalX;
            game.camera.y = ColorFix.originalY;
        } else if (ColorFix.frame === 2) {
            for (let i in ColorFix.toFix) {
                ColorFix.toFix[i].dirty = true;
            }
            ColorFix.fixingColors = false;
            lowerWindowShield();
        }

        ColorFix.frame += 1;
    }
};
ColorFix.fixColors = function(color, toFix) {
    ColorFix.color = color;
    ColorFix.toFix = toFix;
    ColorFix.frame = 0;
    ColorFix.fixingColors = true;
    console.log('color is being fixed');
};