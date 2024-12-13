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
            this.load.audio('cardMusic','../assets/Sonidos/cardMusic.mp3')
            this.load.audio('draw','../assets/Sonidos/draw.mp3')

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
            this.load.json('dataUni','../data/Dialogue/DialogUniversidad.json');
            this.load.json('cartasUni','../data/Cartas/CartasUniversidad.json');
            this.load.image('backgroundUni','../assets/fondos/Universidad/universidad-backgorundjpg.jpg');
 
            this.load.image('uni-EncimaSinCobrar','../assets/cardImages/Universidad/universidad-sincobrar.jpeg');
            this.load.image('uni-SiTieneMiedoAlCambio','../assets/cardImages/Universidad/universidad-sitienesmiedo.jpg');
            this.load.image('uni-EsoLoHagoYo','../assets/cardImages/Universidad/universidad-esolohagoyo.jpeg');
            this.load.image('uni-SeVienenCositas','../assets/cardImages/Universidad/universidad-sevienencositas.jpeg');
            this.load.image('uni-CafeRosquilla','../assets/cardImages/Universidad/universidad-caferosquilla.jpg');
            this.load.image('uni-AplicarLoAprendido','../assets/cardImages/Universidad/universidad-aplicarloaprendido.jpeg');
             
            this.load.image('bg-EncimaSinCobrar','../assets/fondos/Universidad/universidad-sincobrar.jpeg');
            this.load.image('bg-SiTieneMiedoAlCambio','../assets/fondos/Universidad/universidad-sitienesmiedo.jpeg');
            this.load.image('bg-EsoLoHagoYo','../assets/fondos/Universidad/universidad-esolohagoyo.jpeg');
            this.load.image('bg-SeVienenCositas','../assets/fondos/Universidad/universidad-sevienencositas.jpg');
            this.load.image('bg-CafeRosquilla','../assets/fondos/Universidad/universidad-caferosquilla.jpg');
            this.load.image('bg-AplicarLoAprendido','../assets/fondos/Universidad/universidad-aplicarloaprendido.jpg');

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

            this.load.image('barbg-ayuda','../assets/fondos/Bar/Millonario.jpg');
            this.load.image('barbg-NuevoLigoteo','../assets/fondos/Bar/Chica.jpg');
            this.load.image('barbg-Baño','../assets/fondos/Bar/Pelea.jpg');
            this.load.image('barbg-Irte','../assets/fondos/Bar/Robo.png');
            this.load.image('barbg-Mano','../assets/fondos/Bar/Mano.jpg');
            this.load.image('barbg-Ahogar','../assets/fondos/Bar/Ahoga.jpg');

            //Chamba
            this.load.json('dataChamba','../data/Dialogue/DialogChamba.json');
            this.load.json('cartasChamba','../data/Cartas/CartasChamba.json');
            this.load.image('backgroundChamba','../assets/fondos/Estudios/estudios-chamba.jpg');
 
            this.load.image('chamba-darloTodo','../assets/cardImages/Chamba/MuyCansado.png');
            this.load.image('chamba-ayho','../assets/cardImages/Chamba/Ayho.jpg');
            this.load.image('chamba-mes','../assets/cardImages/Chamba/EmpleadodelMes.jpg');
            this.load.image('chamba-apoyolab','../assets/cardImages/Chamba/ApoyoLaboral.jpeg');
            this.load.image('chamba-chamba','../assets/cardImages/Chamba/VamosAChambear.jpg');
            this.load.image('chamba-fastidio','../assets/cardImages/Chamba/NoMeFastidies.jpeg');

            this.load.image('bg-darloTodo','../assets/fondos/Chamba/Chamba-Dandolo.jpeg');
            this.load.image('bg-ayho','../assets/fondos/Chamba/Chamba-Ay.jpeg');
            this.load.image('bg-mes','../assets/fondos/Chamba/Chamba-Empleado.jpeg');
            this.load.image('bg-apoyolab','../assets/fondos/Chamba/Chamba-Apoyo.jpeg');
            this.load.image('bg-chamba','../assets/fondos/Chamba/Chamba-Vamos.png');
            this.load.image('bg-fastidio','../assets/fondos/Chamba/Chamba-No.jpeg');

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

            this.load.image('bg-genio','../assets/fondos/Mantenido/Mantenido-Genio.jpeg');
            this.load.image('bg-fan','../assets/fondos/Mantenido/Mantenido-Fan.jpg');
            this.load.image('bg-otro','../assets/fondos/Mantenido/Mantenido-Otro.jpg');
            this.load.image('bg-apoyo','../assets/fondos/Mantenido/Mantenido-apoyo.jpeg');
            this.load.image('bg-hacuma','../assets/fondos/Mantenido/Mantenido-Hacuma.jpeg');
            this.load.image('bg-puf','../assets/fondos/Mantenido/Mantenido-Puf.jpeg');
            
            //Vagabundo
            this.load.json('dataVagabundo','../data/Dialogue/DialogVagabundo.json');
            this.load.json('cartasVagabundo','../data/Cartas/CartasVagabundo.json');
            this.load.image('backgroundVagabundo','../assets/fondos/Vagabundo/fondoPuente.jpg');

            this.load.image('vaga-Rein','../assets/cardImages/Vagabundo/Reinventarse.jpeg');
            this.load.image('vaga-mal','../assets/cardImages/Vagabundo/CalamardoSad.jpg');
            this.load.image('vaga-destino','../assets/cardImages/Vagabundo/sadAnt.jpeg');
            this.load.image('vaga-perdiendo','../assets/cardImages/Vagabundo/pepeSad.jpg');
            this.load.image('vaga-error','../assets/cardImages/Vagabundo/NoSigas.jpg');
            this.load.image('vaga-caer','../assets/cardImages/Vagabundo/inventor.jpg');

            this.load.image('bg-vagabundoInv','../assets/fondos/Vagabundo/reinvent.jpg');

            //Inventor
            this.load.json('dataInventor','../data/Dialogue/DialogInventorCasero.json');
            this.load.json('cartasInventor','../data/Cartas/CartasInventorCasero.json');
            this.load.image('backgroundInventor','../assets/fondos/InventorCasero/Inventor.jpg');
 
            this.load.image('inv-mist','../assets/cardImages/InventorCasero/Inventor-Probador.jpeg');
            this.load.image('inv-pelador','../assets/cardImages/InventorCasero/Inventor-Pelador.jpeg');
            this.load.image('inv-crisis','../assets/cardImages/InventorCasero/Inventor-Crisis.jpeg');
            this.load.image('inv-compa','../assets/cardImages/InventorCasero/Inventor-Companero.jpg');
            this.load.image('inv-villano','../assets/cardImages/InventorCasero/Inventor-Villano.jpeg');
            this.load.image('inv-vivir','../assets/cardImages/InventorCasero/Inventor-Vivir.png');

            this.load.image('bg-mist','../assets/fondos/InventorCasero/Inventor-Probador.jpeg');
            this.load.image('bg-pelador','../assets/fondos/InventorCasero/Inventor-Pelador.jpeg');
            this.load.image('bg-crisis','../assets/fondos/InventorCasero/Inventor-Crisis.jpeg');
            this.load.image('bg-compa','../assets/fondos/InventorCasero/Inventor-Companero.png');
            this.load.image('bg-villano','../assets/fondos/InventorCasero/Inventor-Villano.jpg');
            this.load.image('bg-vivir','../assets/fondos/InventorCasero/Inventor-Vivir.jpg');

            //Sprites
            this.load.image('gato', '../assets/sprites/Gato.png');
            this.load.spritesheet('melchor', '../assets/sprites/Melchor.png',{frameWidth: 500, frameHeight: 600})

            this.registry.set('karma',100);
            this.first = false;



            // Finales
            this.load.json('badEnding','../../data/Dialogue/Worst-Ending.json');

            this.load.json('midEnding','../../data/Dialogue/MidKarma-Ending.json');

            this.load.json('LowGoodEnding','../../data/Dialogue/LowGoodKarma-Ending.json');
            
            this.load.json('LowBadEnding','../../data/Dialogue/LowBadKarma-Ending.json');

            this.load.json('CanonEnding','../../data/Dialogue/Canon-Ending.json');

            this.load.json('HighGoodEnding','../../data/Dialogue/HighGoodKarma-Ending.json');
        }
    }

    create(){
        console.log(this.IDscene);
        this.scale.resize(800,600);
        this.music = this.sound.add('cardMusic', {loop: true, volume: 0.2});
        this.drawSound = this.sound.add('draw', {volume: 4});
        this.music.play();
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
        case(4):
            this.deck = this.cache.json.get('cartasUni');
            this.datos = this.cache.json.get('dataUni');
            this.add.image(0, 0, 'backgroundUni').setOrigin(0,0).setScale(1.4,1.4);
            break;
        case(5):
            this.deck = this.cache.json.get('cartasGSuperior');
            this.datos = this.cache.json.get('dataGSuperior');
            this.add.image(0, 0, 'backgroundFP').setOrigin(0,0).setScale(1.4,1.4);
            break;
        case(6):
            this.deck = this.cache.json.get('cartasBar');
            this.datos = this.cache.json.get('dataBar');
            this.add.image(800, 600, 'backgroundBar').setOrigin(1,1);
            break;
        case(7):
            this.deck = this.cache.json.get('cartasChamba');
            this.datos = this.cache.json.get('dataChamba');
            this.add.image(800, 600, 'backgroundChamba').setOrigin(0,1).setScale(1.5,1.5);
            break;
        case(8):
            this.deck = this.cache.json.get('cartasMantenido');
            this.datos = this.cache.json.get('dataMantenido');
            this.add.image(800, 600, 'backgroundMantenido').setOrigin(1,1).setScale(0.8,0.8);
            break;
        case(9):
            this.deck = this.cache.json.get('cartasVagabundo');
            this.datos = this.cache.json.get('dataVagabundo');
            this.add.image(800, 600, 'backgroundVagabundo').setOrigin(1,1).setScale(0.7,0.7);
            break;
        case(10):
            this.deck = this.cache.json.get('cartasInventor');
            this.datos = this.cache.json.get('dataInventor');
            this.add.image(800, 600, 'backgroundInventor').setOrigin(1,1).setScale(0.7,0.7);
            break;
        case(11):
            this.datos = this.cache.json.get('badEnding');
        break;
        case(12):    
        let actKarma = this.sys.registry.get('karma');
        if(actKarma < 35)
        {
            this.datos = this.cache.json.get('LowBadEnding');
        }
        else if( actKarma >= 35 && actKarma < 75)
        {
            //this.datos = this.cache.json.get('');
        }
        else if( actKarma >= 75 && actKarma < 125)
        {
            this.datos = this.cache.json.get('midEnding');
        }
        else if( actKarma >= 125 && actKarma < 165)
        {
            this.datos = this.cache.json.get('LowGoodEnding');
        }
        else if( actKarma >=  165)
        {
            this.datos = this.cache.json.get('HighGoodEnding');
        }
        break;
        case(13):
            this.datos = this.cache.json.get('CanonEnding');
        break;
        }   
        
        
        this.Melch = new Melchor(this, 0, this.sys.game.canvas.height).setOrigin(0,1);
        this.Gato = new Cat(this, this.sys.game.canvas.width, this.sys.game.canvas.height).setOrigin(1,1);

        this.decoder = new Decoder(this, this.datos, this.deck, this.music, this.drawSound);
        this.events.on('next',() => {this.decoder.decode()});
        
        // Empieza el decode del JSON por el RootNode
        this.decoder.decode(this.music);
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