class GestorModelos {
	constructor(nombre) {
		//OJO. Aunque se llame mesh, this.mesh es un OBJECT3D
		this.mesh;
		switch (nombre) {
			case 'cesped':
				this.mesh = new Cesped();
				break;

			case 'carretera':
				this.mesh = new Carretera();
				break;

			case 'agua':
				this.mesh = new Agua();
				this.mesh.name = 'agua';

				var ajusteY = 0.005;
				this.mesh.position.y = ajusteY;
				break;

			case 'casa':
				this.mesh = new CasaBasica();
				this.mesh.name = 'casa';

				break;

			/*case 'bloque-pisos':
				this.mesh = new THREE.BoxGeometry(5, 10, 5);
				this.mesh.name = 'rascacielos';
				var ajusteY = 5;
				this.mesh.position.y = ajusteY;
				break;
*/
			case 'rascacielos':
				this.mesh = new Rascacielos();
				break;

			case 'pinos':
				this.mesh = new Pinos();
				break;

			case 'arboles':
				this.mesh = new Arboles();
				break;

			case 'acera':
				this.mesh = new Acera();
				break;

			case 'farola':
				this.mesh = new AceraFarola();
				break;

			case 'giro':
				this.mesh = new CarreteraGiro();
				break;

			case 'cruce':
				this.mesh = new CarreteraCruce();
				break;

			case 'arena':
				this.mesh = new Arena();
				break;
		}

		//	this.mesh.material.transparency = true;
		//		this.mesh.material.opacity = 0.5;
	}

	getObject3D() {
		return this.mesh;
	}

	getMeshArray() {
		return this.getMeshArray();
	}

	getNombre() {
		return this.mesh.name;
	}

	getColor() {
		return this.mesh.color;
	}
}
