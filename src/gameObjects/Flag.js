class Flag extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,texture,nextScene)
    {
        super(scene,x,y,texture);
        scene.add.existing(this);
        this.setOrigin(0.5,1);
        this.mainscene = scene;
        this.nextScene = nextScene;
        console.log(nextScene);
    }

    activate()
    {
        this.mainscene.scene.start(this.nextScene);
    }
}
export default Flag;