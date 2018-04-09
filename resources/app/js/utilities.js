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
    graphics.beginFill(Phaser.Color.hexToRGB(color));
    world.windowShield = graphics.drawRect(0, 0, game.world.width, game.world.height);
}

function lowerWindowShield() {
    if (world.windowShield) {
        world.windowShield.destroy();
    }
}