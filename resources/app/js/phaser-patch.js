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