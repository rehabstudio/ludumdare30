var Phaser = require('phaser');

var Portal = function(scene) {

    Phaser.Sprite.call(this, scene.game, 0, 0, 'portal', 0);

    this.scene = scene;
    this.anchor.set(0.5,0.5);

    this.scale.setTo(2,2);
    this.alpha = 0.4;

    this.x = 0; //scene.game.world.randomX;
    this.y = 0; //randomY;

    this.rotateSpeed = 0.01;


}

Portal.prototype = Object.create(Phaser.Sprite.prototype);
Portal.prototype.constructor = Portal;

Portal.prototype.createEmitter = function() {
    console.log('Portal created');
    this.emitter = this.scene.add.emitter(this.x, this.y, 5);

    this.close();
}

Portal.prototype.update = function() {
    this.rotation += this.rotateSpeed;
}

Portal.prototype.open = function() {

    this.rotateSpeed = 0.03;
    this.alpha = 1;
    emitOpen(this.emitter);

}

Portal.prototype.close = function() {

    this.rotateSpeed = 0.01;
    this.alpha = 0.4;
    emitClosed(this.emitter);

}

function emitClosed(emitter) {

    emitter.makeParticles('pixel');
    emitter.particleBringToTop = true;
    emitter.minParticleScale = 5;
    emitter.maxParticleScale = 10;
    emitter.alpha = 0.3;
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.setYSpeed(-100, 100);
    emitter.setXSpeed(-100, 100);
    emitter.gravity = 0;
    emitter.forEach(function(particle) {
        particle.tint = 0x00ccff;
    });
    emitter.start(false, 2000, 3);

}

function emitOpen(emitter) {

    emitter.makeParticles('pixel');
    emitter.particleBringToTop = true;
    emitter.minParticleScale = 30;
    emitter.maxParticleScale = 50;
    emitter.width = 10;
    emitter.height = 10;
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.setYSpeed(-90, 90);
    emitter.setXSpeed(-90, 90);
    emitter.gravity = 0;
    emitter.forEach(function(particle) {
        particle.tint = 0x00000;
    });
    emitter.start(false, 300, 5);


}


module.exports = Portal;