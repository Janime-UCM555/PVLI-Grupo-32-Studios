import map from './Scenes/map.js';
import pause from './Scenes/PauseMenu.js';
import Dialog from './Scenes/DialogScene.js';
import MainMenu from './Scenes/MainMenu.js'
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,
	pixelArt: true,
	parent: 'game',
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene:[MainMenu, Dialog, map, pause],	// Decimos a Phaser cual es nuestra escena
	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 0}, 
			debug: true 
		} 
	},
};

new Phaser.Game(config);