class Slider extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,width,initialValue,onChange)
    {
        super(scene,x,y);
        scene.add.existing(this);
        this.width = width;
        
    }
}