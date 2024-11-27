import Carta from "./Card.js";
export default class Mazo
{
    constructor(data,scene){
        super({key: 'Mazo'});
        this.data = data;
        this.scene = scene;
        //this.onOptionSelected = (id) => {} // esto nos llega de fuera
    }
    createCarta(){

        creaFromData(this.data,this.scene)  
    }
    cardSelector(){
        var array = this.data.Deck;
        let selectedCards = [];       
        const mix = Phaser.Utils.Array.Shuffle(array);
        selectedCards = mix.slice(0,3);
        
    }
    drawCards(selectedCards){
        var newArray;
        for(let i = 0; i< 3; ++i){
            newArray [i] =  new Carta(this.scene,selectedCards[i],(i/3*800), 600/2)
        }
    }
}

