var Phaser = require('phaser');

var assets = {
    images: [
        ['pixel', 'assets/gfx/pix.png', 1, 1],
        ['logo', 'assets/gfx/splash_title.png', 598, 158]
    ],
    spritesheets: [
        ['player', 'assets/gfx/player-test.png', 60, 66],
        ['enemy', 'assets/gfx/mob-test.png', 83, 104],
        ['bullet', 'assets/gfx/bullet-test.png', 5, 7],
        ['bgtest', 'assets/gfx/bg_tile.jpg', 256, 256]
    ],
    tilemaps: [

    ],
    fonts: [

    ]
};

function preloadAssets(game){
    var idx;

    //load all images
    console.log('Preloading images:');
    for (idx = 0; idx < assets.images.length; idx++){
        console.log("\t" + assets.images[idx][0] + ": " +assets.images[idx][1]);
        game.load.image(
            assets.images[idx][0],
            assets.images[idx][1],
            assets.images[idx][2],
            assets.images[idx][3]
        );
    }

    //load all spritesheets
    console.log('Preloading spritesheets:');
    for (idx = 0; idx < assets.spritesheets.length; idx++){
        console.log("\t" + assets.spritesheets[idx][0] + ": " +assets.spritesheets[idx][1]);
        game.load.spritesheet(
            assets.spritesheets[idx][0],
            assets.spritesheets[idx][1],
            assets.spritesheets[idx][2],
            assets.spritesheets[idx][3]
        );
    }

    //load all tilemaps
    console.log('Preloading tilemaps:');
    for (idx = 0; idx < assets.tilemaps.length; idx++){
        console.log("\t" + assets.tilemaps[idx][0] + ": " +assets.tilemaps[idx][1]);
        game.load.tilemap(
            assets.tilemaps[idx][0],
            assets.tilemaps[idx][1],
            assets.tilemaps[idx][2],
            assets.tilemaps[idx][3]
        );
    }

    //load all fonts
    console.log('Preloading bitmap fonts:');
    for (idx =0; idx < assets.fonts.length; idx++){
        console.log("\t" + assets.fonts[idx][0] + ": " +assets.fonts[idx][1]);
        game.load.bitmapFont(
            assets.fonts[0],
            assets.fonts[1],
            assets.fonts[2]
        );
    }

    //add the rest of the preloaders
};

module.exports = {
    assets: assets,
    preload: preloadAssets
};