export default class Carta extends Phaser.GameObjects.Container
{
    constructor(scene, x,y, datos, callback, sound){
        console.log(sound);
        super(scene,x,y);
        this.scene = scene;
        this.datos = datos;
        this.callback = callback;

        this.setSize(200, 280); 

        this.background = scene.add.rectangle(0, 0, 200, 280, 0x333333);
        this.background.setOrigin(0.5);
        this.add(this.background);
        this.sound = sound;


        this.name = scene.add.text(0, -110, this.datos.Name, { 
            fontSize: '22px',
             fill: '#FFF', 
             align: 'center',
             wordWrap: { width: 180, useAdvancedWrap: true}
             });
        this.name.setOrigin(0.5);
        this.add(this.name);


        this.desc = scene.add.text(0, 78, this.datos.Description, { 
            fontSize: '12px', 
            fill: '#FFF',
            align: 'center',
            wordWrap: { width: 180, useAdvancedWrap: true}
        });
        this.desc.setOrigin(0.5);
        this.add(this.desc);
        this.image = scene.add.image(0, -30, this.datos.Image);
        this.image.setOrigin(0.5);
        this.image.setScale(0.2);
        this.add(this.image);

        this.background.setInteractive({useHandCursor: true}); 

        this.background.on('pointerdown', this.changeKarma, this);
        this.background.on('pointerover', () => {
            this.background.setFillStyle(0xFFE66D);
        });
        this.background.on('pointerout', () => {
            this.background.setFillStyle(0x333333);
        });
    }
    changeKarma(){
        console.log(this.sound);
        this.sound.play();
        this.scene.add.image(this.scene.sys.game.canvas.width/2, this.scene.sys.game.canvas.height/2 - 80,this.datos.Background);
        let auxCard = this.scene.sys.game.registry.get('myCards');
        if(!Array.isArray(auxCard)){
            auxCard = [];
        }
        let copyCard = new Carta(this.scene,this.x,this.y,this.datos,this.callback);
        auxCard.push(copyCard);
        this.scene.sys.game.registry.set('myCards',auxCard);

        var karmaQuantity = this.scene.sys.game.registry.get('karma') + parseInt(this.datos.Karma);
        if(karmaQuantity < 0) karmaQuantity = 0;
        else if(karmaQuantity > 200) karmaQuantity = 200;
        this.scene.sys.game.registry.set('karma', karmaQuantity);
        console.log(this.scene.sys.game.registry.get('karma', karmaQuantity));
        if (this.callback) this.callback(this.datos.id);
    }
    deleteCard(){
        this.datos = null;
        this.destroy();
    }
    getDatos(){return this.datos;}
}
