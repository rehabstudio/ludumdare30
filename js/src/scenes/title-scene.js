var Phaser = require('phaser');
var STRINGS = require('strings');
var Scene = require('./base');

var Environ = {
    StarBG: require('../environ/starbg')
};

var TitleScene = function(){
    Scene.prototype.constructor.call(this);
};

TitleScene.prototype = Object.create(Scene.prototype);
TitleScene.prototype.constructor = TitleScene;


TitleScene.prototype.create = function(){
    _displayStars.call(this);
    _displayRect.call(this);
    _displayLogo.call(this);

    this.game.time.events.add(3000, function() {
        _displayStartText.call(this);
    }, this);
    _displayCopyText.call(this);
};

TitleScene.prototype.init = function(config){
};

TitleScene.prototype.update = function(){
    this.stars.update();
    _waitForStart.call(this);
}

TitleScene.prototype.destroy = function(){
    Scene.prototype.onDestroy.call(this);
};

TitleScene.prototype.render = function(){

};

function _displayStars() {
    this.stars = new Environ.StarBG(this);

    this.stars.update = function() {
        this.tilePosition.y -= 0.2;
    };

    this.add.existing(this.stars);
}

function _displayRect() {

    var rect = this.add.sprite(0, 0, 'pixel');
    rect.width = this.game.width;
    rect.height = this.game.height;
    rect.tint = 0x000000;

    this.rect = rect;

}

function _displayLogo() {
    this.logo = this.add.sprite(this.game.width * 0.5, 200, 'logo');
    this.logo.scale.setTo(5);
    this.logo.anchor.setTo(0.5);
    this.logo.fixedToCamera = true;

    this.logoEx = this.add.emitter(this.logo.x, this.logo.y, 40);

    var bounce = this.add.tween(this.logo.scale);

    bounce.to({ x:1, y: 1 }, 600, Phaser.Easing.Linear.None);
    bounce.onComplete.add(function() {
        explode.call(this);
        this.rect.tint = 0xffffff;
        this.add.tween(this.rect).to({ alpha:0 }, 3000, Phaser.Easing.Linear.None).start();
    }, this);
    bounce.start();
}

function _displayStartText() {
    this.startText = this.add.sprite(this.game.width * 0.5, 500, 'startText');
    this.startText.anchor.setTo(0.5);

    this.game.time.events.loop(500, function() {
        this.startText.alpha = !this.startText.alpha;
    }, this);
};

function _waitForStart() {
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.input.activePointer.isDown){
        this.game.startGame();
    }
};

function _displayCopyText() {

    var style = {
        font: "24px VT323",
        fill: "#caa",
        stroke: "#000",
        strokeThickness: 1,
        align: "center"
    };
    var text = this.add.text(this.game.width * 0.5, this.game.height - 60, STRINGS.copyText, style);
    text.anchor.setTo(0.5);
}

function explode(emitter) {
    var emitter = this.logoEx;
    emitter.makeParticles('pixel');
    emitter.width = this.logo.width;
    emitter.setAlpha(1, 0, 2000, Phaser.Easing.Linear.In);
    emitter.minParticleScale = 2;
    emitter.maxParticleScale = 8;
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.setYSpeed(-300, 300);
    emitter.setXSpeed(-300, 300);
    emitter.gravity = 1;
    emitter.forEach(function(particle) {
        particle.tint = 0xff6600;
    });
    emitter.start(true, 2000, null, 10 + Math.random() * 5);
    this.game.time.events.add(2000, function() {
        emitter.destroy();
    }, this);
}

module.exports = TitleScene;
