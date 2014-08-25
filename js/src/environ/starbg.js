var Phaser = require('phaser');

var StarBG = function(scene){

    Phaser.TileSprite.call(this, scene, 0, 0, scene.game.width, scene.game.height, 'bgtest', 0);
    this.fixedToCamera = true;
    this.alpha = 1;

    this.parallax = 0.1;

    //this.tint = 0xff99cc;

    this.scene = scene;

    //console.log(this);

};

StarBG.prototype = Object.create(Phaser.TileSprite.prototype);
StarBG.prototype.constructor = StarBG;

StarBG.prototype.update = function() {
    this.tilePosition.x = -(this.scene.camera.x * this.parallax);
    this.tilePosition.y = -(this.scene.camera.y * this.parallax);
};

module.exports = StarBG;