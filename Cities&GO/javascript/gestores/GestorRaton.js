class GestorRaton {
	//Se encarga de mandar al gestor de acciones segun la accion realizada con el raton
	constructor(escena, gestorAcciones) {
		this.escena = escena;
		this.gestorAcciones = gestorAcciones;
	}

	onMouseClick(event) {
		var botonPulsado = event.which;
		//Si hacemos click, segun el estado en el que nos encontremos, indicaremos
		//al gestor de acciones lo que debe hacer
		if (botonPulsado == 1) {
			switch (this.escena.applicationMode) {
				case MyScene.ADDING_OBJECT:
					this.gestorAcciones.addObject(event);
					break;

				case MyScene.SELECTED_OBJECT:
					this.gestorAcciones.addObject(event);
					break;

				case MyScene.NO_ACTION:
					this.gestorAcciones.selectObject(event);
					break;
			}
		}
	}

	onMouseMove(event) {
		//Si movemos el raton, podemos estar a punto de añadir un objeto
		// o quizas estemos moviendo uno que ya estaba en el tablero
		switch (this.escena.applicationMode) {
			case MyScene.ADDING_OBJECT:
				this.gestorAcciones.choosingZone(event);
				break;

			case MyScene.SELECTED_OBJECT:
				this.gestorAcciones.choosingZone(event);
				break;

			case MyScene.NO_ACTION:
				this.gestorAcciones.reloadHelper();
				this.gestorAcciones.choosingObject(event);
				break;
		}
	}
}
