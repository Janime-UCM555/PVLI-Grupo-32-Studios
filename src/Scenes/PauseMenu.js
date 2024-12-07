import Button from '../gameObjects/Button.js';
import Barrita from '../gameObjects/Barrita.js';
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

        this.continueButton = new Button(this, this.cameras.main.width/2, 200, 'CONTINUAR', () =>{
            this.scene.stop();
            this.scene.resume(this.activeSceneKey);
        });
        this.settingsButton = new Button(this, this.cameras.main.width/2, 300, 'AJUSTES', () => {
            this.hideButtons();
            this.showVolumeSlider();
        });
        this.statButton = new Button(this, this.cameras.main.width/2, 400, 'ESTADÍSTICAS', () => {
            this.hideButtons();
            this.showStats();
        });
        this.cartas = new Button(this, this.cameras.main.width/2, 500, 'CARTAS ELEGIDAS', () => {
            this.hideButtons();
            this.showCards();
        });
        this.KarmaBar = new Barrita(this, 230, 220,0xFF0000 , 0x555555, 0, 100);
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
        let auxCards = this.sys.game.registry.get('myCards');
        console.log(auxCards);
        var startX = 200;
        var startY = 200;
        if(!Array.isArray(auxCards))
            {
            auxCards = [];
        }
        else
        {
            auxCards.forEach(element => {
                this.add.existing(element);
                element.setPosition(startX,startY);
                element.setVisible(true);
                startX += 50;
            });
          
        }            
        this.returnCardButton = new Button(this, this.cameras.main.width / 2, 430, 'CERRAR', () => {
            auxCards.forEach(element => {
                element.setVisible(false);
            });
            this.returnCardButton.setVisible(false);
            this.showButtons();
        });
    }
    hideButtons()
    {
        this.continueButton.setVisible(false);
        this.settingsButton.setVisible(false);
        this.statButton.setVisible(false);
        this.cartas.setVisible(false);
    }
    showButtons()
    {
        this.continueButton.setVisible(true);
        this.settingsButton.setVisible(true);
        this.statButton.setVisible(true);
        this.cartas.setVisible(true);
    }
    showVolumeSlider()
    {
        const width = 200;
        const length = 10;

        
    }
}
export default PauseMenu;