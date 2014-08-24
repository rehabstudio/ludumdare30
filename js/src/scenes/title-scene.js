var Phaser = require('phaser');
var STRINGS = require('strings');
var Scene = require('./base');

var UI = {
};

var TitleScene = function(){
    Scene.prototype.constructor.call(this);
};

TitleScene.prototype = Object.create(Scene.prototype);
TitleScene.prototype.constructor = TitleScene;


TitleScene.prototype.create = function(){
    _displayStartText.call(this);
};

TitleScene.prototype.init = function(config){
};

TitleScene.prototype.update = function(){
    _waitForStart.call(this);
}

TitleScene.prototype.destroy = function(){
    Scene.prototype.onDestroy.call(this);
};

TitleScene.prototype.render = function(){

};

function _displayStartText() {
    var style = {
        font: "24px VT323",
        fill: "#caa",
        stroke: "#000",
        strokeThickness: 1,
        align: "center"
    };
    var text = this.add.text(400, this.game.height*0.5 + 100, STRINGS.startPrompt, style);
    text.anchor.setTo(0.5);
};

function _waitForStart() {
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.game.startGame();
    }
};

module.exports = TitleScene;
