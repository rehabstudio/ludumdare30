var Phaser = require('phaser');

var Player = function(scene){

    Phaser.Sprite.call(this, scene.game, 0, 0, 'player', 0);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    //this.body.setSize(this.width*0.4, this.height*0.35, 0, this.height*0.2);
    //
    this.body.collideWorldBounds = true;

    this.scale.x = this.scale.y = this.baseScale = 0.6;
    this.anchor.setTo(0.5, 0.5);

    this.maxSpeed = 5;
    this.acceleration  = 20;
    this.damping = 1.05;

    this.bulletSpeed = 2000;
    this.bulletLifespan = 1000;

    this.fireRate = 200;
    this._lastFireTime = this.game.time.now;

    _setupPlayerBullets.call(this);

    this.cursors = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
    this.actionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.fireButton = this.game.input.activePointer;

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
    if(this.fireButton.isDown) {
        this.fire();
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
    this.rotation = this.game.physics.arcade.angleToPointer(this) + 1.57079633; // +90 degrees;
};

Player.prototype.fire = function() {

    if (this.game.time.now > this._lastFireTime)
    {
        console.log('fire');
        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(this.x, this.y);
            bullet.rotation = this.rotation;
            this.game.physics.arcade.velocityFromRotation(bullet.rotation - 1.57079633, this.bulletSpeed, bullet.body.velocity);
            this._lastFireTime = this.game.time.now + this.fireRate;
        }
    }
};

function _setupPlayerBullets() {
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(20, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('lifespan', this.bulletLifespan);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
}


module.exports = Player;
