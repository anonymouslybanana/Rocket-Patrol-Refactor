// Anna Schultz
// Rocket Patrol Refactor
// ~30 hours spent
//
// The mods I chose are as follows:
//     - Track High Score (5)
//     - Add Your Own Background Music (5)
//     - Implement Speed Increase (I actually implemented 3 increases) (5)
//     - Create a New Scrolling Tile Background (5)
//     - Allow the Player to Control the Rocket After It is Fired (5)
//     - Create 4 New Explosion Sound Effects and Randomize Them (10)
//     - Display the Time Remaining (in Seconds) On the Screen (10)
//     - Using a Texture Atlas, Create a New Animated Sprite for Spaceship (I created two new animated sprites) (10)
//     - Create a New Title Screen (10)
//     - Implement Parallax Scrolling for the Background (10)
//     - Create a New Enemy Space Ship (15)
//     - Implement a New Timing/Scoring Mechanism that Adds Time (The new enemy spaceship adds 5 seconds to the game clock) (15)
//     Total: 105 points
//

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
