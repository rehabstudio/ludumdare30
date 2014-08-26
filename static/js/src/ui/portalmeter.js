var Phaser = require('phaser');
var config = require('config');

var PortalMeter = function(scene) {

    this.value = 0;
    this._maxValue = 40;

    var style = Object.create(config.font.baseStyle);
    style.align = 'right';

    this.text = scene.add.text(scene.game.width - 10, 40, this.value.toString(), style);
    this.text.anchor.x = 1;
    this.text.fixedToCamera = true;

    this.update();

};

PortalMeter.prototype.setValue = function(val) {

    this.value = val;
    this.update();
}

PortalMeter.prototype.update = function() {
    if(this.value >= this._maxValue) {
        this.text.setText('WORMHOLE OPEN');
        this.text.color = '#99ff99';
    } else {
        this.text.setText(this.value.toString() + ' / ' + this._maxValue.toString());
        this.text.color = '#ff9999';
    }

};

module.exports = PortalMeter;