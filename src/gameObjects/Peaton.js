class Peaton extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture, karma, name, edad)
    {
        super(scene,x,y,texture);
        this.speed = 100;
        this.karma = karma;
        this.name = name;
        this.edad = edad;
    }
    fubction 

    update() {
      
        if(this.claxonKey.isDown)
        {
            this.claxon();
        }
        this.setVelocity(0);     
        if (this.left.isDown) {
            this.setVelocityX(-this.speed);
            this.setAngle(-90); 
            this.setSize(300,200);
        } else if (this.right.isDown) {
            this.setVelocityX(this.speed);
            this.setAngle(90); 
            this.setSize(300,200);
        } else if (this.up.isDown) {
            this.setVelocityY(-this.speed);
            this.setAngle(0);
            this.setSize(200,300);
        } else if (this.down.isDown) {
            this.setVelocityY(this.speed);
            this.setAngle(180); 
            this.setSize(200,300);
        }
    }

    claxon()
    {
        this.scene.claxonSound.play();
    } 
}
export default Coche;