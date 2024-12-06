export default class Melchor extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'melchor', 2)
        this.scaleX = 0.7;
        this.scaleY = 0.7;
        this.scene.add.existing(this);
    }
    preUpdate(t,dt){
        if(this.visible){
            let karma = this.scene.sys.game.registry.get('karma');
            if(karma > 85) this.setFrame(4);
            else if(karma > 65) this.setFrame(3);
            else if(karma > 35) this.setFrame(2);
            else if(karma > 15) this.setFrame(1);
            else this.setFrame(0);

        }
    }
}