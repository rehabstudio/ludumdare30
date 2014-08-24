var Phaser = require('phaser');

var Enemy = function(scene){

    Phaser.Sprite.call(this, scene.game, 0, 0, 'enemy', 0);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.immovable = true;

    this.x = scene.game.world.randomX;
    this.y = scene.game.world.randomY;
    this.angle = scene.game.rnd.angle();

    //this.scale.x = this.scale.y = this.baseScale = 0.6;
    this.anchor.setTo(0.5, 0.5);

    this.speed = Math.random()*10 + 15;

    this.PARTICLE_LIFE = 500;

    this.score = 250;

    this.bulletSpeed = 1000;
    this.bulletLifespan = 2000;

    this.fireRate = 1000;
    this._lastFireTime = this.game.time.now;

    //_setupEnemyBullets.call(this);

    this.scene = scene;

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
};

Enemy.prototype.update = function(){
    //this.updateSpeed();
};

Enemy.prototype.onRender = function(){

};

Enemy.prototype.updateSpeed = function(){
    this.body.velocity.x /= this.damping;
    this.body.velocity.y /= this.damping;

    if (Math.abs(this.body.velocity.x) < 0.01){
        this.body.velocity.x = 0;
    }

    if (Math.abs(this.body.velocity.y) < 0.01){
        this.body.velocity.y = 0;
    }
};


Enemy.prototype.fire = function() {

    if (this.game.time.now > this._lastFireTime)
    {
        console.log('fire');
        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(this.x, this.y);
            bullet.rotation = this.rotation;
            this.game.physics.arcade.velocityFromRotation(bullet.rotation - 1.57079633, this.bulletSpeed, bullet.body.velocity);
            this._lastFireTime = this.game.time.now + this.fireRate;
        }
    }
};

Enemy.prototype.die = function() {
    // play death anim
    explode.call(this);
    this.destroy();

    this.scene.addToScore(this.score);
};

function _setupEnemyBullets() {
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(20, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('lifespan', this.bulletLifespan);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
}

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
    setTimeout(function() {
        emitter.destroy();
    }, this.PARTICLE_LIFE);
}


module.exports = Enemy;
