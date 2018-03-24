This template is a windows-x64 instance of electron set up with the phaser game framework. The application will start fullscreen, with the phaser canvas stretched to the largest it can be while maintaining ratio.

All files for the application can be found in `/resources/app/`. This is where all application code and resources should be placed. The initial stage is defined in `start.js`' 

Application can be run by executing `electron.exe`. By default, alt-f4 will be the only way to close the application.

Things that can be changed:

0. The window background color can be found on line 2 of main.scss
0. The canvas background color can be found on line 15 of start.js
0. The dev tools start open. This is defined on line 22 of main.js
0. The canvas resolution is defined on line 16 on index.html
0. `electron.exe` can be renamed without causing problems