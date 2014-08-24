var Phaser = require('phaser');

var Player = function(scene){

    Phaser.Sprite.call(this, scene.game, 0, 0, 'player', 0);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    //this.body.setSize(this.width*0.4, this.height*0.35, 0, this.height*0.2);
    this.scale.x = this.scale.y = this.baseScale = 0.6;
    this.anchor.setTo(0.5, 0.5);

    this.maxSpeed = 5;
    this.acceleration  = 20;
    this.damping = 1.05;

    this.cursors = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
    this.actionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.scene = scene;

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(){
    this.handleInput();
    this.updateSpeed();
    this.lookAtPointer();
};

Player.prototype.onRender = function(){

};

Player.prototype.handleInput = function() {
    if(this.cursors.down.isDown){
        this.body.velocity.y += this.acceleration;
    }
    if(this.cursors.up.isDown){
        this.body.velocity.y -= this.acceleration;
    }
    if(this.cursors.right.isDown){
        this.body.velocity.x += this.acceleration;
    }
    if(this.cursors.left.isDown){
        this.body.velocity.x -= this.acceleration;
    }
};

Player.prototype.updateSpeed = function(){
    this.body.velocity.x /= this.damping;
    this.body.velocity.y /= this.damping;

    if (Math.abs(this.body.velocity.x) < 0.01){
        this.body.velocity.x = 0;
    }

    if (Math.abs(this.body.velocity.y) < 0.01){
        this.body.velocity.y = 0;
    }
};

Player.prototype.lookAtPointer = function() {
    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.game.input.activePointer.x, this.game.input.activePointer.y
    );
    this.rotation = targetAngle + 1.57079633; // 90 degrees
};


module.exports = Player;
