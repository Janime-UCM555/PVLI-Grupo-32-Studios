class Bazar extends Phaser.Scene{
    constructor(){
        super({ key:'Bazar'});
    }

    preload()
    {
        this.load.image('Apu', '../assets/Apu.png');
    }
    create()
    {
        this.add.image(480,230,'Apu');
    }
    update()
    {
        
    }
}
export default Bazar;