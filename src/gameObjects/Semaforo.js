import Peaton from '../gameObjects/Peaton.js';
class Semaforo extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y)
    {
        super(scene, x, y, 'semaforo_verde');
        this.estadoSemaforo = 'verde';
        this.setScale(0.1);
        this.sprite = scene.add.existing(this);

        scene.time.addEvent({
            delay: 5000,
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

    generarPeaton()
    {
        console.log(this);
        let peaton = new Peaton(this.scene,this.x,this.y,'Abuelita', 20, "Abuelita Jojo", 80, 25);
        this.p
        let distance = 200;
        let vel = peaton.speed;
        
        this.scene.tweens.add(
            {
                targets: peaton,
                x:this.x + distance,
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