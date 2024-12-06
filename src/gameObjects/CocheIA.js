class CocheIA extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,ruta){
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 150;
        this.ruta = ruta;
        this.currentTargetIndex = 0;
        this.target = this.ruta[this.currentTargetIndex];
        this.isMoving = true;
        this.setScale(0.1);
    }
    
    preUpdate()
    {
        if(this.isMoving && this.target)
        {
            this.scene.physics.moveTo(this, this.target.x, this.target.y, this.speed);
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 5)
            {
                this.currentTargetIndex++;
                if(this.currentTargetIndex >= this.ruta.length)
                {
                    this.isMoving = false;
                }
                else
                {
                    this.target = this.ruta[this.currentTargetIndex];
                }              
            }          
        }
        else
        {
            this.setVelocity(0,0);
        }
    }
} export default CocheIA;
