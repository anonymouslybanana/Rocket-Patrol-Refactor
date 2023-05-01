//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        //add object to exisiting scene
        scene.add.existing(this); //add to existing. displayList, updateList
        this.isFiring = false;    //track rocket's firing status
        this.moveSpeed = 2;       //pixels per frame
        this.sfxRocket = scene.sound.add("sfx_rocket");
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            //resetting angle when after flight
            if (this.angle < 0) this.angle += 1;
            else if (this.angle > 0) this.angle -= 1;
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        } else {
            //this else case for rocket flight code was designed by Alex Groff (amgroff@ucsc.edu) and in no way is my own
            //I am using this code will his full permission to do so
                if(keyLEFT.isDown && this.x >= borderUISize + this.width) { //if left key is down then tilt the rocket left and increase the x by it's angle
                    if (this.angle >= -30) this.angle--;
                    this.x += this.moveSpeed * this.rotation * 3;
                    
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) { // if right key is down then tilt the rocket right and increase the x by it's angle
                    if (this.angle <= 30) this.angle++;
                    this.x += this.moveSpeed * this.rotation * 3;
                    
                } else if (!keyLEFT.isDown && !keyRIGHT.isDown) { // if no key is pressed, turn rocket back to 0 degree angle
                    if (this.angle < 0) this.angle += 1;
                    else if (this.angle > 0) this.angle -= 1;
                }
                // bound movement past right wall
                if (this.x > game.config.width - borderUISize - this.width) this.x = game.config.width - borderUISize - this.width;
    
                // bound movement past left wall
                if (this.x < borderUISize + this.width) this.x = borderUISize + this.width;
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }
        //if fired, move up
        if(this.isFiring && this.y <= gameHeight) {
            this.y -= this.moveSpeed;
        }
        //reset on miss
        if(this.y <= 0) {
           this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
