import Button from '../gameObjects/Button.js';
class MainMenu extends Phaser.Scene{
    constructor()
    {
        super({key: 'MainMenu'});
    }
    init() {


    }
    create()
    {
        this.startButton = new Button(this, this.cameras.main.width/2, 250, 'INICIAR', () =>{
            this.scene.stop();
            this.scene.launch('Dialog');
        },0x572364, 0xf1d7ff);

        this.cardsButton = new Button(this, this.cameras.main.width/2, 350, 'CARTAS', () =>{


        },0x572364,0xf1d7ff);

        this.creditsButton = new Button(this, this.cameras.main.width/2, 450, 'CRÉDITOS', () =>{

            this.hideButtons();
            this.showCredits();
        },0x572364,0xf1d7ff);
    }
    showCredits() {

        this.hideButtons();
        let credits = [
            this.JavierText = this.add.text(this.cameras.main.width / 2, 250, 'JAVIER GÓMEZ ZÚÑIGA' , {
                fontSize: '22px',
                fill: '#FFF'
            }).setOrigin(0.5),
            this.MichelText = this.add.text(this.cameras.main.width / 2, 300, 'MICHEL HERRAIZ GURILLO' , {
                fontSize: '22px',
                fill: '#FFF'
            }).setOrigin(0.5),
            
            this.JaimeText = this.add.text(this.cameras.main.width / 2, 350, 'JAIME NIETO MÉNDEZ' , {
                fontSize: '22px',
                fill: '#FFF'
            }).setOrigin(0.5),
            
            this.IsmaText = this.add.text(this.cameras.main.width / 2, 400, 'ISMAEL ORTEGA SÁNCHEZ' , {
                fontSize: '22px',
                fill: '#FFF'
            }).setOrigin(0.5),

        ];
        
        this.returnCreditButtons = new Button(this, this.cameras.main.width / 2, 450, 'CERRAR', () => {
            credits.forEach(element => element.setVisible(false));
            this.returnCreditButtons.setVisible(false);
            this.showButtons();
        });
    }
    hideButtons()
    {
        this.startButton.setVisible(false);
        this.cardsButton.setVisible(false);
        this.creditsButton.setVisible(false);
    }
    showButtons()
    {
        this.startButton.setVisible(true);
        this.cardsButton.setVisible(true);
        this.creditsButton.setVisible(true);
    }
}
export default MainMenu;