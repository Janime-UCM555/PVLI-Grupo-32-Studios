export default class Carta extends Phaser.GameObjects.Container
{
    constructor(scene, x,y, data, callback){
        super(scene,x,y);
        this.scene = scene;
        this.data = data;
        this.callback = callback;

        this.setSize(200, 280); 

        this.background = scene.add.rectangle(0, 0, 200, 280, 0x333333);
        this.background.setOrigin(0.5);
        this.add(this.background);



        this.name = scene.add.text(0, -110, this.data.Name, { 
            fontSize: '22px',
             fill: '#FFF', 
             align: 'center',
             wordWrap: { width: 180, useAdvancedWrap: true}
             });
        this.name.setOrigin(0.5);
        this.add(this.name);


        this.desc = scene.add.text(0, 78, this.data.Description, { 
            fontSize: '12px', 
            fill: '#FFF',
            align: 'center',
            wordWrap: { width: 180, useAdvancedWrap: true}
        });
        this.desc.setOrigin(0.5);
        this.add(this.desc);

        this.image = scene.add.image(0, -10, this.data.Image);
        this.image.setOrigin(0.5);
        this.image.setScale(0.4);
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
        let auxCard = this.scene.sys.game.registry.get('myCards');
        if(!Array.isArray(auxCard)){
            auxCard = [];
        }
        let copyCard = new Carta(this.scene,this.x,this.y,this.data,this.callback);
        auxCard.push(copyCard);
        this.scene.sys.game.registry.set('myCards',auxCard);

        var karmaQuantity = this.scene.sys.game.registry.get('karma') + parseInt(this.data.Karma);
        if(karmaQuantity < 0) karmaQuantity = 0;
        else if(karmaQuantity > 100) karmaQuantity = 100;
        this.scene.sys.game.registry.set('karma', karmaQuantity);
        console.log(this.scene.sys.game.registry.get('karma', karmaQuantity));
        if (this.callback) this.callback(this.data.id);
    }
    deleteCard(){
        this.data = null;
        this.destroy();
    }
}
