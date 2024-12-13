class Barrita extends Phaser.GameObjects.Container {
    constructor(scene, x, y, color, bgColor, actVal, totVal) {
        super(scene, x, y);

        this.actVal = actVal;
        this.totVal = totVal;

        this.graphics = this.scene.add.graphics();
        this.add(this.graphics); 

        this.barColor = color;
        this.bgColor = bgColor;

        this.width = 350;
        this.height = 35;

        scene.add.existing(this);
        this.DrawBar();

    
    }

    RefreshBar(newQuantity) {
        this.actVal = Phaser.Math.Clamp(newQuantity, 0, this.totVal); 
        this.DrawBar();
    }

    DrawBar() {
        this.graphics.clear(); // Limpiar los gráficos anteriores

        // Dibujar el fondo de la barra
        this.graphics.fillStyle(this.bgColor, 1);
        this.graphics.fillRect(0, 0, this.width, this.height); // Posición relativa al contenedor

        // Calcular el ancho de la barra según el progreso
        let anchoBarra = (this.actVal / this.totVal) * this.width;

        // Dibujar la barra de progreso
        this.graphics.fillStyle(this.barColor, 1);
        this.graphics.fillRect(0, 0, anchoBarra, this.height); // Posición relativa al contenedor
    }
}

export default Barrita;