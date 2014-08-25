var Phaser = require('phaser');
var BaseEnemy = require('./base-enemy');

var Enemy = function(scene){

    BaseEnemy.call(this, scene, { sprite: 'enemy' });

};

Enemy.prototype = Object.create(BaseEnemy.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.setup = function() {
    console.log('Enemy setup');
}

module.exports = Enemy;
