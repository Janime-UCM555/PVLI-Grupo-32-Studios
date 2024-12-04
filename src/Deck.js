import Carta from "./Card.js";
export default class Mazo
{
    constructor(data,scene,callback){
        this.data = data;
        this.scene = scene;
        this.callback = (id)=>(callback(id));
        this.selectedCards = [];
        this.cardSelector();
        this.drawCards();
    }
    cardSelector(){
        let array = this.data.Deck;
        this.selectedCards = [];      
        let mix = Phaser.Utils.Array.Shuffle(array);
        this.selectedCards = mix.slice(0,3);
    }
    drawCards(){
        for(let i = 0; i< 3; ++i)
        {         
            let x = (i/3*this.scene.sys.game.canvas.width) + 10;
            let y = this.scene.sys.game.canvas.width / 2;    
            this.card = new Carta(this.scene,x,y,this.selectedCards[i],this.callback);
        }
    }
}

