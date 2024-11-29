export default class Cat extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'gato')
        this.scaleX = 0.7;
        this.scaleY = 0.7;
        this.scene.add.existing(this);
    }
}