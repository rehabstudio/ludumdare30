var Phaser = require('phaser');

var Scene = require('./base');

var Actors = {
    Player: require('../actors/player'),
    Enemy: require('../actors/enemy')
};

var UI = {
    Score: require('../ui/score'),
    Cursor: require('../ui/cursor')
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
    _setupEnemyBullets.call(this);
    _setupEnemies.call(this);

    _configCamera.call(this);

    this.cursor = new UI.Cursor(this);
    this.add.existing(this.cursor);
    this.cursor.bringToTop();

    this.score = new UI.Score(this);

};

GameScene.prototype.update = function(){

    this.physics.arcade.collide(this.player.bullets, this.enemies, this.playerBulletHitsEnemy, null, this);
    if(!this.player._isInvul) {
        this.physics.arcade.collide(this.player, this.enemies, this.enemyHitsPlayer, null, this);
        this.physics.arcade.collide(this.player, this.enemyBullets, this.enemyBulletHitsPlayer, null, this);
    }
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

GameScene.prototype.playerLoseLife = function(player) {

    player.die();

    if(player.lives > 0) {
        this.game.time.events.add(2000, function() {
            player.spawn();
        }, this);
    } else {
        this.gameOver();
    }

};

GameScene.prototype.addToScore = function(amt) {
    this.score.addAmount(amt);
};

GameScene.prototype.gameOver = function() {
    this.gameover = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'gameOverText');
    this.gameover.fixedToCamera = true;
    this.gameover.anchor.setTo(0.5,0.5);
    this.game.time.events.add(5000, function() {
        this.game.state.start('title-scene', true, false);
    }, this);
}

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

function _setupEnemyBullets() {
    this.enemyBullets = this.game.add.group();

    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(40, 'bullet', 0, false);
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('lifespan', 2000);
    this.enemyBullets.forEach(function(bullet) {
        bullet.tint = 0xff0000;
    });
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
}

module.exports = GameScene;
