import Button from '../gameObjects/Button.js';
import Barrita from '../gameObjects/Barrita.js';
import Carta from '../Card.js'
class PauseMenu extends Phaser.Scene{
    constructor()
    {
        super({key: 'PauseMenu'});
    }
    init(data) {
        // Guardar la escena activa previamente
        this.activeSceneKey = data.activeSceneKey; // Asumimos que se pasa el nombre de la escena activa
        
    }
    create()
    {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.7); 
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        this.add.text(this.cameras.main.width/2,50,'PAUSA',{fontSize: '32px', fill: '#FFF'}).setOrigin(0.5, 0);;
        this.auxCards = []

        this.continueButton = new Button(this, this.cameras.main.width/2, 250, 'CONTINUAR', () =>{
            this.scene.stop();
            this.scene.resume(this.activeSceneKey);
        });

        this.statButton = new Button(this, this.cameras.main.width/2, 350, 'ESTADÍSTICAS', () => {
            this.hideButtons();
            this.showStats();
        });
        this.cartas = new Button(this, this.cameras.main.width/2, 450, 'MIS CARTAS', () => {
            this.hideButtons();
            this.showCards();
        });
        this.KarmaBar = new Barrita(this, this.sys.game.canvas.width/2 - 200, 220,0xFF0000 , 0x555555, 0, 200);
        this.KarmaBar.setVisible(false);
    }
    showStats() {

        let cont =  this.sys.game.registry.get('atropellados');
        const KarmaText = this.add.text(this.cameras.main.width/2,150,'KARMA',{fontSize: '26px', fill: '#FFF'}).setOrigin(0.5, 0);;
        this.KarmaBar.RefreshBar( this.sys.game.registry.get('karma'));
        this.KarmaBar.setVisible(true);
        this.statsText = this.add.text(this.cameras.main.width / 2, 350, 'Peatones atropellados: ' + cont , {
            fontSize: '18px',
            fill: '#FFF'
        }).setOrigin(0.5);
        this.returnStatButton = new Button(this, this.cameras.main.width / 2, 430, 'CERRAR', () => {
            this.statsText.destroy(); 
            KarmaText.destroy();
            this.KarmaBar.setVisible(false);
            this.showButtons();
            this.returnStatButton.setVisible(false);
        });
    }
    showCards()
    {
        let cartas = this.sys.game.registry.get('myCards');
        var startX = 150;
        var startY = 250;

        if(cartas != null)
        {
            let cont = 0;
            cartas.forEach(element => {
                
                if(cont >= 4)
                {
                startY += 250;
                startX = 150;
                cont = 0;
                }
                let c = new Carta(this,startX,startY, element.getDatos());
                this.auxCards.push(c);
                this.add.existing(c);
                c.setVisible(true);
                startX += 220;
                cont++;
            });
                
        }
        else
        {
            this.noCardText = this.add.text( 300,  this.cameras.main.height / 2,"NO HAS CONSEGUIDO NINGUNA CARTA",{
                fontSize: "20px"
            })
        }
        this.returnCardButton = new Button(this, this.cameras.main.width / 2, 590, 'CERRAR', () => {
            if(this.auxCards != null)
            {
                this.auxCards.forEach((carta)=>{
                    carta.deleteCard();
                })
            }
            this.returnCardButton.setVisible(false);
            if(this.noCardText != null){
                this.noCardText.destroy();
            }
            this.showButtons();
        });
    }
    hideButtons()
    {
        this.continueButton.setVisible(false);
        this.statButton.setVisible(false);
        this.cartas.setVisible(false);
    }
    showButtons()
    {
        this.continueButton.setVisible(true);
        this.statButton.setVisible(true);
        this.cartas.setVisible(true);
    }
}
export default PauseMenu;