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
        if (Object.keys(flag).length === 0 && this.first) flag = 0;
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

            this.load.image('parque-ligon','../assets/cardImages/Parque/PrimerLigoteo.jpg');
            this.load.image('parque-amigos','../assets/cardImages/Parque/Amigos.jpg');
            this.load.image('parque-antiSoc','../assets/cardImages/Parque/Antisocial.jpg');
            this.load.image('parque-avInd','../assets/cardImages/Parque/columpio.jpg');
            this.load.image('parque-robar','../assets/cardImages/Parque/MelchorNoRobes.jpg');
            this.load.image('parque-banda','../assets/cardImages/Parque/LaBandadelParque.jpg');

            this.load.image('bgParque-ligon', '../assets/fondos/Parque/Ligoteo.jpg');
            this.load.image('bgParque-amigos', '../assets/fondos/Parque/amigos.jpg');
            this.load.image('bgParque-antiSoc', '../assets/fondos/Parque/antisocial.jpg');
            this.load.image('bgParque-avInd', '../assets/fondos/Parque/Aventura.jpg');
            this.load.image('bgParque-robar', '../assets/fondos/Parque/Ladron.jpg');
            this.load.image('bgParque-banda', '../assets/fondos/Parque/banda.jpg');
            
            //Insti

            this.load.json('dataInsti','../data/Dialogue/DialogInstituto.json');
            this.load.json('cartasInsti','../data/Cartas/CartasInstituto.json');
            this.load.image('backgroundInsti','../assets/fondos/Instituto/InstiFuturista.jpg');
            
            this.load.image('Pelota','../assets/cardImages/Instituto/Pelota.jpg');
            this.load.image('Uno','../assets/cardImages/Instituto/Uno.jpg');
            this.load.image('Apadrinado','../assets/cardImages/Instituto/Apadrinado.jpg');
            this.load.image('Pestoso','../assets/cardImages/Instituto/Pestoso.jpg');
            this.load.image('Juego','../assets/cardImages/Instituto/Juega.jpg');
            this.load.image('Mertxor','../assets/cardImages/Instituto/Mertxor.jpg');

            this.load.image('bgInsti-Pelota','../assets/fondos/Instituto/bgInsti-pelota.jpg');
            this.load.image('bgInsti-Uno','../assets/fondos/Instituto/bgInsti-uno.jpg');
            this.load.image('bgInsti-Apadrinado','../assets/fondos/Instituto/bgInsti-apadrinado.jpg');
            this.load.image('bgInsti-Pestoso','../assets/fondos/Instituto/bgInsti-pestoso.jpg');
            this.load.image('bgInsti-Juega','../assets/fondos/Instituto/bgInsti-juega.jpg');
            this.load.image('bgInsti-Mertxor','../assets/fondos/Instituto/bgInsti-mertxor.jpg');
            
            //Estudios

            this.load.json('dataEstudios','../../data/Dialogue/DialogEstudios.json');
            this.load.json('cartasEstudios','../data/Cartas/CartasES.json');
            this.load.image('backgroundEstudios','../assets/fondos/Estudios/backgorund-estudios.jpg');

            this.load.image('estudios-uni','../assets/cardImages/Estudios/estudios-universidad.jpg');
            this.load.image('estudios-fp','../assets/cardImages/Estudios/estudios-fp.jpg');
            this.load.image('estudios-chamba','../assets/cardImages/Estudios/estudios-chamba.png');
            this.load.image('estudios-nini','../assets/cardImages/Estudios/estudios-nini.jpg');
            this.load.image('estudios-creaInator','../assets/cardImages/Estudios/estudios-creainators.png');
            this.load.image('estudios-consejo','../assets/cardImages/Estudios/estudios-consejo.jpg');

            this.load.image('universidad','../assets/fondos/Estudios/estudios-uni.jpeg');
            this.load.image('gradosuperior','../assets/fondos/Estudios/estudios-fp.jpeg');
            this.load.image('chamba','../assets/fondos/Estudios/estudios-chamba.jpg');
            this.load.image('nini','../assets/fondos/Estudios/estudios-mantenido.jpeg');
            this.load.image('inventorcaserocrea-inetors','../assets/fondos/Estudios/estudios-creainators.png');
            this.load.image('buscarconsejo','../assets/fondos/Estudios/estudios-consejo.jpg');

            //Universidad

            this.load.json('dataUni','../../data/Dialogue/DialogUniversidad.json');
            this.load.json('cartasUni','../data/Cartas/CartasUniversidad.json');
            this.load.image('backgroundUni','../assets/fondos/Estudios/backgorund-estudios.jpg');
/*
            this.load.image('estudios-uni','../assets/cardImages/Uni/estudios-universidad.jpg');
            this.load.image('estudios-fp','../assets/cardImages/Estudios/estudios-fp.jpg');
            this.load.image('estudios-chamba','../assets/cardImages/Estudios/estudios-chamba.png');
            this.load.image('estudios-nini','../assets/cardImages/Estudios/estudios-nini.jpg');
            this.load.image('estudios-creaInator','../assets/cardImages/Estudios/estudios-creainators.png');
            this.load.image('estudios-consejo','../assets/cardImages/Estudios/estudios-consejo.jpg');

            this.load.image('universidad','../assets/fondos/Estudios/estudios-uni.jpeg');
            this.load.image('gradosuperior','../assets/fondos/Estudios/estudios-fp.jpeg');
            this.load.image('chamba','../assets/fondos/Estudios/estudios-chamba.jpg');
            this.load.image('nini','../assets/fondos/Estudios/estudios-mantenido.jpeg');
            this.load.image('inventorcaserocrea-inetors','../assets/fondos/Estudios/estudios-creainators.png');
            this.load.image('buscarconsejo','../assets/fondos/Estudios/estudios-consejo.jpg');
*/
            //Grado Superior
            this.load.json('dataGSuperior','../data/Dialogue/DialogFP.json');
            this.load.json('cartasGSuperior','../data/Cartas/CartasFP.json');
            this.load.image('backgroundFP','../assets/fondos/Grado Superior/gs-background.jpg');

            this.load.image('gs-PruebaProfesor','../assets/cardImages/Grado Superior/gs-PruebasProfesor.jpeg');
            this.load.image('gs-Ideaca','../assets/cardImages/Grado Superior/gs-Ideaca.jpg');
            this.load.image('gs-LuzBalcón','../assets/cardImages/Grado Superior/gs-LuzBalcón.jpeg');
            this.load.image('gs-Emprendedor','../assets/cardImages/Grado Superior/gs-Emprendedor.jpeg');
            this.load.image('gs-CafeAmargo','../assets/cardImages/Grado Superior/gs-CaféAmargo.jpeg');
            this.load.image('gs-PrestamoEgoista','../assets/cardImages/Grado Superior/gs-PrestamoEgoista.jpg');

            this.load.image('bg-PruebaProfesor','../assets/fondos/Grado Superior/gs-PruebaPRofesor.png');
            this.load.image('bg-Ideaca','../assets/fondos/Grado Superior/gs-Ideaca.png');
            this.load.image('bg-LuzBalcon','../assets/fondos/Grado Superior/gs-LuzBalcón.png');
            this.load.image('bg-Emprededor','../assets/fondos/Grado Superior/gs-Empreddedor.jpg');
            this.load.image('bg-CafeAmargo','../assets/fondos/Grado Superior/gs-CaféAmargo.jpg');
            this.load.image('bg-PrestamoEgoista','../assets/fondos/Grado Superior/gs-PrestamonoGeneroso.jpg');

            // Bar
            this.load.json('dataBar','../data/Dialogue/DialogBar.json');
            this.load.json('cartasBar','../data/Cartas/CartasBar.json');
            this.load.image('backgroundBar','../assets/fondos/Bar/BarBG.jpg');

            this.load.image('bar-ayuda','../assets/cardImages/Bar/Llorando.jpg');
            this.load.image('bar-NuevoLigoteo','../assets/cardImages/Bar/Ligoteo2.jpg');
            this.load.image('bar-Baño','../assets/cardImages/Bar/Baños.jpg');
            this.load.image('bar-Irte','../assets/cardImages/Bar/Saliendo.jpg');
            this.load.image('bar-Mano','../assets/cardImages/Bar/Mano.jpg');
            this.load.image('bar-Ahogar','../assets/cardImages/Bar/beber.jpg');
            //Mantenido
            this.load.json('dataMantenido','../data/Dialogue/DialogMantenido.json');
            this.load.json('cartasMantenido','../data/Cartas/CartasMantenido.json');
            this.load.image('backgroundMantenido','../assets/fondos/Mantenido/Mantenido.png');
 
            this.load.image('mantenido-genio','../assets/cardImages/Mantenido/GenioIncomprendido.jpeg');
            this.load.image('mantenido-fan','../assets/cardImages/Mantenido/fan.jpg');
            this.load.image('mantenido-otro','../assets/cardImages/Mantenido/OtroDiaMas.jpg');
            this.load.image('mantenido-apoyo','../assets/cardImages/Mantenido/ApoyarEnCasa.png');
            this.load.image('mantenido-hacuma','../assets/cardImages/Mantenido/Hacuma Mapapa.jpg');
            this.load.image('mantenido-puf','../assets/cardImages/Mantenido/puffffffff.jpg');

            

            

            //Sprites
            this.load.image('gato', '../assets/sprites/Gato.png');
            this.load.spritesheet('melchor', '../assets/sprites/Melchor.png',{frameWidth: 500, frameHeight: 600})

            this.registry.set('karma',100);
            this.first = false;
        }
    }

    create(){
        console.log(this.IDscene);
        this.scale.resize(800,600);
        switch (this.IDscene){
        case (0):
            this.datos = this.cache.json.get('dataIntro');
            this.add.image(0, 0, 'backgroundIntro').setOrigin(0,0).setScale(1.9,1.9);
            break;
        case(1):
            this.deck = this.cache.json.get('cartasParque');
            this.datos = this.cache.json.get('dataParque');
            this.add.image(800, 600, 'backgroundParque').setOrigin(1).setScale(0.8,0.8);
            break;
        case(2):
            this.deck = this.cache.json.get('cartasInsti');
            this.datos = this.cache.json.get('dataInsti');
            this.add.image(800, 600, 'backgroundInsti').setOrigin(1,1).setScale(1.2,1.2);
            break;
        case(3):
            this.deck = this.cache.json.get('cartasEstudios');
            this.datos = this.cache.json.get('dataEstudios');
            this.add.image(0,0,'backgroundEstudios').setOrigin(0,0).setScale(1.7,1.7);
            break;
        case (5):
            this.deck = this.cache.json.get('cartasGSuperior');
            this.datos = this.cache.json.get('dataGSuperior');
            this.add.image(0, 0, 'backgroundFP').setOrigin(0,0).setScale(1.4,1.4);
            break;
        case(6):
            this.deck = this.cache.json.get('cartasBar');
            this.datos = this.cache.json.get('dataBar');
            this.add.image(800, 600, 'backgroundBar').setOrigin(1,1);
            break;
        }
        

        
    
        this.Melch = new Melchor(this, 0, this.sys.game.canvas.height).setOrigin(0,1);
        this.Gato = new Cat(this, this.sys.game.canvas.width, this.sys.game.canvas.height).setOrigin(1,1);

        this.decoder = new Decoder(this, this.datos, this.deck);
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