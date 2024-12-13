import Coche from '../gameObjects/Coche.js';
import Flag from '../gameObjects/Flag.js';
import Peaton from '../gameObjects/Peaton.js';
import Semaforo from '../gameObjects/Semaforo.js';
import CocheIA from '../gameObjects/CocheIA.js';
class map extends Phaser.Scene{

   
    constructor(){
        super({ key:'map'});
        this.first = true;
        
    }
    init(data)
    {
        this.flagIndex = data.NextStoryName;
        console.log( data.NextStoryName);
    }
    preload()
    {
        if(this.first){
            //cars
            this.load.image('car', '././assets/Coche.png');
            this.load.image('car2', '././assets/Coche2.png');
            this.load.image('car3', '././assets/Coche3.png');

            this.load.image('ramp', '././assets/Rampa.png');

            this.load.audio('claxon','././assets/claxon.mp3');
            this.load.audio('ambiente','././assets/Sonidos/AmbienteCiudad.mp3');
            this.load.audio('choque','././assets/Sonidos/Choque.mp3');
            this.load.audio('atropello','././assets/Sonidos/Hit.mp3');
            this.load.audio('mario','././assets/Sonidos/MarioYell.mp3');
            this.load.audio('luigi','././assets/Sonidos/Luigi.mp3')
            

            this.load.tilemapTiledJSON('tilemap','././data/Road.json');
            this.load.image('Ciudad', '././assets/Ciudad.png');
            this.load.image('Bandera','././assets/Flag.png');

            // Peatones
            this.load.image('Abuelita', '././assets/Abuelita.png');
            this.load.image('Deportista', '././assets/Deportista.png');
            this.load.image('Default', '././assets/Default.png');
            this.load.image('Chico', '././assets/Chico.png');
            this.load.image('Villano', '././assets/ReyHielo.png');
            this.load.image('Niño', '././assets/Bart.png');
            this.load.image('Doctor', '././assets/Doctor.png');
            this.load.image('Italiano', '././assets/FranccescoVirgolini.png');
            this.load.image('Caustico', '././assets/MaxVerstappen.png');
            this.load.image('Rencoroso', '././assets/Luigi.png');

            this.load.image('semaforo_rojo', '././assets/semaforo_rojo.png');
            this.load.image('semaforo_verde', '././assets/semaforo_verde.png');
            
            this.registry.set('atropellados', 0);

            this.registry.set('carX',100);
            this.registry.set('carY',125);
            this.first = false;
        }
    }
    muestraFicha(peaton) {
        const borde = this.add.rectangle(0, 0, 224, 184, 0xffffff, 0.8).setOrigin(0);
        this.fichaPeaton.addAt(borde,0),
        this.fichaPeaton.foto.setTexture(peaton.foto);
        this.fichaPeaton.nombreTexto.setText(`Nombre: ${peaton.name}`);
        this.fichaPeaton.edadTexto.setText(`Edad: ${peaton.edad}`);
        this.fichaPeaton.descripcionTexto.setText(`Descripción:${peaton.desc}`);
        this.fichaPeaton.setVisible(true);

        this.time.delayedCall(2000, () => {
            this.fichaPeaton.setVisible(false);
        });
    }
    create()
    {
        this.ambientSound = this.sound.add('ambiente', {loop: true});
        this.ambientSound.play();
        this.scale.resize(950, 700);
        this.carTextures = ['car','car2','car3'];

        // Cargamos el TileMap
        this.map = this.make.tilemap({
            key:'tilemap',
            tileWidth:16,
            tileHeight:16      
        });
        
        const tileset = this.map.addTilesetImage('CP_V1.0.4', 'Ciudad');
        var terrenos = this.map.createLayer('Terrenos', tileset);
        var calle = this.map.createLayer('Calle', tileset);
        calle.setCollisionByProperty({collides: true});
        var carretera = this.map.createLayer('Carretera', tileset);
        carretera.setCollisionByProperty({collides: true});
        var block = this.map.createLayer('Block', tileset);
        block.setCollisionByProperty({collides: true});
        this.car = new Coche(this,this.registry.get('carX'),this.registry.get('carY'),'car');
        

        this.car.setScale(0.1);
        this.car.setSize(200,300);

        this.physics.add.collider(this.car,block);

        var edificios = this.map.createLayer('Edificios', tileset);
        edificios.setCollisionByProperty({collides: true});

        // Se cargan las rutas para los coches
        this.rutaA = [];    
        this.rutaB = []; 
        this.rutaC = [];    
        this.rutaD = []; 
        const rutaLayer = this.map.getObjectLayer('Rutas');
        rutaLayer.objects.forEach((obj) => {
            if (obj.properties[0].value === "Coche1") {
                let point = 
                {
                    x:obj.x,
                    y:obj.y,
                }
                this.rutaA.push(point);                
            }
            else if (obj.properties[0].value === "Coche2") {
                
              
                let point = 
                {
                    x:obj.x,
                    y:obj.y,
                }
                this.rutaB.push(point);                
            }
            else if (obj.properties[0].value === "Coche3") {
                
              
                let point = 
                {
                    x:obj.x,
                    y:obj.y,
                }
                this.rutaC.push(point);                
            }
            else if (obj.properties[0].value === "Coche4") {
                
              
                let point = 
                {
                    x:obj.x,
                    y:obj.y,
                }
                this.rutaD.push(point);                
            }
        });
        this.time.addEvent({
            delay: Phaser.Math.Between(3000,5000),
            callback: () =>
            {
                const ruta = Phaser.Math.RND.pick([this.rutaA,this.rutaB,this.rutaC,this.rutaD]);
                const texture = Phaser.Math.RND.pick(this.carTextures);
                this.createCoche(ruta,texture);
            },
            callbackScope: this,
            loop: true
        });



        console.log("FLAGINDEX:  "+ this.flagIndex);
        //this.ramp = new Rampa(this,250,250,'ramp');
        const objectLayer = this.map.getObjectLayer('Flags');
        this.flags = [];
        let i = 1;
        objectLayer.objects.forEach((obj) =>{
            //let flag = new Flag(this, obj.x, obj.y, 'Bandera','Dialog',parseInt(this.flagIndex) + 1);
            let flag = new Flag(this, obj.x, obj.y, 'Bandera','Dialog',i);
            this.flags.push(flag);
            flag.visible = false;
            i++;
        })
        if(this.flagIndex < 10)
        {
            this.flags[this.flagIndex].setVisible(true);
        }
        


        const carGenLayer = this.map.getObjectLayer('CarGenerator');
        
        const semaforoLayer = this.map.getObjectLayer('Crossings');
        semaforoLayer.objects.forEach((obj) => {
     
            if(obj.name === 'H')
            {
                let random = Phaser.Math.Between(2000,5000);
                const semaforo = new Semaforo(this,obj.x,obj.y,1,0,random);
            }
            else
            {
                let random = Phaser.Math.Between(2000,5000);
                const semaforo = new Semaforo(this,obj.x,obj.y,0,1,random);
            } 
                
        });
        //creamos la ficha
        this.fichaPeaton = this.add.container(600,50).setVisible(false);
        const fondo = this.add.rectangle(0, 0, 200, 200, 0x000000, 0.7).setOrigin(0);
        this.fichaPeaton.add(fondo);
        const foto = this.add.image(100, 50, 'Default').setScale(0.35).setOrigin(0.5);
        const nombreTexto = this.add.text(10, 100, '', { fontSize: '12px', fill: '#fff' });
        const edadTexto = this.add.text(10, 120, '', { fontSize: '12px', fill: '#ccc' });
        const descripcionTexto = this.add.text(10, 140, '', { fontSize: '12px', fill: '#bbb',  wordWrap: { width: 180, useAdvancedWrap: true }});

        this.fichaPeaton.add([fondo,foto,nombreTexto,edadTexto,descripcionTexto]);
        this.fichaPeaton.foto = foto;
        this.fichaPeaton.nombreTexto = nombreTexto;
        this.fichaPeaton.edadTexto = edadTexto;
        this.fichaPeaton.descripcionTexto = descripcionTexto;
        

        this.events.on('muestraFicha',this.muestraFicha,this);
        

        this.physics.add.collider(this.car,calle);
        this.physics.add.collider(this.car,carretera);
        

        this.claxonSound =  this.sound.add('claxon');

        this.input.keyboard.on('keydown-E', this.checkFlags,this);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.launch('PauseMenu', { activeSceneKey: this.scene.key});
            this.scene.pause();
        });
        

    }
    createCoche(ruta, textureKey) {
        const coche = new CocheIA(this, ruta[0].x, ruta[0].y, textureKey, ruta);
        this.physics.add.collider(coche, this.car, () => {
            this.choque("COCHE");
            coche.destroy();
        });
        return coche;
    }
    checkFlags()
    {
        this.registry.set('carX',this.car.x);
        this.registry.set('carY',this.car.y);
        this.flags.forEach(flag => {
            const playerBounds = this.car.getBounds();
            const flagBounds = flag.getBounds();
            const isFlagVisible = flag.visible;
            console.log(isFlagVisible);
            if(Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, flagBounds) && isFlagVisible)
            {
                flag.activate();
                this.mute();
            }
        })

    }
    

    choque(peaton)
    {  
        if(peaton === "COCHE")
        {
            let conductores = [
                new Peaton(this, 0, 0, 'Caustico', -3, "Max Verstapen", 27,"Joven temerario al volante qeu descuida las leyes de trafico", 120),
                new Peaton(this, 0, 0, 'Rencoroso', 2, "Luigi", 32, "Adulto que considera que hace todo bien y el resto mal",100),
                new Peaton(this, 0, 0, 'Italiano', 5, "Franccesco Virgolinni", 20, "Corredor retirado que solo qeuria vivir una vida tranquila", 55)

            ]
            if(peaton.name === 'Luigi'){
                this.sonidoatropello = this.sound.add('luigi');
            }
            else{
                this.sonidoatropello = this.sound.add('choque');
            }
            const peatonInfo = Phaser.Math.RND.pick(conductores);
            peaton = peatonInfo;
        }
        else if(peaton.name === 'Doctor Mario'){
            this.sonidoatropello = this.sound.add('mario')
        }
        else{
            this.sonidoatropello = this.sound.add('atropello');
        }
        this.sonidoatropello.play();
        var karmaQuantity = this.sys.game.registry.get('karma') - peaton.karma;
        if(karmaQuantity < 0) karmaQuantity = 0;
        else if(karmaQuantity > 200) karmaQuantity = 200;
        this.sys.game.registry.set('karma', karmaQuantity);
        let count =  this.sys.game.registry.get('atropellados');
        this.registry.set('atropellados', count + 1);
        this.events.emit('muestraFicha', peaton);
        peaton.destroy();
        
    }
    mute(){
        this.ambientSound.stop();
    }
    
}
export default map;