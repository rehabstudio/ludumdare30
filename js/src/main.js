var Game = require('./game');

window.WebFontConfig = {
    google: {
        families: [
            'VT323::latin'
        ]
    },
    active: function(){
        new Game();
    }
};

var wf = document.createElement('script');
wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
wf.type = 'text/javascript';
wf.async = 'true';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(wf, s);