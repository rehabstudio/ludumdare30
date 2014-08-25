var Phaser = require('phaser');

var Cursor = function(game) {

    Phaser.Sprite.call(this, game, 0, 0, 'cursor', 0);
    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.game = game;

};

Cursor.prototype = Object.create(Phaser.Sprite.prototype);
Cursor.prototype.constructor = Cursor;

Cursor.prototype.update = function() {
    //console.log('cursor update');
    this.cameraOffset.x = this.game.input.activePointer.x;
    this.cameraOffset.y = this.game.input.activePointer.y;
};

module.exports = Cursor;