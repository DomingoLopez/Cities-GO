class GestorModelos {
	constructor(nombre) {
		this.mesh;
		switch (nombre) {
			case 'cesped':
				this.mesh = new Cesped();
				this.mesh.name = 'cesped';

				var ajusteY = 0.25;
				this.mesh.position.y = ajusteY;
				break;

			case 'carretera':
				this.mesh = new Carretera();
				this.mesh.name = 'carretera';

				var ajusteY = 0.005;
				this.mesh.position.y = ajusteY;
				break;

			case 'agua':
				this.mesh = new Agua();
				this.mesh.name = 'agua';

				var ajusteY = 0.005;
				this.mesh.position.y = ajusteY;
				break;

			case 'casa':
				this.mesh = new Casa();
				this.mesh.name = 'casa';

				var ajusteY = 2.5;
				this.mesh.position.y = ajusteY;
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
				this.mesh.name = 'rascacielos';

				var ajusteY = 7.5;
				this.mesh.position.y = ajusteY;
				break;
		}
		this.mesh.material.transparency = true;
		this.mesh.material.opacity = 0.5;
	}

	getMesh() {
		return this.mesh;
	}

	getNombre() {
		return this.mesh.name;
	}

	getColor() {
		return this.mesh.color;
	}
}
