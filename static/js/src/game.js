var _ = require('lodash');
var Phaser = require('phaser');
var Assets = require('./assets');
var config = require('./config');

var Scenes = {
    game: require('./scenes/game-scene'),
    title: require('./scenes/title-scene')
};

var WorldManager = require('./worlds.js');

var Game = function(){
    Phaser.Game.prototype.constructor.call(
        this,
        800, 800,
        Phaser.AUTO,
        'stage',
        {
            preload: _.bind(this.onPreload, this),
            create: _.bind(this.onCreate, this)
        }
    );
};

Game.prototype = Object.create(Phaser.Game.prototype);

Game.prototype.onPreload = function(){
    this.showLoader();
    var self = this;
    Assets.preload(this, function(progress, cacheKey, success, totalLoaded, totalFiles) {
        self.loaderText.text = 'LOADING... ' + progress.toString() + '%';
    });
};

Game.prototype.showLoader = function() {

    var style = config.font.baseStyle;

    var text = this.add.text(this.width * 0.5, this.height * 0.5, 'LOADING...', style);
    text.anchor.setTo(0.5);

    this.loaderText = text;

}

Game.prototype.onCreate = function(){

    Phaser.Sound.volume = 0.2;

    this.worldManager = new WorldManager(this);

    this.state.add('title-scene', new Scenes.title(), false);
    this.state.add('game-scene', new Scenes.game(), false);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    _changeState.call(this, 'title-scene');

};

Game.prototype.startGame = function() {
     _changeState.call(this, 'game-scene');
};

Game.prototype.onPaused = function() {
    console.log('PAUSED');
};

Game.prototype.onResume = function() {
    console.log('RESUME');
};


function _changeState(stateID) {
    this.state.start(stateID, true, false);
};

module.exports = Game;
