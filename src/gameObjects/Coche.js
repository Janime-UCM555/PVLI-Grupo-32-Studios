class Coche extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture)
    {
        console.log(scene);
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 150;
        let isAccelerating;
        this.claxonKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        let isvertical;
        let ishorizontal;
    }

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