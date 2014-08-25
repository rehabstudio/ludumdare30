var Phaser = require('phaser');

var Starfield = function(game, x, y){

    var starImg = this._createStarImage();
    game.cache.addImage('star', null, starImg);

   // this.alpha = 0.6;

    var emitter = game.add.emitter(game.width / 2, game.height/2, 400);

    emitter.width = game.width * 1.5;
    emitter.height = game.height * 1.5;

    emitter.makeParticles('star');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;

    // TODO: make this scene-specific

    emitter.setYSpeed(-100, 100);
    emitter.setXSpeed(-100, 100);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.gravity = 0;

    emitter.fixedToCamera = true;

    emitter.start(false, 3000, 15);

    //console.log('emitter', emitter);

};

Starfield.prototype = Object.create(Phaser.Sprite.prototype);
Starfield.prototype.constructor = Starfield;

Starfield.prototype._createStarImage = function() {

    var c = document.createElement('canvas');
    c.width = 5, c.height=5;
    var ctx = c.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, c.width, c.height);

    var cimg = new Image;
    cimg.src = c.toDataURL('image/png');
    return cimg;
}


module.exports = Starfield;