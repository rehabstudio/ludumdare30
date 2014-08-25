var Phaser = require('phaser');
var config = require('config');
var STRINGS = require('strings');
var Scene = require('./base');

var Actors = {
    Player: require('../actors/player'),
    Enemy: require('../actors/enemy')
};

var UI = {
    Score: require('../ui/score'),
    WorldName: require('../ui/worldname'),
    Lives: require('../ui/lives'),
    Cursor: require('../ui/cursor')
};

var Environment = {
    Starfield: require('../environ/starfield'),
    StarBG: require('../environ/starbg'),
    Portal: require('../environ/portal')
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

    this._genWorld = this.game.worldManager.generateNewWorld();

    _addStarfield.call(this);
    _setupPortals.call(this);
    _addPlayer.call(this);
    _setupEnemyBullets.call(this);
    _setupEnemies.call(this);

    _configCamera.call(this);

    this.cursor = new UI.Cursor(this);
    this.add.existing(this.cursor);
    this.cursor.bringToTop();

    this.score = new UI.Score(this);
    this.lives = new UI.Lives(this);
    this.nameDisplay = new UI.WorldName(this);

    this.game.worldManager.recoverData(this);

    this.score.update();
    this.lives.updateFromPlayer(this.player);

    this.nameDisplay.setValue(this._genWorld.name);

    _showEntryName.call(this, this._genWorld.name, this._genWorld.mainColor);

    var warpSound = this.add.audio('longwarp');
    warpSound.play();

};

GameScene.prototype.update = function(){

    this.physics.arcade.collide(this.player.bullets, this.enemies, this.playerBulletHitsEnemy, null, this);
    if(!this.player._isInvul) {
        this.physics.arcade.collide(this.player, this.enemies, this.enemyHitsPlayer, null, this);
        this.physics.arcade.collide(this.player, this.enemyBullets, this.enemyBulletHitsPlayer, null, this);
    }
    this.physics.arcade.overlap(this.player, this.portals, this.playerOverPortal, null, this);

    this.player.update();
    this.starbg.update();
    this.cursor.update();

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
    this.playerLoseLife(player);
};

GameScene.prototype.enemyBulletHitsPlayer = function(player, bullet) {
    bullet.kill();
    this.playerLoseLife(player);
};

GameScene.prototype.playerOverPortal = function(player, portal) {
    if(!portal.isOpen) return false();

    if(player.actionButton.isDown && !player._isWarping) {
        this.usePortal(player, portal);
    }
};

GameScene.prototype.usePortal = function(player, portal) {

    player._isWarping = true;
    this.enemyBullets.forEach(function(b) { b.kill(); });
    player.kill();
    player.active = false;
    this.player.sounds.warp.play();
    this.player.fireSpawnParticles();
    this.game.time.events.add(2000, function() {
        this.game.worldManager.storeData(this);
        this.game.state.start('game-scene', true, false);
    }, this);

};

GameScene.prototype.playerLoseLife = function(player) {

    player.die();

    if(player.lives > 0) {
        this.game.time.events.add(2000, function() {
            player.spawn();
            this.lives.updateFromPlayer(player);
        }, this);
    } else {
        this.gameOver();
    }

};

GameScene.prototype.addToScore = function(amt) {
    this.score.addAmount(amt);
};

GameScene.prototype.gameOver = function() {

    this.game.worldManager.clearData();

    this.gameover = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'gameOverText');
    this.gameover.fixedToCamera = true;
    this.gameover.anchor.setTo(0.5,0.5);
    this.time.events.add(5000, function() {
        this.game.state.start('title-scene', true, false);
    }, this);
}

function _addPlayer() {
    this.player = new Actors.Player(this);
    this.player.setPosition(this.game.width/2, this.game.height/2);
    this.add.existing(this.player);
    this.sprites.push(this.player);

    if(this.game.worldManager.data) this.player.lives = this.game.worldManager.data.lives;
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

function _setupPortals() {

    this.portals = this.game.add.group();

    var portal = new Environment.Portal(this);

    this.portals.add(portal);
    portal.createEmitter();

}

function _setupEnemies() {
    this.enemies = this.game.add.group();

    for(var i = 0; i < this._numEnemies; i++) {
        var nme = new Actors.Enemy(this);
        this.enemies.add(nme);
    }
}

function _showEntryName(name, color) {

    var style = Object.create(config.font.baseStyle);
    style.font = '36px VT323';
    var enterText = this.add.text(this.game.width * 0.5, (this.game.height * 0.5) - 40, STRINGS.enteringLevel.toUpperCase(), style);
    enterText.anchor.setTo(0.5);
    enterText.fixedToCamera = true;

    var bigStyle = Object.create(config.font.baseStyle);
    bigStyle.font = '60px VT323';
    bigStyle.stroke = '#ccc';
    var nameText = this.add.text(this.game.width * 0.5, (this.game.height * 0.5) + 20, name.toUpperCase(), bigStyle);

    nameText.anchor.setTo(0.5);
    nameText.fixedToCamera = true;
    var grd = nameText.context.createLinearGradient(0, 0, 0, nameText.canvas.height);
    grd.addColorStop(0, Phaser.Color.getWebRGB(color));
    grd.addColorStop(1, '#444444');
    nameText.fill = grd;

    this.time.events.add(2000, function() {
        enterText.destroy();
        nameText.destroy();
    }, this);

}

function _setupEnemyBullets() {
    this.enemyBullets = this.game.add.group();

    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(40, 'bullet', 0, false);
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('lifespan', 2000);
    this.enemyBullets.setAll('scale.x', 2);
    this.enemyBullets.setAll('scale.y', 2);
    /*this.enemyBullets.forEach(function(bullet) {
        bullet.tint = 0xff0000;
    });*/
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);

    this.time.events.loop(80, function() {
        this.enemyBullets.alpha = (this.enemyBullets.alpha == 1) ? 0.5 : 1;
    }, this);
}

module.exports = GameScene;
