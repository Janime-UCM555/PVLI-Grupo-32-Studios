class Rampa extends Phaser.Physics.Arcade.Sprite
{   
    constructor(scene,x,y,texture)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);   
        this.scene = scene;    
    }
    accelerate(car)
    {
        const originalspeed = car.speed;
        car.speed += 25;

        setTimeout(() =>  {
            car.speed  = 150;
        },1000);
    }
}
export default Rampa;