import Carta from "./Card.js";
export default class Mazo
{
    constructor(datos,scene,callback, sound){
        this.datos = datos;
        this.scene = scene;
        console.log(sound);
        this.callback = (id)=>{
            this.deleteDeck();
            callback(id);
        };
        this.selectedCards = [];
        this.cardSelector();
        this.sound = sound;
        this.drawCards(this.sound);
    }
    cardSelector(){
        let array = this.datos.Deck;     
        let mix = Phaser.Utils.Array.Shuffle(array);
        this.selectedCards = mix.slice(0,3);
    }
    drawCards(sound){
        console.log(sound);
        this.cardsArr = [];
        for(let i = 0; i< 3; ++i)
        {         
            let x = (i/3*this.scene.sys.game.canvas.width) + 134;
            console.log(x);
            let y = this.scene.sys.game.canvas.height / 2;    
            var card = new Carta(this.scene,x,y,this.selectedCards[i],this.callback, sound);         
            this.cardsArr.push(card);
            this.scene.add.existing(card);
        }
    }
    deleteDeck(){
        for(let i = 0; i < this.cardsArr.length; i++){
            this.cardsArr[i].deleteCard();
        }
    }
}

