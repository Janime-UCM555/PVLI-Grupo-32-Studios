import Coche from '../gameObjects/Coche.js';
import Flag from '../gameObjects/Flag.js';

class map extends Phaser.Scene{

    isonsand = false;
    wasonsand = false;
    constructor(){
        super({ key:'map'});
    }

    preload()
    {
        this.load.image('car', '../assets/Coche.png')
        this.load.image('ramp', '../assets/Rampa.png')
        this.load.audio('claxon','../assets/claxon.mp3')


        this.load.tilemapTiledJSON('tilemap','../data/Road.json')
        this.load.image('Ciudad', '../assets/Ciudad.png')
        this.load.image('Bandera','../assets/Flag.png');
    }
    create()
    {
        this.map = this.make.tilemap({
            key:'tilemap',
            tileWidth:16,
            tileHeight:16      
        });
        
        const tileset = this.map.addTilesetImage('CP_V1.0.4', 'Ciudad');
       
        var carretera = this.map.createLayer('Carretera', tileset);
        carretera.setCollisionByProperty({collides: true});
       
        var calle = this.map.createLayer('Calle', tileset);
        calle.setCollisionByProperty({collides: true});
        var edificios = this.map.createLayer('Edificios', tileset);
        edificios.setCollisionByProperty({collides: true});
        
        
        var terrenos = this.map.createLayer('Terrenos', tileset);
        this.car = new Coche(this,100,125,'car');
        this.car.setScale(0.1);
        this.car.setSize(200,300);
        this.car.setCollideWorldBounds(true);


        //this.ramp = new Rampa(this,250,250,'ramp');
        const objectLayer = this.map.getObjectLayer('Flags');
        console.log(objectLayer.objects);
        this.flags = [];
        objectLayer.objects.forEach((obj) => {
            if (obj.type === 'Flag') {
                if(obj.name == 'FlagShop')
                {
                    const flag = new Flag(this, obj.x, obj.y, 'Bandera','dialog');
                    this.flags.push(flag);
                }
                else
                {
                    const flag = new Flag(this, obj.x, obj.y, 'Bandera',null);
                    this.flags.push(flag);
                }              
                
            }
        });

       

        this.physics.add.collider(this.car,calle);
        this.physics.add.collider(this.car,carretera);
        this.physics.add.collider(this.car, terrenos, this.checkSpeedChange, null, this);
        //this.physics.add.collider(this.car,  terrenos, () => {console.log(("Está"));});
        this.claxonSound =  this.sound.add('claxon');
        //this.ramp.setScale(0.1);
        //this.physics.add.overlap(this.car,this.ramp, ()  =>  {this.ramp.accelerate(this.car);});
        //this.physics.add.overlap(this.car,this.ramp, ()  =>  {this.ramp.accelerate(this.car);});



        this.input.keyboard.on('keydown-E', this.checkFlags,this);


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
    update()
    {
        this.car.update();
    }
}


export default map;