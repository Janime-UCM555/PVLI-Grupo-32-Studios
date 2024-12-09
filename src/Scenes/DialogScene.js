/*Escena de Phaser*/
import Decoder from '../Decode.js';
import Melchor from '../sprites/melchor.js'
import Cat from '../sprites/gato.js'
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: 'Dialog'});
        this.first = true;
    }
    init(flag){
        if (Object.keys(flag).length === 0 && this.first) flag = 1;
        console.log("FLAG: " + flag);
        this.IDscene = flag;
    }

    preload(){
        if(this.first){
            this.load.json('data1','../data/Dialogue/DialogInicio.json');
            this.load.json('data2','../data/Dialogue/DialogParque.json');
            this.load.json('data3','../data/Dialogue/DialogInstituto.json');

            this.load.image('background0','../assets/fondos/cajaPuerta.jpg');
            this.load.image('background1','../assets/fondos/parque.png');
            this.load.image('background2','../assets/fondos/InstiFuturista.jpg');

            this.load.json('cartas2','../data/Cartas/CartasParque.json');
            this.load.json('cartas3','../data/Cartas/CartasInstituto.json');

            //this.load.image('conseqParque-1', '../assets/fondos/')
            
            this.load.image('gato', '../assets/sprites/Gato.png');
            this.load.spritesheet('melchor', '../assets/sprites/Melchor.png',{frameWidth: 500, frameHeight: 600})

            this.registry.set('karma',50);
            this.first = false;
        }

        // Imágenes de las cartas:

        // Parque
        this.load.image('Ligoteo','../assets/PrimerLigoteo.jpg');
        this.load.image('Amigos','../assets/Amigos.jpg');
        this.load.image('Antisocial','../assets/Antisocial.jpg');
        this.load.image('Individual','../assets/AventuraIndividual.jpg');
        this.load.image('Robes','../assets/MelchorNoRobes.jpg');
        this.load.image('Banda','../assets/LaBandadelParque.jpg');

        // Instituto
        this.load.image('Pelota','../assets/Pelota.jpg');
        this.load.image('Uno','Uno.jpg');
        this.load.image('Apadrinado','../assets/Apadrinado.jpg');
        this.load.image('Pestoso','../assets/Pestoso.jpg');
        this.load.image('Juego','../assets/Juega.jpg');
        this.load.image('Mertxor','../assets/Mertxor.jpg');
    }

    create(){
        console.log("IDScene" + this.IDscene);
        this.scale.resize(800,600);
        switch (this.IDscene){
        case (1):
            this.data = this.cache.json.get('data1');
            this.add.image(0, 0, 'background0').setOrigin(0,0).setScale(1.9,1.9);
            break;
        case(2):
            this.deck = this.cache.json.get('cartas2');
            this.data = this.cache.json.get('data2');
            this.add.image(800, 600, 'background1').setOrigin(1).setScale(0.8,0.8);
            break;
            
        case(3):
        this.deck = this.cache.json.get('cartas3');
            this.data = this.cache.json.get('data3');
            this.add.image(800, 600, 'background2').setOrigin(1,1);
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