class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload(){
        
        //load images/tile sprites

        //rocket pngs
        this.load.image("rocket", "./assets/rocket.png");

        //spaceship pngs
        this.load.atlas("spaceship", "./assets/spaceship_animation.png", "./assets/spaceship_animation.json")
        this.load.image("spaceship1", "./assets/spaceship1.png");
        this.load.image("spaceship2", "./assets/spaceship2.png");
        this.load.image("spaceship3", "./assets/spaceship3.png");
        this.load.image("spaceship4", "./assets/spaceship4.png");

        //special spaceship pngs
        this.load.image("specialSpaceship1", "./assets/specialspaceship1.png");
        this.load.image("specialSpaceship2", "./assets/specialspaceship2.png");
        this.load.image("specialSpaceship3", "./assets/specialspaceship3.png");
        this.load.image("specialSpaceship4", "./assets/specialspaceship4.png");
        this.load.image("specialSpaceship5", "./assets/specialspaceship5.png");
        this.load.image("specialSpaceship6", "./assets/specialspaceship6.png");
        this.load.image("specialSpaceship7", "./assets/specialspaceship7.png");
        this.load.image("specialSpaceship8", "./assets/specialspaceship8.png");
        this.load.image("specialSpaceship9", "./assets/specialspaceship9.png");
        this.load.image("specialSpaceship10", "./assets/specialspaceship10.png");
        this.load.image("specialSpaceship11", "./assets/specialspaceship11.png");
        this.load.image("specialSpaceship12", "./assets/specialspaceship12.png");

        //starfield pngs
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("starfieldparallax1", "./assets/starfieldparallax1.png")

        //overlay pngs
        this.load.image("overlay", "./assets/overlay.png")

        //load spritesheet
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        //display aspects

        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0,0);
        this.starfieldparallax1 = this.add.tileSprite(0, 0, 640, 480, "starfieldparallax1").setOrigin(0,0);
        //place overlay temp
        this.overlay = this.add.tileSprite(0, 0, 640, 480, "overlay").setOrigin(0,0);
        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        /*this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);*/

        //rocket aspects

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        //define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //diasbling space to allow for delay
        keySPACE.enabled = false;

         //spaceship aspects

          //spaceship animation
          this.framenames = this.textures.get("spaceship").getFrameNames();

          this.anims.create({
            key: 'zoom',
            frames: [
                { key: 'spaceship', frame: "spaceship1.png" },
                { key: 'spaceship', frame: "spaceship2.png" },
                { key: 'spaceship', frame: "spaceship3.png" },
                { key: 'spaceship', frame: "spaceship4.png" }
            ],
            frameRate: 8,
            repeat: -1
        });

         //special spaceship animation
         this.anims.create({
            key: 'rainbow zoom',
            frames: [
                { key: 'specialSpaceship1' },
                { key: 'specialSpaceship2' },
                { key: 'specialSpaceship3' },
                { key: 'specialSpaceship4' },
                { key: 'specialSpaceship5' },
                { key: 'specialSpaceship6' },
                { key: 'specialSpaceship7' },
                { key: 'specialSpaceship8' },
                { key: 'specialSpaceship9' },
                { key: 'specialSpaceship10' },
                { key: 'specialSpaceship11' },
                { key: 'specialSpaceship12' },
                
            ],
            frameRate: 8,
            repeat: -1
        });

         //add spaceships
         this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, "spaceship", 0, 30).setOrigin(0,0).play("zoom");
         this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, "spaceship", 0, 20).setOrigin(0,0).play("zoom");
         this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, "spaceship", 0, 10).setOrigin(0,0).play("zoom");
         this.ship04 = new SpecialSpaceship(this, game.config.width, borderUISize*2 + borderPadding*3, "specialSpaceship", 0, 50).setOrigin(0,0).play("rainbow zoom");
         

         //animation configuration

         this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
         });

         //score aspects

         //initalize score
         this.p1Score = 0;

         //display score
         let scoreConfig = {
            fontFamily : "Pixeboy",
            fontSize: "32px",
            //backgroundColor: "#1b145f",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            //fixedWidth: 100
         } 
         let highscoreConfig = {
            fontFamily : "Pixeboy",
            fontSize: "32px",
            //backgroundColor: "#F3B141",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            //fixedWidth: 100
         }  
        
         //60-second play clock display
        let timerConfig = {
            fontFamily : "Pixeboy",
            fontSize: "50px",
            //backgroundColor: "#F3B141",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            //fixedWidth: 100
         } 
          //controls information
          let controlConfig = {
            fontFamily : "Pixeboy",
            fontSize: "22px",
            //backgroundColor: "#1b145f",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
          }

          //end information
          let endConfig = {
            fontFamily : "Pixeboy",
            fontSize: "32px",
            backgroundColor: "#1b145f",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            //fixedWidth: 100
         } 

         //display score
         this.scoreLeft = this.add.text(100, 0, "Score: " + this.p1Score, scoreConfig);
         scoreConfig.fixedWidth = 0;

        //display highscore
         this.newHighScore = this.add.text(400, 0, "High: " + highScore, highscoreConfig); 
         highscoreConfig.fixedWidth = 0;
         this.countdownTimer = this.add.text(game.config.width/2 - 25, 35, this.clock, timerConfig);

         //display controls
         this.spacedir = this.add.text(100, 450, "SPACE to launch", controlConfig);
         this.spacedir.fixedWidth = 0;
         this.arrowdir = this.add.text(400, 450, "← or → to move", controlConfig); 
         this.arrowdir.fixedWidth = 0;

         //make controls disappear after 15 seconds
         this.time.delayedCall(15000, () =>{
            this.spacedir.alpha = 0
            this.arrowdir.alpha = 0
         });

         //sound aspects

         this.gameMusic = this.sound.add("gameMusic");

         var musicConfig = {
            mute: false,
            volume: 0.1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
         }
         this.gameMusic.play(musicConfig);

         //gameplay aspects

         //GAME OVER flag
         this.gameOver = false;
       
         this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 40, "GAME OVER", endConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 24, "Press (R) to Restart or (M) for Menu", endConfig).setOrigin(0.5);
            this.gameOver = true;
            this.sound.play("game_over");
         }, null, this);

        //implementing start delay
        this.clock.paused = true;
        this.ship01.setspeed = this.ship01.moveSpeed;
        this.ship02.setspeed = this.ship02.moveSpeed;
        this.ship03.setspeed = this.ship03.moveSpeed;
        this.ship04.setspeed = this.ship04.moveSpeed;
        this.ship01.moveSpeed = 0;
        this.ship02.moveSpeed = 0;
        this.ship03.moveSpeed = 0;
        this.ship04.moveSpeed = 0;
        //enabling keys slightly before timer start
        this.time.delayedCall(1000, () =>{
            keySPACE.enabled = true;
        })
        this.time.delayedCall(1500, () =>{
            this.clock.paused = false;
            this.ship01.moveSpeed = 1.5;
            this.ship02.moveSpeed = 1.5;
            this.ship03.moveSpeed = 1.5;
            this.ship04.moveSpeed = 1.5;
        });

        //speed increases
        this.time.delayedCall(4000, () =>{
            this.ship01.moveSpeed = this.ship01.setspeed;
            this.ship02.moveSpeed = this.ship02.setspeed;
            this.ship03.moveSpeed = this.ship03.setspeed;
            this.ship04.moveSpeed = this.ship04.setspeed;
        });
        this.speedIncrease1 = this.time.delayedCall(10000, () =>{
            this.ship01.moveSpeed += 0.5;
            this.ship02.moveSpeed += 0.5;
            this.ship03.moveSpeed += 0.5;
            this.ship04.moveSpeed += 1;
        }, null, this);
        this.speedIncrease2 = this.time.delayedCall(20000, () =>{
            this.ship01.moveSpeed += 1;
            this.ship02.moveSpeed += 1;
            this.ship03.moveSpeed += 1;
            this.ship04.moveSpeed += 1.5;
        }, null, this);
    }

    update(){

        //object updates

        //highscore updates
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            playedOnce = true;
            if(this.gameOver && this.p1Score >= highScore){
                highScore = this.p1Score;
                console.log("Highscore: ", highScore);
                this.newHighScore.text = "Highscore: " + highScore; 
            }
            this.gameMusic.stop()
            this.scene.restart();
        }

        //timer updates
        this.countdownTimer.text = Math.floor((this.clock.getRemaining()/1000));
       
        if(!this.gameOver){
        this.starfield.tilePositionX -= 0.5;
        this.starfieldparallax1.tilePositionX -= 0.75;
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();
        }

        //check collisions

        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset();
            this.clock.elapsed -= 5000;
            console.log("Time Updated");
            this.shipExplode(this.ship04);
            //play sound
            this.sound.play("sfx_rainbow"); 
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            //play sound
            this.sound.play("sfx_explosion" + Phaser.Math.Between(1,4)); 
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            //play sound
            this.sound.play("sfx_explosion" + Phaser.Math.Between(1,4)); 
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            //play sound
            this.sound.play("sfx_explosion" + Phaser.Math.Between(1,4)); 
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)){
            this.gameMusic.stop()
            this.scene.start("menuScene");
        }
    }

    checkCollision(rocket,ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width * 2 && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height * 2 && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = "Score: " + this.p1Score; 
             
      }
    

}