import Coche from '../gameObjects/Coche.js';
import Flag from '../gameObjects/Flag.js';
import Peaton from '../gameObjects/Peaton.js';
import Semaforo from '../gameObjects/Semaforo.js';
class map extends Phaser.Scene{

   
    constructor(){
        super({ key:'map'});
    }
    
    preload()
    {
        this.load.image('car', '../assets/Coche.png')
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

        this.registry.set('atropellados', 0);
    }
    muestraFicha(peaton) {
        this.fichaPeaton.foto.setTexture(peaton.foto);
        this.fichaPeaton.nombreTexto.setText(`Nombre: ${peaton.name}`);
        this.fichaPeaton.edadTexto.setText(`Edad: ${peaton.edad}`);
        this.fichaPeaton.setVisible(true);

        this.time.delayedCall(5000, () => {
            this.fichaPeaton.setVisible(false);
        });
    }
    create()
    {

        this.registry.set('karma',20);
       
        

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


        //this.ramp = new Rampa(this,250,250,'ramp');
        const objectLayer = this.map.getObjectLayer('Flags');
        console.log(objectLayer.objects);
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
        this.karmaText = this.add.text(16, 16, 'Karma: ' + this.registry.get('karma'), {
            fontSize: '20px',
            fill: '#ff0000',
            backgroundColor: '#000000',
        }).setScrollFactor(0);

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.launch('PauseMenu', { activeSceneKey: this.scene.key});
            this.scene.pause();
        });
        

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
        
        this.registry.set('karma', this.registry.get('karma') - peaton.karma);
        let count = this.registry.get('atropellados');
        this.registry.set('atropellados', count + 1);
        this.karmaText.setText('Karma: ' + this.registry.get('karma'));
        this.events.emit('muestraFicha', peaton);
        peaton.destroy();
        
    }
    update()
    {
        this.car.update();
        
    }
    
}
export default map;