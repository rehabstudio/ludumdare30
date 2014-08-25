var Phaser = require('phaser');

var Lives = function(scene) {

    this.value = 0;

    this.scene = scene;
    this.icons = this.scene.game.add.group();

    this.x = 10;
    this.y = this.scene.game.height - 20;

};

Lives.prototype.updateFromPlayer = function(player) {
    this.value = player.lives;
    this.update();
}

Lives.prototype.update = function() {
    this.icons.destroy();
    this.icons = this.scene.game.add.group();
    for(var i = 0; i < this.value; i++) {
        var sp = this.scene.game.add.sprite(this.x + (20 * i), this.y, 'lifeIcon');
        sp.anchor.setTo(0,1);
        sp.fixedToCamera = true;
        this.icons.add(sp);
    }
};

module.exports = Lives;