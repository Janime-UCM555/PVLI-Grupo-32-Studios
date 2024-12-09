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
            //Intro
            this.load.json('dataIntro','../data/Dialogue/DialogInicio.json');
            this.load.image('backgroundIntro','../assets/fondos/cajaPuerta.jpg');
            //Parque
            this.load.json('dataParque','../data/Dialogue/DialogParque.json');
            this.load.json('cartasParque','../data/Cartas/CartasParque.json');
            this.load.image('backgroundParque','../assets/fondos/Parque/parque.png');

            this.load.image('parque-ligon','../assets/cardImages/Parque/PrimerLigoteo.jpg')
            this.load.image('parque-amigos','../assets/cardImages/Parque/Amigos.jpg')
            this.load.image('parque-antiSoc','../assets/cardImages/Parque/Antisocial.jpg')
            this.load.image('parque-avInd','../assets/cardImages/Parque/columpio.jpg')
            this.load.image('parque-robar','../assets/cardImages/Parque/MelchorNoRobes.jpg')
            this.load.image('parque-banda','../assets/cardImages/Parque/LaBandadelParque.jpg')

            this.load.image('conseqParque-1', '../assets/fondos/')
            //Insti
            this.load.json('dataInsti','../data/Dialogue/DialogInstituto.json');
            this.load.json('cartasInsti','../data/Cartas/CartasInstituto.json');
            this.load.image('backgroundInsti','../assets/fondos/InstiFuturista.jpg');
            //Estudios

            //Sprites
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
            this.data = this.cache.json.get('dataIntro');
            this.add.image(0, 0, 'backgroundIntro').setOrigin(0,0).setScale(1.9,1.9);
            break;
        case(2):
            this.deck = this.cache.json.get('cartasParque');
            this.data = this.cache.json.get('dataParque');
            this.add.image(800, 600, 'backgroundParque').setOrigin(1).setScale(0.8,0.8);
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