import DialogText from "./dialog_plugin.js";
export default class Decoder{
    constructor(scene, data){
        this.scene = scene;
        this.data = data;
        this.node  = this._findId(this.data.RootNodeID);
        this.karma = this.data.Variables[0].Value;
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
                this.dialog = new DialogText(this.scene, {
                    borderThickness: 4,
                    borderColor: 0x66d4ed,
                    borderAlpha: 1,
                    windowAlpha: 0.6,
                    windowColor: 0x66d4ed,
                    windowHeight: 150,
                    padding: 32,
                    closeBtnColor: 'white',
                    dialogSpeed: 3,
                    fontSize: 24,
                    fontFamily: "pixel"
                });
                this.dialog.setText(this.node.Sentence, true);
                break;
            case 'NodeChoice':
                    break;
            case 'NodeEndPath':
                this.scene.scene.start('map')
                break;
        }        
    }
}