export default class Mazo
{
    constructor(data,scene){
        super({key: 'Mazo'});
        this.data = data;
        this.scene = scene;
        this.onOptionSelected = (id) => {} // esto nos llega de fuera
    }
    preload(){
        this.load.json('data','./data/Cartas.json');
        
    }
    createCarta(){
        creaFromData(this.data,this.scene)  
    }
    // create: pintar cartas desde json
    // create desde json (cartas)
    // llama a la static de card con cada elemento del array
}
                                //Evento
new Mazo(pathTojson, scene, (selectedCardId) => {
    
})
