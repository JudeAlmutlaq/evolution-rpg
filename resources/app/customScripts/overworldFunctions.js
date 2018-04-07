console.log('hello');

class OverworldFunctions {

    // __preCursors(){
    //     this.cursors = game.input.keyboard.createCursorKeys();
    //     console.log('bananas2')
    // }
    handleMovement(){
        this.jude.body.setZeroVelocity();

        var xDir = 0;
        var yDir = 0;
        var speed = 0;

        if (this.cursors.up.isDown) {
            yDir--;
        }
        if (this.cursors.down.isDown) {
            yDir++;
        }
        if (this.cursors.left.isDown) {
            xDir--;
        }
        if (this.cursors.right.isDown) {
            xDir++;
        }
        if (xDir && yDir){
            speed = 106;
        } else {
            speed = 150;
        }
        this.jude.body.velocity.x = xDir*speed;
        this.jude.body.velocity.y = yDir*speed;
        if (yDir === -1){
            this.jude.animations.play('up');
        } else if (yDir === 1){
            this.jude.animations.play('down');
        } else if (xDir === -1){
            this.jude.animations.play('left');
        }else if (xDir === 1){
            this.jude.animations.play('right');
        }else {
            this.jude.animations.stop();
        }

    }
}