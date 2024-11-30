/*Escena de Phaser*/
import Decoder from '../Decode.js';
import Melchor from '../sprites/melchor.js'
import Cat from '../sprites/gato.js'
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: 'Dialog'});
    }
    init(flag){
        if (Object.keys(flag).length === 0) flag = 1;
        
        this.IDscene = flag;
    }

    preload(){
        this.load.json('data1','./data/Dialog1.json');
        this.load.json('data2','./data/Prueba1.json');
        this.load.json('data3','./data/Prueba2.json');

        this.load.image('background0','./assets/fondos/cajaPuerta.jpg');

        this.load.json('cartas2','./data/Cartas.json')
        
        this.load.image('gato', './assets/Gato.png');
        this.load.spritesheet('melchor', './assets/Melchor.png',{frameWidth: 500, frameHeight: 600})
        
    }

    create(){
        switch (this.IDscene){
        case (1):
            this.data = this.cache.json.get('data1');
            this.add.image(0, 0, 'background0').setOrigin(0,0).setScale(1.9,1.9);
            break;
        case(2):
            this.deck = this.cache.json.get('cartas2')
            this.data = this.cache.json.get('data2');
            break;
        }
        this.Melch = new Melchor(this, 0, this.sys.game.canvas.height).setOrigin(0,1);
        this.Gato = new Cat(this, this.sys.game.canvas.width, this.sys.game.canvas.height).setOrigin(1,1);

        this.decoder = new Decoder(this, this.data, this.deck);
        this.events.on('next',() => {this.decoder.decode()});
        
        // Empieza el decode del JSON por el RootNode
        this.decoder.decode();
    }
    showSprite(sprite){
        if(sprite == 'gato') {
            this.Melch.visible = false;
            this.Gato.visible = true;
        }
        else if(sprite == 'melchor'){
            this.Melch.visible = true;
            this.Gato.visible = false;
        }
        else{
            this.Melch.visible = false;
            this.Gato.visible = false;
        }
    }
}