class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
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
        this.add.text(game.config.width/2, 40, "ROCKET PATROL REFACTOR", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize/2 - borderPadding/2, "", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "", menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, 40, "ROCKET PATROL REFACTOR", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize/2 - borderPadding/2, "Created by Anna Schultz", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize/2 - borderPadding/2 + 40, "Music \"Autumn\" by Ian Fever & Almi,", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize/2 - borderPadding/2 + 70, "under license Attribution 3.0", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize/2 - borderPadding/2 + 100, "Unported (CC BY 3.0)", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - 40, "Press (R) to return to the Menu", menuConfig).setOrigin(0.5);

        //define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
          this.sound.play('sfx_select');
          this.scene.start('menuScene');    
        }
    }
       
        
}