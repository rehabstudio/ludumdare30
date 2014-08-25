var Phaser = require('phaser');

var BaseEnemy = function(scene, options){

    var sprite = options.sprite || this.sprite;

    Phaser.Sprite.call(this, scene.game, 0, 0, sprite, 0);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // config
    this.speed = options.speed || Math.random()*10 + 15;
    this.score = options.score || 250;

    this.bulletSpeed = options.bulletSpeed || 1000;
    this.bulletLifespan = 2000;
    this.fireRate = 1000;

    // others
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    this.x = scene.game.world.randomX;
    this.y = scene.game.world.randomY;
    this.angle = scene.game.rnd.angle();

    this._lastFireTime = this.game.time.now;
    this.PARTICLE_LIFE = 500;

    this.scene = scene;

    this.sounds = {
        fire: this.scene.add.audio('enemyfire', 0.5),
        death: this.scene.add.audio('enemydeath')
    };

    this.setup();

};

BaseEnemy.prototype = Object.create(Phaser.Sprite.prototype);
BaseEnemy.prototype.constructor = BaseEnemy;

BaseEnemy.prototype.setup = function() {};

BaseEnemy.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
};

BaseEnemy.prototype.update = function(){
    this.decide();
};

BaseEnemy.prototype.onRender = function(){

};

BaseEnemy.prototype.updateSpeed = function(){
    this.body.velocity.x /= this.damping;
    this.body.velocity.y /= this.damping;

    if (Math.abs(this.body.velocity.x) < 0.01){
        this.body.velocity.x = 0;
    }

    if (Math.abs(this.body.velocity.y) < 0.01){
        this.body.velocity.y = 0;
    }
};


BaseEnemy.prototype.fire = function() {

    if (this.game.time.now > this._lastFireTime)
    {

        var bullet = this.scene.enemyBullets.getFirstExists(false);

        if (bullet)
        {
            this.sounds.fire.play();
            bullet.reset(this.x, this.y);
            bullet.rotation = this.rotation - 1.57079633;
            this.game.physics.arcade.velocityFromRotation(this.rotation, this.bulletSpeed, bullet.body.velocity);
            this._lastFireTime = this.game.time.now + this.fireRate;
        }
    }
};

BaseEnemy.prototype.die = function() {
    // play death anim
    explode.call(this);
    this.sounds.death.play();
    this.destroy();

    this.scene.addToScore(this.score);
};


function explode() {
    var emitter = this.game.add.emitter(this.x, this.y, 10);
    emitter.makeParticles('pixel');
    emitter.setAlpha(1, 0, this.PARTICLE_LIFE, Phaser.Easing.Linear.In);
    emitter.minParticleScale = 10;
    emitter.maxParticleScale = 40;
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.setYSpeed(-200, 200);
    emitter.setXSpeed(-200, 200);
    emitter.gravity = 0;
    emitter.forEach(function(particle) {
        particle.tint = 0xff0000;
    });
    emitter.start(true, this.PARTICLE_LIFE, null, 10 + Math.random() * 5);
    this.game.time.events.add(this.PARTICLE_LIFE, function() {
        emitter.destroy();
    }, this);
}

module.exports = BaseEnemy;