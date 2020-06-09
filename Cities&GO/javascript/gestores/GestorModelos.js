class GestorModelos {
	//Se encarga de construir el modelo correspondiente indicado por el usuario
	constructor(nombre) {
		switch (nombre) {
			case 'cesped':
				this.object = new Cesped();
				break;

			case 'carretera':
				this.object = new Carretera();
				break;

			case 'agua':
				this.object = new Agua();
				break;

			case 'casa':
				this.object = new CasaBasica();
				break;

			case 'rascacielos':
				this.object = new Rascacielos();
				break;

			case 'pinos':
				this.object = new Pinos();
				break;

			case 'arboles':
				this.object = new Arboles();
				break;

			case 'acera':
				this.object = new Acera();
				break;

			case 'farola':
				this.object = new AceraFarola();
				break;

			case 'giro':
				this.object = new CarreteraGiro();
				break;

			case 'cruce':
				this.object = new CarreteraCruce();
				break;

			case 'arena':
				this.object = new Arena();
				break;
		}
	}

	getObject3D() {
		return this.object;
	}

	getMeshArray() {
		return this.getMeshArray();
	}

	getNombre() {
		return this.object.name;
	}
}
