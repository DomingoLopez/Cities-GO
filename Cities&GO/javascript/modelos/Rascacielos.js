class Rascacielos extends THREE.Object3D {
	constructor() {
		super();
		this.nombre = 'rascacielos';
		this.meshArray = [];
		/*this.mesh_1 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 15, 5),
			new THREE.MeshBasicMaterial({ color: colorRascacielos })
		);

		var ajusteY = 7.5;
		this.mesh_1.position.y = ajusteY;
		this.mesh_1.name = 'rascacielos';

		this.mesh_1.userData = this;
		this.add(this.mesh_1);
		this.meshArray.push(this.mesh_1);*/

		this.generarRascacielos();
	}

	generarRascacielos() {
		var random = Math.floor(Math.random() * 3) * 2 + 12;
		var c = new Colores();
		this.colorRascacielos = c.getRandomRasca();
		for (var i = 0; i < random; i++) {
			var col = this.colorRascacielos;
			var geo = 5;
			if (i % 2 === 0) {
				geo = 4.5;
				col = 0x777777;
			}

			this.meshArray[i] = new THREE.Mesh(
				new THREE.BoxGeometry(geo, 1, geo),
				new THREE.MeshPhongMaterial({ color: col })
			);

			var ajusteY = i + 0.5;
			this.meshArray[i].position.y = ajusteY;
			this.meshArray[i].name = this.nombre;
			this.meshArray[i].userData = this;
			this.add(this.meshArray[i]);
		}
	}

	getMeshBase() {
		return this.meshArray[0];
	}

	getMeshArray() {
		return this.meshArray;
	}

	getColorReal() {
		return this.colorReal;
	}
}
