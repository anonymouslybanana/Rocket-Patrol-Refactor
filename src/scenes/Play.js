class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload(){
        //load images/tile sprites

        //rocket pngs
        this.load.image("rocket", "./assets/rocket.png");

        //spaceship pngs
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

        //overlay pngs
        this.load.image("overlay", "./assets/overlay.png")

        //load spritesheet
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        //display aspects

        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0,0);
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
         keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
         keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
         keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
         keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

         //spaceship aspects

          //spaceship animation
          this.anims.create({
            key: 'zoom',
            frames: [
                { key: 'spaceship1' },
                { key: 'spaceship2' },
                { key: 'spaceship3' },
                { key: 'spaceship4' }
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
                
            ],
            frameRate: 8,
            repeat: -1
        });

        //special spaceship animation

         //add spaceships (x3)
         this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, "spaceship", 0, 30).setOrigin(0,0).play("zoom");
         this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, "spaceship", 0, 20).setOrigin(0,0).play("zoom");
         this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, "spaceship", 0, 10).setOrigin(0,0).play("zoom");
         this.ship04 = new SpecialSpaceship(this, game.config.width, borderUISize*2 + borderPadding*3, "specialSpaceship", 0, 50).setOrigin(0,0).play("rainbow zoom");
         
         //scaling spaceships

         //animation configuration

         this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30
         });

         //adding spaceship movement animation from files, solution found at:
         //https://stackoverflow.com/questions/53034421/using-multiple-animations-for-phaser-3-matter-body

        /*this.anims.create({
            key: "spaceshipMove",    
            frames: [
                {key: "spaceship", frame: "spaceship1.png"},
                {key: "spaceship", frame: "spaceship2.png"},
                {key: "spaceship", frame: "spaceship3.png"},
                {key: "spaceship", frame: "spaceship4.png"},
            ],
            frameRate: 4,
            repeat: -1
            });*/

        //this.ship01.anims.load("spaceshipMove");
        //this.ship01.anims.play("spaceshipMove");

         //score aspects

         //initalize score
         this.p1Score = 0;
         //display score
         let scoreConfig = {
            fontFamily : "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
         }  
         this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        //display highscore
         this.newHighScore = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 8, highScore, scoreConfig); 
         
         //gameplay aspects

         //GAME OVER flag
         this.gameOver = false;
         //60-second play clock
         scoreConfig.fixedWidth = 0;
         this.clock = this.time.delayedCall(10000, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
         }, null, this);
    }

    update(){
        //object updates
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            playedOnce = true;
            if(this.gameOver && this.p1Score >= highScore){
                highScore = this.p1Score;
                console.log("Highscore: ", highScore);
                this.newHighScore.text = highScore; 
            }
            this.scene.restart();
        }
       
        if(!this.gameOver){
        this.starfield.tilePositionX -= 0.5;
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
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
        this.scoreLeft.text = this.p1Score; 
        //play sound
        this.sound.play("sfx_explosion");      
      }
    

}