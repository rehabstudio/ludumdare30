var Phaser = require('phaser');

var assets = {
    images: [
        ['pixel', 'assets/gfx/pix.png', 1, 1],
        ['logo', 'assets/gfx/splash_title.png', 598, 158],
        ['startText', 'assets/gfx/press_start.png', 198, 33],
        ['gameOverText', 'assets/gfx/gameover_txt.png', 430, 78],
        ['lifeIcon', 'assets/gfx/life.png', 14, 15]
    ],
    spritesheets: [
        ['player', 'assets/gfx/player-test.png', 40, 44],
        ['enemy', 'assets/gfx/mob-test.png', 51, 64],
        ['bullet', 'assets/gfx/bullet-test.png', 5, 7],
        ['bgtest', 'assets/gfx/bg_tile.jpg', 256, 256],
        ['cursor', 'assets/gfx/cursor.png', 80, 44],
        ['portal', 'assets/gfx/portal2.png', 115, 107]
    ],
    tilemaps: [

    ],
    fonts: [

    ],
    sounds: [

        ['bigbang', 'assets/sfx/lrg_explosion.wav'],

        ['playerfire', 'assets/sfx/enemy_fire02.wav'],
        ['playerdeath', 'assets/sfx/hero_death02.wav'],

        ['enemyfire', 'assets/sfx/enemy_fire01.wav'],
        ['enemydeath', 'assets/sfx/enemy_death02.wav'],

        ['warp', 'assets/sfx/warp.wav'],
        ['longwarp', 'assets/sfx/lrg_lazer_beam.wav']

    ]
};

for(var i = 0; i < 10; i++) {
    assets.spritesheets.push(['bgstars_' + i, 'assets/gfx/bg_tile_' + i + '.jpg', 256, 256]);
}

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
            assets.fonts[idx][0],
            assets.fonts[idx][1],
            assets.fonts[idx][2]
        );
    }

    //load all fonts
    console.log('Preloading sounds:');
    for (idx =0; idx < assets.sounds.length; idx++){
        console.log("\t" + assets.sounds[idx][0] + ": " +assets.sounds[idx][1]);
        game.load.audio(
            assets.sounds[idx][0],
            assets.sounds[idx][1],
            true
        );
    }

    //add the rest of the preloaders
};

module.exports = {
    assets: assets,
    preload: preloadAssets
};