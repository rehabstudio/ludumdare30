var Phaser = require('phaser');
var config = require('config');

var WorldName = function(scene) {

    this.value = 'Unknown';

    var style = Object.create(config.font.baseStyle);
    style.align = 'right';

    this.text = scene.add.text(scene.game.width - 10, 10, this.value.toUpperCase(), style);
    this.text.anchor.x = 1;
    this.text.fixedToCamera = true;

};

WorldName.prototype.setValue = function(val) {

    this.value = val;
    this.update();
}

WorldName.prototype.update = function() {
    this.text.setText(this.value.toUpperCase());

};

module.exports = WorldName;