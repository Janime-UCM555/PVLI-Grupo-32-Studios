export default class Melchor extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'melchor', 2)
        this.scaleX = 0.7;
        this.scaleY = 0.7;
        this.scene.add.existing(this);
    }
}