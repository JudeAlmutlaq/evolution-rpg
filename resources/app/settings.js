module.exports = {
    // The color of the window, which will show when the canvas width/height ratio is not equal to the screen ratio
    windowBackgroundColor: '#4488AA',

    // The background color of the phaser canvas
    canvasBackgroundColor: '#000000',

    // When true, the chrome dev tools will be open on startup. For debugging.
    devToolsOpen: true,

    // The resolution of the canvas if the screen has a 16:9 aspect ration
    canvasResolution_16x9: [1280, 720],

    // The resolution of the canvas if the screen has a 4:3 aspect ration
    canvasResolution_4x3: [1280, 960],

    // The resolution of the canvas if the screen has a different aspect ratio
    canvasResolution_other: [1280, 720],

    // This will be set to the actual canvas resolution at runtime
    canvasResolution: []
};