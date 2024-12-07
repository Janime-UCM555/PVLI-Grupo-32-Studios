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
            new Peaton(scene, x, y, 'Abuelita', 5, "Abuelita Jojo", 80, "Señora con dos nietos encantadores aunque con poca vida por delante", 20),
            new Peaton(scene, x, y, 'Deportista', 2, "Sportacus", 30, "Joven deportista que da charlas en colegios sobre salud y bienestar", 35),
            new Peaton(scene, x, y, 'Chico',1, "Chico Percebe", 20, "Joven que ayuda a luchar contra el crimen y mantener la paz en la ciudad", 25),
            new Peaton(scene, x, y, 'Niño', 3, "Bart Simpson", 12, "Niño un poco travieso pero con un buen corazón que quiere a su familia más que a nada", 30),
            new Peaton(scene, x, y, 'Doctor', 4, "Doctor Mario", 40, "Estaba a punto de descubrir una cura contra una de las enfermedades más comunes del mundo", 30),
            new Peaton(scene, x, y, 'Villano', -4, "Rey Hielo", 60, "Villano que se disponía a cometer alguna fechoría", 25),
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
    
        return new Peaton(this.scene,this.x,this.y,this.ElecPeaton.texture,this.ElecPeaton.karma,this.ElecPeaton.name,this.ElecPeaton.edad, this.ElecPeaton.desc, this.ElecPeaton.speed);
        
    }

    generarPeaton()
    {
        let peaton = this.choosePeaton();       
        this.scene.add.existing(peaton);
        this.scene.physics.add.existing(peaton);
        let distance = 85;
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