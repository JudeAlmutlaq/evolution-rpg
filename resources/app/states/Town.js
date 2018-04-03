var jude;
var town;
var down;
var left;
var right;
var up;
var cursors;
var same;

class State {


    preload() {


        game.load.spritesheet('jude', 'images/JudeChar.png', 32, 32, 12);
        game.load.image('town', 'images/GLtown.png');
        game.load.image('same', 'images/GLtownnopass.png');

    };

    create() {

        town = game.add.sprite(game.world.centerX, game.world.centerY, 'town');

        town.anchor.setTo(0.5, 0.5);

        same = game.add.sprite(game.world.centerX, game.world.centerY, 'same');

        same.anchor.setTo(0.5, 0.5);

        game.world.setBounds(0, 0, 2000, 2000);

        game.physics.startSystem(Phaser.Physics.P2JS);

        game.physics.p2.setImpactEvents(true);

        //game.physics.p2.restitution = 0.8;

        jude = game.add.sprite(game.world.centerX, game.world.centerY, 'jude');

        jude.anchor.setTo(0.5);

        game.physics.p2.enable(jude);

        same.enableBody = true;

        down = jude.animations.add('down', [0, 1, 2], 10, true);
        left = jude.animations.add('left', [3, 4, 5], 10, true);
        right = jude.animations.add('right', [6, 7, 8], 10, true);
        up = jude.animations.add('up', [9, 10, 11], 10, true);

        cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(jude);

    };

    update() {

        jude.body.setZeroVelocity();

        game.physics.arcade.collide(jude, same);

        if (cursors.left.isDown)
        {
            jude.body.moveLeft(150);
            jude.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            jude.body.moveRight(150);
            jude.animations.play('right');
        }

        if (cursors.up.isDown)
        {
            jude.body.moveUp(150);
            jude.animations.play('up');
        }
        else if (cursors.down.isDown)
        {
            jude.body.moveDown(150);
            jude.animations.play('down');
        }

    };
}

module.exports = {
    state: State
};
