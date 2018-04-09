Phaser.StateManager.prototype.__setCurrentState = Phaser.StateManager.prototype.setCurrentState;
Phaser.StateManager.prototype.__update = Phaser.StateManager.prototype.update;
Phaser.StateManager.prototype.___loadComplete = Phaser.StateManager.prototype.loadComplete;

Phaser.StateManager.prototype.setCurrentState = function(key) {
    this.__setCurrentState(key);

    let state = this.states[key];
    callCustomMethods('preload__', state, this.game);
};

Phaser.StateManager.prototype.update = function() {
    let state = this.callbackContext;

    callCustomMethods('update__', state, this.game);
    this.__update();
    callCustomMethods('postUpdate__', state, this.game);
};

Phaser.StateManager.prototype.loadComplete = function() {
    if (this._created === false) {
        let state = this.callbackContext;
        callCustomMethods('create__', state, this.game);
    }
    this.___loadComplete();
};

function callCustomMethods(prefix, state, game) {
    let allMethods = getAllMethods(state);
    for(let i in allMethods) {
        let methodName = allMethods[i];
        if (methodName.startsWith(prefix)) {
            state[methodName].call(state, game);
        }
    }
}

function getAllMethods(obj) {
    var props = [];
    var traverse = obj;

    while (traverse && traverse.constructor.name !== 'Object') {
        props = props.concat(Object.getOwnPropertyNames(traverse));
        traverse = Object.getPrototypeOf(traverse);
    }

    return props.sort().filter(function(e, i, arr) {
        if (e === arr[i+1] || e === 'constructor') return false;
        return e && {}.toString.call(obj[e]) === '[object Function]';
    });
}

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
};