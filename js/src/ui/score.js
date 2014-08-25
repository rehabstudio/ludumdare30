var Phaser = require('phaser');

var Score = function(scene) {

    this.value = 0;

    var style = {
        font: "24px VT323",
        fill: "#caa",
        stroke: "#000",
        strokeThickness: 1,
        align: "center"
    };
    this.text = scene.add.text(10, 10, this.value.toString(), style);
    this.text.fixedToCamera = true;

};

Score.prototype.addAmount = function(amt) {

    this.value += amt;
    this.update();
}

Score.prototype.update = function() {
    this.text.setText(this.value.toString());

};

module.exports = Score;