class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio("sfx_select", "./assets/assets_blip_select12.wav");
        this.load.audio("sfx_explosion", "./assets/assets_explosion38.wav");
        this.load.audio("sfx_rocket", "./assets/assets_rocket_shot.wav");
    }

    create(){
        //menu text configuration
        let menuConfig = {
            fontFamily: "Pixeboy",
            fontSize: "32px",
            //backgroundColor: "#FFFFFF",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize/2 - borderPadding/2, "Use the space bar to launch your rocket and", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "the ←→ arrows to move in the air or pre-launch", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}