class GestorModelos {
	constructor(nombre) {
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

				this.mesh.scale.x = 1.5;
				this.mesh.scale.y = 1.5;
				this.mesh.scale.z = 1.5;

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
		}
		//	this.mesh.material.transparency = true;
		//		this.mesh.material.opacity = 0.5;
	}

	getMesh() {
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
