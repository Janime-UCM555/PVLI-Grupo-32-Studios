import Peaton from '../gameObjects/Peaton.js';
class Semaforo extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,dirX, dirY,customDelay)
    {
        super(scene, x, y, 'semaforo_verde');
        this.estadoSemaforo = 'verde';
        this.setScale(0.05);
        this.sprite = scene.add.existing(this);
        this.peatones = [
            new Peaton(scene, x, y, 'Abuelita', 5, "Abuelita Jojo", 80, 25),
            new Peaton(scene, x, y, 'Deportista', 2, "Sportacus", 30, 100),
            new Peaton(scene, x, y, 'Chico', 1, "Chico Percebe", 20, 35)
        ];
        this.dirX = dirX;
        this.dirY = dirY;
        this.delay = customDelay
        scene.time.addEvent({
            delay: this.delay,
            loop: true,
            callback: this.cambiarSemaforo,
            callbackScope: this
        });   
    }
    cambiarSemaforo()
    {
        if(this.estadoSemaforo == 'rojo')
        {
            this.sprite.setTexture('semaforo_verde');
            this.estadoSemaforo = 'verde';
        }
        else
        {
            this.sprite.setTexture('semaforo_rojo');
            this.estadoSemaforo = 'rojo';
            this.generarPeaton();
        }
    }
    choosePeaton()
    {
        let random = Phaser.Math.Between(0,this.peatones.length-1);

        this.ElecPeaton = this.peatones[random];
    
        return new Peaton(this.scene,this.x,this.y,this.ElecPeaton.texture,this.ElecPeaton.karma,this.ElecPeaton.name,this.ElecPeaton.edad,this.ElecPeaton.speed);
        
    }

    generarPeaton()
    {
        let peaton = this.choosePeaton();       
        this.scene.add.existing(peaton);
        this.scene.physics.add.existing(peaton);
        let distance = 100;
        let vel = peaton.speed ;
        
        this.scene.tweens.add(
            {
                targets: peaton,
                x:this.x + distance * this.dirX,
                y:this.y + distance * this.dirY,
                duration: distance/vel * 1000,
                onComplete: () => {
                    peaton.destroy();
                }
            }
        );
        this.scene.physics.add.collider(peaton, this.scene.car, () => {
            this.scene.choque(peaton);
        }, null, this);
    }

}
export default Semaforo;