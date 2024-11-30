import DialogText from "./dialog_plugin.js";
import Deck from "./Deck.js";
export default class Decoder{
    constructor(scene, data, deck){
        this.scene = scene;
        this.data = data;
        this.deck = deck
        this.node  = this._findId(this.data.RootNodeID);
        this.callback = (id) = {}
    }

    _findId(idToLookFor) {
        var array = this.data.ListNodes;
        for (var i = 0; i < array.length; i++) {
            if (array[i].ID == idToLookFor) {
                return(array[i]);
            }
        }
    }
        
    decode(){
        this.node = this._findId(this.node.NextID);
        switch(this.node.$type){
            case 'NodeSentence':
                let color;
                if(this.node.SpeakerID == 0){
                    this.scene.showSprite('gato');
                    color = 0x1d7ba1;
                }
                else if(this.node.SpeakerID == 1){
                    this.scene.showSprite('melchor');
                    color = 0xba6e16;
                }
                else{
                    this.scene.showSprite('');
                    color = 0x808080;
                }
                this.dialog = new DialogText(this.scene, {
                    borderThickness: 4,
                    borderColor: color,
                    borderAlpha: 1,
                    windowAlpha: 0.6,
                    windowColor: color,
                    windowHeight: 100,
                    padding: 16,
                    closeBtnColor: 'white',
                    dialogSpeed: 3,
                    fontSize: 24,
                    fontFamily: "pixel",
                    fontColor: 'white'
                });
                this.dialog.setText(this.node.Sentence, true);
                break;
            case 'NodeChoice':
                //Aqui se crea el Deck y por tanto las cartas
                var cartas = new Deck(this.deck,this.scene,)
                // al hacer click
                break;
            case 'NodeEndPath':
                this.scene.events.off('next');
                this.scene.scene.start('map')
                break;
        }        
    }
                                    //Evento
    /*new Mazo(pathTojson, scene, (selectedCardId) => {
        
    })*/ // Construir mazo
}