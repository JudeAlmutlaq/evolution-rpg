# Electron-Phaser

## The Application

This template is a windows-x64 instance of electron set up with the Phaser 2 game framework. The application will start fullscreen, with the phaser canvas stretched to the largest it can be while maintaining the canvas ratio.

The application can be run by executing `electron.exe`. By default, alt-f4 will be the only way to close the application. `electron.exe` can be renamed as desired.

All files for the application can be found in `/resources/app/`. This is where all application code and resources should be placed. The rest of the files are part of the Electron framework and should not be altered.

## Phaser

Phaser states are defined in the `states` directory. Every .js file in that directory will be automatically loaded and added as a 'state' to the phaser system. The state name will be the filename (without the `.js`). The initial stage is defined in `states/Main.js`'.

A stage can be loaded using the following Phaser method: 

    game.state.start('StageName');

`game` is defined as a world variable, and will be accessible in all application files. `game` is an instance of `Phaser.Game` and can be used to access all Phaser attributes and methods. 

## Global variables and Settings

There will be a global variable defined called `world`. Properties inside the `world` variable will be accessible from anywhere. You may place your own data inside `world` if you want to keep the data across states. Initial setting for the application can be found in `settings.js`. Settings are accessable inside the world variable at `world.electronPhaserSettings` will be declared with all of the settings in that file. Additional settings or variable you want to access worldly can be added to the `settings.js` file.

## Custom scripts folder

There is a folder `/resources/app/customSctripts`. Any `.js` file placed in this folder will be included. Functions, variables and classes defined in these files will be placed in the global namespace.

## Additional functions

`/resources/app/js/utilities.js` contains some other functions that could be of use. 

* `closeWindow()` will completely close the application
* `raiseWindowShield(color)` will cover the screen with a color, useful when the screen state shouldn't be viewed
* `lowerWindowShield()` will destroy the window shield

Other functionality added to phaser:

* `.fullscreen()` is a method added to both sprites and groups. This method will scale the object up as large as it can be while fitting inside the window. It will also center the object.
* `game.fixColors(color, objects)` is a fix for an issue that causes certain objects to have a brighter color in the area where the camera first shows. `color` is the color of the shield that will be raised as the fix is being applied. `objects` is an array of graphics objects that need their color to be fixed. 

## Custom state methods

Additional methods have been provided that will allow you to easily add functionality to a state. These methods are alternatives to the built in game loop methods. The purpose is to allow you to make a base class that has its own update / create / preload functions that will still allow a child class to function normally.

Any method in a state class with the following prefix will be run at the following points:

* `preload__` methods will run before the Phaser `preload` function
* `create__` methods will run before the Phaser `create` function
* `update__` methods will run before the Phaser `update` function
* `postUpdate__` methods will run after the Phaser `update` function