class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        //loading music/audio

         //loading game music
         this.load.audio("gameMusic", "./assets/IanFever&Almi-Autumn.mp3");

        //loading sound effects
        this.load.audio("sfx_select", "./assets/menu_select.wav");
        this.load.audio("sfx_startup", "./assets/startup.wav")
        this.load.audio("sfx_explosion1", "./assets/nice_explosion1.wav");
        this.load.audio("sfx_explosion2", "./assets/nice_explosion2.wav");
        this.load.audio("sfx_explosion3", "./assets/nice_explosion3.wav");
        this.load.audio("sfx_explosion4", "./assets/nice_explosion4.wav");
        this.load.audio("sfx_rocket", "./assets/rocket_launch.wav");
        this.load.audio("sfx_rainbow", "./assets/rainbowshipHit.wav");
        this.load.audio("game_over", "./assets/game_over.wav");

        //loading sprite/tiles

        //menu animation
        this.load.image("menu1", "./assets/menu1.png");
        this.load.image("menu2", "./assets/menu2.png");
        this.load.image("menu3", "./assets/menu3.png");
        this.load.image("menu4", "./assets/menu4.png");
        this.load.image("menu5", "./assets/menu5.png");
        
        //title animation
        this.load.image("title1", "./assets/rocketpartoltitle1.png");
        this.load.image("title2", "./assets/rocketpartoltitle2.png");
        this.load.image("title3", "./assets/rocketpartoltitle3.png");
        this.load.image("title4", "./assets/rocketpartoltitle4.png");
        this.load.image("title5", "./assets/rocketpartoltitle5.png");
        this.load.image("title6", "./assets/rocketpartoltitle6.png");

        //overlay pngs
        this.load.image("overlay", "./assets/overlay.png")
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
        //menu start animation
        this.anims.create({
          key: 'menumove',
          frames: [
              { key: 'menu1' },
              { key: 'menu2' },
              { key: 'menu3' },
              { key: 'menu4' },
              { key: 'menu5' },
              { key: 'menu6' },
          ],
          frameRate: 2.5,
        });

      //title animation
      this.anims.create({
        key: 'flame',
        frames: [
            { key: 'title1' },
            { key: 'title2' },
            { key: 'title3' },
            { key: 'title4' },
            { key: 'title5' },
            { key: 'title6' }
        ],
        frameRate: 8,
        repeat: -1
      });

        //menu background
        this.background = this.add.tileSprite(0, 0, 640, 480, "menu1").setOrigin(0,0);
        this.menuopen = this.add.sprite(0, 0, "menu1").setOrigin(0,0);
        this.title = this.add.sprite(0, 0, 640, 480, "title1").setOrigin(0,0);
        this.title.play("flame");

        //show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.explain1 = this.add.text(game.config.width/2, 350, "Use the space bar to launch your rocket and", menuConfig).setOrigin(0.5);
        this.explain2 = this.add.text(game.config.width/2, 370, "the ←→ arrows to move in the air or pre-launch", menuConfig).setOrigin(0.5);
        this.credits = this.add.text(game.config.width/2, game.config.height - 40, "Press (C) for Credits", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#1b145f";
        menuConfig.color = "#FFFFFF";
        this.add.text(game.config.width/2, game.config.height/2, "Get Ready!", menuConfig).setOrigin(0.5);
        this.directions = this.add.text(game.config.width/2, game.config.height/2, "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           //preventing additional selections
           keyRIGHT.enabled = false;
           keyLEFT.enabled = false;
           keyC.enabled = false;
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          //setting up animation
          this.background.destroy();
          this.title.destroy();
          this.explain1.destroy();
          this.explain2.destroy();
          this.credits.destroy();
          this.directions.destroy();
          this.menuopen.anims.play("menumove");
          this.time.delayedCall(1900, () =>{
            this.sound.play('sfx_startup');
          });
          this.time.delayedCall(2500, () =>{
          this.scene.start('playScene');   
          });
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          //preventing additional selections
          keyRIGHT.enabled = false;
          keyLEFT.enabled = false;
          keyC.enabled = false;
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          //setting up animation
          this.background.destroy();
          this.title.destroy();
          this.explain1.destroy();
          this.explain2.destroy();
          this.credits.destroy();
          this.directions.destroy();
          this.menuopen.anims.play("menumove");
          this.time.delayedCall(1900, () =>{
            this.sound.play('sfx_startup');
          });
          this.time.delayedCall(2500, () =>{
          this.scene.start('playScene');
           });
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
          //preventing additional selections
          keyRIGHT.enabled = false;
          keyLEFT.enabled = false;
          keyC.enabled = false;
          this.sound.play('sfx_select');
          this.scene.start('creditScene');    
        }
    }
    

}