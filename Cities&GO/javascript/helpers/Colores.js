class Colores {
	//Esta clase contiene colores para asignar a los modelos, para que sea
	//mas localizable y rapido de cambiar en caso de querer realizar un cambio
	//de paleta por ejemplo
	constructor() {

	}

	getColorCorrecto() {
		return 0x58ce21;
	}

	getColorError() {
		return 0xce2121;
	}

	getColorSeleccion() {
		return 0x2194ce;
	}

	getColorCesped() {
		return 0x07ad62;
	}

	getColorAgua() {
		return 0x2379fe;
	}

	getColorCarretera() {
		return 0x000000;
	}

	getColorArena() {
		return 0xfff755;
	}

	getColorAcera() {
		return 0x777777;
	}

	getColorCasa() {
		//var random = Math.floor(Math.random() * colores_casa.length);
		return 0xff4b43;
	}

	getColorRasca() {
		return 0x18436d;
	}

	getColorObjeto(objeto) {
		var nuevo_color;
		switch (objeto.name) {
			case 'casa':
				nuevo_color = new THREE.Color(this.getColorCasa());
				break;
			case 'cesped':
				nuevo_color = new THREE.Color(this.getColorCesped());
				break;
			case 'agua':
				nuevo_color = new THREE.Color(this.getColorAgua());
				break;
			case 'carretera':
				nuevo_color = new THREE.Color(this.getColorCarretera());
				break;
			case 'rascacielos':
				nuevo_color = new THREE.Color(this.getColorRasca());
				break;
		}
		return nuevo_color;
	}


	cambiaColor(object3D){

		//Si está definido el método changeColor del objetc3D
		if(typeof object3D.changeColor === 'function'){
			
			return object3D.changeColor();

		}

	}
}
