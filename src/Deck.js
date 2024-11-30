import Carta from "./Card.js";
export default class Mazo
{
    constructor(data,scene,callback){
        this.data = data;
        this.scene = scene;
        this.callback = (id)=>(callback(id));
    }
    create(){
        this.cardSelector();
        this.drawCards();
    }
    cardSelector(){
        var array = this.data.Deck;
        this.selectedCards = [];      
        let mix = Phaser.Utils.Array.Shuffle(array);
        this.selectedCards = mix.slice(0,3);
    }
    drawCards(){
        for(let i = 0; i< 3; ++i){
            createFromData(this.scene, (i/3*this.sys.game.canvas.width) + 10, this.sys.game.canvas.width/2, this.selectedCards[i], this.callback)
        }
    }
}

