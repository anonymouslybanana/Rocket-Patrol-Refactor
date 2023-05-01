let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    pixelArt: true,
    scene: [ Menu, Play, Credits ]
}

let game = new Phaser.Game(config)

//setting game height and width
let gameWidth = game.config.width;
let gameHeight = game.config.height;

//setting UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let highScore = 0;
let playedOnce = false;

//reserve keyboard vars
let keySPACE, keyR, keyM, keyC, keyLEFT, keyRIGHT;
