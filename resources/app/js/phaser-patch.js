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