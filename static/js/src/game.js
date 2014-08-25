var _ = require('lodash');
var Phaser = require('phaser');
var Assets = require('./assets');

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
    Assets.preload(this);
};

Game.prototype.onCreate = function(){

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
