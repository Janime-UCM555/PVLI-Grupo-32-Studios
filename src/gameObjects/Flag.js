class Flag extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture,nextScene,flag)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setOrigin(0.5,1);
        this.mainscene = scene;
        this.nextScene = nextScene;
        this.flag = flag;
        console.log(nextScene);
    }

    activate()
    {
        this.mainscene.scene.start(this.nextScene, this.flag);
    }
}
export default Flag;