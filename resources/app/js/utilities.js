function closeWindow() {
    let remote = require('electron').remote;
    let window = remote.getCurrentWindow();
    window.close();
}