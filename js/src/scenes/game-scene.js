var Phaser = require('phaser');

var Scene = require('./base');

var Actors = {
    Player: require('../actors/player'),
    Enemy: require('../actors/enemy')
};

var UI = {
    Score: require('../ui/score')
};

var Environment = {
    Starfield: require('../environ/starfield'),
    StarBG: require('../environ/starbg')
}

var Powerups = {
};

var GameScene = function(){
    Scene.prototype.constructor.call(this);
};

GameScene.prototype = Object.create(Scene.prototype);
GameScene.prototype.constructor = GameScene;


GameScene.prototype.create = function(){
    console.log('GameScene:create');
};

GameScene.prototype.init = function(config){

    window.startTime = this.game.time.now;



    this._numEnemies = 20;

    this.config = config;
    this.sprites = [];

    this.game.world.setBounds(-1000, -1000, 2000, 2000);

    _addStarfield.call(this);
    _addPlayer.call(this);

    _setupEnemies.call(this);

    _configCamera.call(this);

    this.score = new UI.Score(this);

};

GameScene.prototype.update = function(){

    this.physics.arcade.collide(this.player.bullets, this.enemies, this.playerBulletHitsEnemy, null, this);
    this.physics.arcade.collide(this.player, this.enemies, this.enemyHitsPlayer, null, this);
    //this.physics.arcade.collide(this.player, this.enemies, this.enemyHitsPlayer, null, this);

    this.player.update();
    this.starbg.update();

}

GameScene.prototype.destroy = function(){
    Scene.prototype.onDestroy.call(this);
};

GameScene.prototype.render = function(){

    this.player.onRender();

};

GameScene.prototype.playerBulletHitsEnemy = function(bullet, enemy) {
    bullet.kill();
    enemy.die();
};

GameScene.prototype.enemyHitsPlayer = function(player, enemy) {
    player.die();
};

GameScene.prototype.enemyBulletHitsPlayer = function(player, bullet) {
    player.die();
};

GameScene.prototype.addToScore = function(amt) {
    this.score.addAmount(amt);
};

function _addPlayer() {
    this.player = new Actors.Player(this);
    this.player.setPosition(this.game.width/2, this.game.height/2);
    this.add.existing(this.player);
    this.sprites.push(this.player);
}

function _configCamera() {
    this.camera.focusOn(this.player);
    this.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
}

function _addStarfield() {
    this.starbg = new Environment.StarBG(this);

    this.add.existing(this.starbg);
    this.sprites.push(this.starbg);

    this.stars = new Environment.Starfield(this.game, this.game.width/2, this.game.height/2);

}

function _setupEnemies() {
    this.enemies = this.game.add.group();

    for(var i = 0; i < this._numEnemies; i++) {
        var nme = new Actors.Enemy(this);
        this.enemies.add(nme);
    }
}

module.exports = GameScene;
