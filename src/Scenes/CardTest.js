import Carta from '../Card.js'
import Mazo from '../Deck.js'
class CardTest extends Phaser.Scene{
    constructor(){
        super({ key:'CardTest'});
    }

    preload()
    {
        this.load.json('data1','../data/Cartas.json');
        this.load.image('imageID', '../assets/403.png');
    } 
    create()
    {
        this.data = this.cache.json.get('data1');
        this.sys.game.registry.set('karma',200);
        this.mazo = new Mazo(this.data,this,() => {})
    }
    update()
    {
        
    }
}
export default CardTest;