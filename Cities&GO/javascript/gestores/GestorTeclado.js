class GestorTeclado {
	//Se encarga de mandar al gestor de acciones segun la tecla pulsada
	constructor(gestorAcciones) {
		this.gestorAcciones = gestorAcciones;
	}

	//Al pulsar una tecla
	onKeyDown(event) {
		var keyCode = event.which;

		switch (keyCode) {
			//SUPRIMIR
			case 46:
				this.gestorAcciones.deleteOBJ();
				break;

			//ESC
			case 27:
				this.gestorAcciones.cancelAction();
				break;

			//Z, Pero se lanza cundo está el Ctrl pulsado tb
			case 90:
				if (event.ctrlKey) {
					//Si tenemos pulsado la tecla Ctrl + Z, debemos revertir la acción anterior
					this.gestorAcciones.unDoAction();
				}
				break;

			//X
			case 88:
				if (event.ctrlKey) {
					//Si tenemos pulsado la tecla Ctrl + X, debemos revertir la acción anterior
					this.gestorAcciones.reDoAction();
				}
				break;

			//R
			case 82:
				this.gestorAcciones.rotateOBJ();
				break;
		}
	}
}
