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
    
    preload()
    {
        if(this.first){
            //cars
            this.load.image('car', '../assets/Coche.png')
            this.load.image('car2', '../assets/Coche2.png')
            this.load.image('car3', '../assets/Coche3.png')

            this.load.image('ramp', '../assets/Rampa.png')
            this.load.audio('claxon','../assets/claxon.mp3')
            

            this.load.tilemapTiledJSON('tilemap','../data/Road.json');
            this.load.image('Ciudad', '../assets/Ciudad.png');
            this.load.image('Bandera','../assets/Flag.png');
            this.load.image('Abuelita', '../assets/Abuelita.png');
            this.load.image('Deportista', '../assets/Deportista.png');
            this.load.image('Default', '../assets/Default.png');
            this.load.image('Chico', '../assets/Chico.png');
            this.load.image('semaforo_rojo', '../assets/semaforo_rojo.png');
            this.load.image('semaforo_verde', '../assets/semaforo_verde.png');
            
            this.registry.set('karma',50);
            this.registry.set('atropellados', 0);

            this.first = false;
        }
    }
    muestraFicha(peaton) {
        this.fichaPeaton.foto.setTexture(peaton.foto);
        this.fichaPeaton.nombreTexto.setText(`Nombre: ${peaton.name}`);
        this.fichaPeaton.edadTexto.setText(`Edad: ${peaton.edad}`);
        this.fichaPeaton.setVisible(true);

        this.time.delayedCall(1000, () => {
            this.fichaPeaton.setVisible(false);
        });
    }
    create()
    {

        this.scale.resize(950, 700);
        this.carTextures = ['car','car2','car3'];

        // Cargamos el TileMap
        this.map = this.make.tilemap({
            key:'tilemap',
            tileWidth:16,
            tileHeight:16      
        });
        
        const tileset = this.map.addTilesetImage('CP_V1.0.4', 'Ciudad');
        var calle = this.map.createLayer('Calle', tileset);
        calle.setCollisionByProperty({collides: true});
        var terrenos = this.map.createLayer('Terrenos', tileset);
        var carretera = this.map.createLayer('Carretera', tileset);
        carretera.setCollisionByProperty({collides: true});
       
        this.car = new Coche(this,100,125,'car');

        this.car.setScale(0.1);
        this.car.setSize(200,300);
        this.car.setCollideWorldBounds(true);


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




        //this.ramp = new Rampa(this,250,250,'ramp');
        const objectLayer = this.map.getObjectLayer('Flags');
        this.flags = [];
        objectLayer.objects.forEach((obj) => {
            if (obj.type === 'Flag') {
                if(obj.name === 'FlagShop')
                {
                    const flag = new Flag(this, obj.x, obj.y, 'Bandera','Dialog', 1);
                    this.flags.push(flag);
                }
                else
                {
                    const flag = new Flag(this, obj.x, obj.y, 'Bandera', 'Dialog', 2);
                    this.flags.push(flag);
                }              
                
            }
        });
       

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
        const foto = this.add.image(100, 50, 'Default').setScale(0.5);
        const nombreTexto = this.add.text(10, 130, '', { fontSize: '12px', fill: '#fff' });
        const edadTexto = this.add.text(10, 160, '', { fontSize: '12px', fill: '#ccc' });
        const descripcionTexto = this.add.text(10, 130, '', { fontSize: '12px', fill: '#bbb' });

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
        this.karmaText = this.add.text(16, 16, 'Karma: ' +  this.sys.game.registry.get('karma'), {
            fontSize: '20px',
            fill: '#ff0000',
            backgroundColor: '#000000',
        }).setScrollFactor(0);

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
        this.flags.forEach(flag => {
            const playerBounds = this.car.getBounds();
            const flagBounds = flag.getBounds();

            if(Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, flagBounds))
            {
                flag.activate();
            }
        })

    }
    

    choque(peaton)
    {  
        if(peaton === "COCHE")
        {
            let p = new Peaton(this, 0, 0, 'Abuelita', 5, "Abuelita Jojo", 80, 25);
            let a = new Peaton(this, 0, 0, 'Deportista', 2, "Sportacus", 30, 100);
            let b = new Peaton(this, 0, 0, 'Chico', 1, "Chico Percebe", 20, 35);
            const peatonInfo = Phaser.Math.RND.pick([p,a,b]);
            peaton = peatonInfo;
        }
        var karmaQuantity = this.sys.game.registry.get('karma') - peaton.karma;
        if(karmaQuantity < 0) karmaQuantity = 0;
        else if(karmaQuantity > 100) karmaQuantity = 100;
        this.sys.game.registry.set('karma', karmaQuantity);
        let count =  this.sys.game.registry.get('atropellados');
        this.registry.set('atropellados', count + 1);
        this.karmaText.setText('Karma: ' +  this.sys.game.registry.get('karma'));
        this.events.emit('muestraFicha', peaton);
        peaton.destroy();
        
    }
    
}
export default map;