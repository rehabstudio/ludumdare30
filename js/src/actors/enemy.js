var Phaser = require('phaser');
var BaseEnemy = require('./base-enemy');

var Enemy = function(scene){

    BaseEnemy.call(this, scene, {
        sprite: 'enemy',
        bulletSpeed: 200,
        fireRate: 6000
    });

    this.fireDistance = 500;

};

Enemy.prototype = Object.create(BaseEnemy.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.setup = function() {
    console.log('Enemy setup');
}

Enemy.prototype.decide = function() {

    if(Math.random() > 0.9) fireAtPlayer.call(this);

}

function fireAtPlayer() {

    var targ = this.scene.player;

    if(this.game.physics.arcade.distanceBetween(this, targ) > this.fireDistance) return false;

    this.fire();

}

module.exports = Enemy;
