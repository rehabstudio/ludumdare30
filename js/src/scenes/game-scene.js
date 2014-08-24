var Phaser = require('phaser');

var Scene = require('./base');

var Actors = {
    Player: require('../actors/player')
};

var UI = {
};

var Environment = {
    Starfield: require('../environ/starfield')
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

    this.config = config;
    this.sprites = [];

    this.game.world.setBounds(-1000, -1000, 2000, 2000);

    _addPlayer.call(this);
    _configCamera.call(this);

    _addStarfield.call(this);

};

GameScene.prototype.update = function(){

    this.player.update();

}

GameScene.prototype.destroy = function(){
    Scene.prototype.onDestroy.call(this);
};

GameScene.prototype.render = function(){

    this.player.onRender();

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
    this.stars = new Environment.Starfield(this.game, this.game.width/2, this.game.height/2);
}

module.exports = GameScene;
