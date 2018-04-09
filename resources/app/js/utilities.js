function closeWindow() {
    let remote = require('electron').remote;
    let window = remote.getCurrentWindow();
    window.close();
}

function raiseWindowShield(color) {
    if (world.windowShield) {
        world.windowShield.destroy();
    }
    let graphics = game.add.graphics(0, 0);
    if (typeof color === 'string' ) {
        color = Phaser.Color.hexToRGB(color)
    }
    graphics.beginFill(color);
    world.windowShield = graphics.drawRect(0, 0, game.world.width, game.world.height);
}

function lowerWindowShield() {
    if (world.windowShield) {
        world.windowShield.destroy();
    }
}