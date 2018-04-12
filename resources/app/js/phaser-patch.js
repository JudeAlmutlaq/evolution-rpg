Phaser.StateManager.prototype.__setCurrentState = Phaser.StateManager.prototype.setCurrentState;

Phaser.StateManager.prototype.setCurrentState = function(key) {
    this.__setCurrentState(key);

    this.onPreloadCallback = this.__customPreloadCallback;
    this.onCreateCallback = this.__customCreateCallback;
    this.onUpdateCallback = this.__customUpdateCallback;
};

Phaser.StateManager.prototype.__customPreloadCallback = function() {
    callCustomMethods('preload__', this, this.game);
    if (this.preload) {
        this.preload.call(this, this.game);
    }
};

Phaser.StateManager.prototype.__customCreateCallback = function() {
    callCustomMethods('create__', this, this.game);
    if (this.create) {
        this.create.call(this, this.game);
    }
    callCustomMethods('postCreate__', this, this.game);
};

Phaser.StateManager.prototype.__customUpdateCallback = function() {
    callCustomMethods('update__', this, this.game);
    if (this.update) {
        this.update.call(this, this.game);
    }
    callCustomMethods('postUpdate__', this, this.game);
};

function callCustomMethods(prefix, state, game) {
    let allMethods = getAllMethods(state);
    for(let i in allMethods) {
        let methodName = allMethods[i];
        if (methodName.startsWith(prefix)) {
            state[methodName].call(state, game);
        }
    }
    return allMethods;
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
    this.scale.set(1);
    this.fixedToCamera = false;

    this.anchor.set(.5);

    if (this.fixedToCamera === false) {
        this.position.x = game.camera.width / 2;
        this.position.y = game.camera.height / 2;
    } else {
        this.cameraOffset.x = game.camera.width / 2;
        this.cameraOffset.y = game.camera.height / 2;
    }

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
    this.scale.set(1);

    let spriteRatio = this.width/this.height;
    let screenRatio = world.electronPhaserSettings.canvasResolution[0] / world.electronPhaserSettings.canvasResolution[1];

    let scaleFactor;
    if (spriteRatio >= screenRatio) {
        scaleFactor = world.electronPhaserSettings.canvasResolution[0] / this.width;
    } else {
        scaleFactor = world.electronPhaserSettings.canvasResolution[1] / this.height;
    }

    this.scale.set(scaleFactor);

    console.log(this.fixedToCamera);
    if (this.fixedToCamera === false) {
        this.position.x = game.camera.width / 2 - this.width / 2;
        this.position.y = game.camera.height / 2 - this.height / 2;
    } else {
        console.log(game.camera.height, this.height);
        this.cameraOffset.x = game.camera.width / 2 - this.width / 2;
        this.cameraOffset.y = game.camera.height / 2 - this.height / 2;
    }
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

Object.defineProperty(Phaser.Physics.P2.Body.prototype, 'sensor', {
    set: function(sensorStatus) {
        sensorStatus = Boolean(sensorStatus);
        for (let i in this.data.shapes) {
            this.data.shapes[i].sensor = sensorStatus;
        }
    }
});