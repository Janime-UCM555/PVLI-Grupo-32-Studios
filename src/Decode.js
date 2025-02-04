import DialogText from "./dialog_plugin.js";
import Deck from "./Deck.js";
export default class Decoder{
    constructor(scene, datos, deck, sound, drawSound){
        this.scene = scene;
        this.datos = datos;
        this.deck = deck;
        this.sound = sound;
        this.drawSound = drawSound;
        console.log(drawSound);
        this.node  = this._findId(this.datos.RootNodeID);
        this.callback = (id)=>{
            var next = this.node.OptionsID[id];
            this.node = this._findId(next);
            this.scene.events.emit('next')
        }
    }

    _findId(idToLookFor) {
        var array = this.datos.ListNodes;
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
                    dialogSpeed: 4,
                    fontSize: 24,
                    fontFamily: "pixel",
                    fontColor: 'white'
                });
                this.dialog.setText(this.node.Sentence, true);
                break;
            case 'NodeChoice':
                this.scene.showSprite('');
                new Deck(this.deck,this.scene,this.callback,this.drawSound)
                break;
            case 'NodeEndPath':
                this.sound.stop();
                this.scene.events.off('next');
                this.scene.scene.stop();
                console.log("NEXT: " + this.node.NextStoryName );
                if(this.node.NextStoryName === "10" || this.node.NextStoryName === "11" || this.node.NextStoryName === "12")
                {
                    let newIndex = parseInt(this.node.NextStoryName) + 1;
                    this.scene.scene.start('Dialog',newIndex);
                }
                else if(this.node.NextStoryName === "-1"){
                    this.scene.sys.registry.set('karma',100);
                    this.scene.sys.registry.set('atropellados',0);
                    let cartas = this.scene.sys.game.registry.get('myCards');
                    if(cartas != null)
                    {
                        cartas.forEach((carta)=>{
                            carta.deleteCard();
                        })
                    }
                    this.scene.sys.game.registry.set('myCards',null);
                    this.scene.scene.start('MainMenu');
                }
                else
                {
                    this.scene.scene.start('map',{NextStoryName: this.node.NextStoryName});
                }
                
                break;
        }        
    }
}