export default class Carta extends Phaser.GameObjects.Sprite
{
    constructor(scene,data, x,y){
        super(scene,x,y, 'carta');
        this.scene = scene;
        this.data = data;
        this.scene.add.existing(this);
        this.setInteractive({useHandCursor: true});
        this.on("pointerdown",this.changeKarma);
        this.on("pointover",()=>{this.background.setFillStyle(0x8888ff);});       
    }
    create(){
        const fondo = this.add.rectangle(0, 0, 200, 200, 0xd1c7cd).setOrigin(0);
    }
    changeKarma(){
        var karmaQuintity = this.registry.get('karma') + this.data.Karma;
        this.registry.set('karma',karmaQuintity);
    }
    // set interactive
    // on("pointerdown", on option selected (en constructor))
    static createFromData(jsonobject, scene, x, y){
        this.carta = new Carta(scene,jsonobject,x,y) 
        //Valores de la carta 
        this.name = this.data.Name;
        this.image = this.load.image('img',this.data.Image);
        this.descrption = this.data.Description;
        this.karma = this.data.Karma;     
    }
}
