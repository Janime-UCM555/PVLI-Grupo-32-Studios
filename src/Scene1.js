/*Escena de Phaser*/
import Decoder from "./Decode.js";
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "scene1"});
        this.data;
        this.decode;
    }

    preload(){
        this.load.json('data','../data/Prueba2.json');
        this.load.image('carta', '../assets/carta.jpeg');
        this.load.image('gato', '../assets/Gato.png');
        this.load.image('background','../assets/KualaLumpur.jpg');
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

    update(){
    }
}