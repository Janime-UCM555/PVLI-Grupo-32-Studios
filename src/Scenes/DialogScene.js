/*Escena de Phaser*/
import Decoder from "../Decode.js";
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: 'Dialog'});
    }
    init(flag){
        this.IDscene = flag;
        this.data;
        this.decoder;
    }

    preload(){
        switch (this.IDscene){
        case (1):
            this.load.json('data','./data/Prueba2.json');
            break;
        case(2):
            this.load.json('data','./data/Prueba1.json');
        }
        this.load.json('data','./data/Prueba1.json');
        this.load.image('gato', './assets/Gato.png');
        this.load.image('background','./assets/KualaLumpur.jpg');
    }

    create(){
        this.add.image(400, 300, 'background');
        this.add.image(400, 300, 'gato');

        this.events.on('next',() => {this.decoder.decode()});
        this.data = this.cache.json.get('data');
        console.log(this.data);

        this.decoder = new Decoder(this, this.data);

        // Empieza el decode del JSON por el RootNode
        this.decoder.decode();
    }
}