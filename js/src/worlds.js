var Phaser = require('phaser');

var WorldManager = function() {


    this._worlds = {};

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

    var worldOptions = {
        name: worldName,
        mainColor: 0x33ff66,
        starbg: {
            backdrop: 3,
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

var genName = function(numBits) {
  var str = '';
  for(var i = 0 ; i < numBits; i++) {
    str += _.sample(bits);
  }
  return str;
}


module.exports = WorldManager;