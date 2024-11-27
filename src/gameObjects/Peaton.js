class Peaton extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture, karma, name, edad,speed)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.1);
        this.speed = speed;
        this.karma = karma;
        this.name = name;
        this.edad = edad;
        this.foto = texture;
    }
}
export default Peaton;