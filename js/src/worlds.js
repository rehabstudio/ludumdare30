var Phaser = require('phaser');
var _ = require('lodash');

var WorldManager = function(game) {


    this._worlds = {};
    this.game = game;

};

WorldManager.prototype.storeData = function(scene) {

    this.data = {
        score: scene.score.value,
        lives: scene.player.lives
    };
    console.log('WorldManager: data stored', this.data);
};

WorldManager.prototype.recoverData = function(scene) {

    if(!this.data) return false;

    console.log('WorldManager: data recovered', this.data);

    scene.score.value = this.data.score;
    scene.player.lives = this.data.lives;

};

WorldManager.prototype.clearData = function() {
    this.data = undefined;
};

WorldManager.prototype.generateNewWorld = function() {

    var worldName = genName(3);

    var r = this.game.rnd;

    var worldOptions = {
        name: worldName,
        mainColor: getRndTint(),
        starbg: {
            backdrop: r.integerInRange(0,9),
            parallax: 0.1
        },
        starfield: {
            numParticles: 400,
            type: 'star',
            scale: [0.1, 0.5],
            speed: [-100, 100],
            rotation: [0,0],
            gravity: 0
        }
    };

    this._worlds[worldName] = worldOptions;

    return worldOptions;

};

WorldManager.prototype.getWorldData = function(worldName) {
    return this._worlds[worldName];
};

var bits = ['gen','ry','ia','aia','nov','is','an','on','ia','sis','ph','py','ae','tr','qi','os','ni','th','ie','na','zi'];

function genName(numBits) {
  var str = '';
  for(var i = 0 ; i < numBits; i++) {
    str += _.sample(bits);
  }
  return str;
}

function _c() {
    return Math.floor(Math.random()*256).toString(16)
}

function getRndHex() {
  return "#"+_c()+_c()+_c();
}

function getRndTint() {
  return Phaser.Color.hexToRGB(getRndHex());
}

module.exports = WorldManager;