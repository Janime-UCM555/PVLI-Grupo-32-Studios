class Button extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, text, callback)
    {
        super(scene,x,y);
        this.background = scene.add.rectangle(0, 0, 200, 50, 0x6666ff);
        this.background.setOrigin(0.5, 0.5);

        
        this.label = scene.add.text(0, 0, text, { fontSize: '24px', fill: '#FFF' });
        this.label.setOrigin(0.5, 0.5);

        // Agregar el fondo y el texto al contenedor
        this.add(this.background);
        this.add(this.label);

        // Hacer que el botón sea interactivo
        this.setSize(200, 50);
        this.setInteractive({ useHandCursor: true });

        // Agregar el evento del clic
        this.on('pointerdown', callback);
        this.on('pointerover', () => {
            this.background.setFillStyle(0x8888ff); // Efecto al pasar el ratón
        });
        this.on('pointerout', () => {
            this.background.setFillStyle(0x6666ff); // Vuelve al color original
        });

        // Agregar el botón a la escena
        scene.add.existing(this);
    }
}
export default Button;