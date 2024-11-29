/*Escena de Phaser*/
import Decoder from "../Decode.js";
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: 'Dialog'});
    }
    init(flag){
        this.IDscene = flag;
    }

    preload(){
        this.load.json('data1','./data/Prueba1.json');
        this.load.json('data2','./data/Prueba2.json');

        this.load.json('deck1','./data/Cartas.json')
        
        this.load.image('gato', './assets/Gato.png');
        this.load.image('background','./assets/KualaLumpur.jpg');
    }

    create(){
        switch (this.IDscene){
        case (1):
            this.data = this.cache.json.get('data1');
            break;
        case(2):
            this.data = this.cache.json.get('data2');
            break;
        }
        this.add.image(400, 300, 'background');
        this.add.image(400, 300, 'gato');

        this.events.on('next',() => {this.decoder.decode()});
        
        console.log(this.data);

        this.decoder = new Decoder(this, this.data);

        // Empieza el decode del JSON por el RootNode
        this.decoder.decode();
    }
}