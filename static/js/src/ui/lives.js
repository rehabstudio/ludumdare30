var Phaser = require('phaser');

var Lives = function(scene) {

    this.value = 0;

    var style = {
        font: "24px VT323",
        fill: "#03f",
        stroke: "#000",
        strokeThickness: 1,
        align: "left"
    };
    this.text = scene.add.text(10, 30, this.value.toString(), style);
    this.text.fixedToCamera = true;

};

Lives.prototype.updateFromPlayer = function(player) {
    this.value = player.lives;
    this.update();
}

Lives.prototype.update = function() {
    this.text.setText(this.value.toString());

};

module.exports = Lives;