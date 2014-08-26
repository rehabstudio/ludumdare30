var Phaser = require('phaser');
var BaseEnemy = require('./base-enemy');

var Enemy = function(scene){

    BaseEnemy.call(this, scene, {
        sprite: 'enemy',
        bulletSpeed: 200,
        fireRate: 6000
    });

    this.fireDistance = 400;
    this.movementRadius = 800;

    this.reactionTime = scene.game.rnd.integerInRange(50,500);
    this._lastMoveTime = 0;

};

Enemy.prototype = Object.create(BaseEnemy.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.setup = function() {

    /*this.points = [];
    this.points.push({
        x: this.x,
        y: this.y
    });

    var minX = Math.max(this.x-this.movementRadius, 0),
        maxX = Math.min(this.x+this.movementRadius, this.scene.game.world.width),
        minY = Math.max(this.y-this.movementRadius, 0),
        maxY = Math.min(this.y+this.movementRadius, this.scene.game.world.height);

    var rnd = this.scene.game.rnd;

    var numPoints = rnd.integerInRange(1,5);

    for(var i = 0; i < numPoints; i++) {
        this.points.push({
            x: Phaser.Math.clamp(rnd.integerInRange(minX, maxX)),
            y: Phaser.Math.clamp(rnd.integerInRange(minY, maxY)),
        });
    }

    var currentPoint = 0;*/

}

Enemy.prototype.decide = function() {

    if(Math.random() < this.aggression) fireAtPlayer.call(this);

    if (this.scene.game.time.now > this._lastMoveTime)
    {
        moveTowardsPlayer.call(this);
        this._lastMoveTime = this.game.time.now + this.reactionTime;
    }

};

Enemy.prototype.fireSpawnParticles = function() {
    spawnIn.call(this);
};

function fireAtPlayer() {

    var targ = this.scene.player;

    if(!targ.active || targ._isDead) return false;

    if(this.game.physics.arcade.distanceBetween(this, targ) > this.fireDistance) return false;
    this.rotation = this.game.physics.arcade.angleBetween(this, targ);
    this.fire();

}

function moveTowardsPlayer() {

    var targ = this.scene.player;

    if(!targ.active || targ._isDead) return false;

    this.rotation = this.game.physics.arcade.angleBetween(this, targ);
    this.game.physics.arcade.accelerateToObject(this, this.scene.player, this.accel, this.maxSpeed, this.maxSpeed);

}

function spawnIn() {

    var emitter = this.game.add.emitter(this.x, this.y, 20);
    emitter.makeParticles('pixel');
    emitter.minParticleScale = 3;
    emitter.maxParticleScale = 6;
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.setYSpeed(-300, 300);
    emitter.setXSpeed(-300, 300);
    emitter.gravity = 0;
    emitter.forEach(function(particle) {
        particle.tint = 0xff0000;
    });
    emitter.start(true, 100, null, 10 + Math.random() * 5);
    this.game.time.events.add(300, function() {
        emitter.destroy();
    }, this);
}

module.exports = Enemy;
