var Phaser = require('phaser');
var BaseEnemy = require('./base-enemy');

var Enemy = function(scene){

    BaseEnemy.call(this, scene, {
        sprite: 'enemy',
        bulletSpeed: 200,
        fireRate: 3000
    });

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
    this.fire();

}

module.exports = Enemy;
