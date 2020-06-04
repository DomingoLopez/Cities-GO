class Carretera extends THREE.Object3D {
	constructor() {
		super();
		var c = new Colores();
		var colorCarretera = c.getColorCarretera();
		this.colorReal = colorCarretera;
		this.meshArray = [];
		this.mesh_1 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.5, 5),
			new THREE.MeshBasicMaterial({ color: colorCarretera })
		);

		this.mesh_1.name = 'carretera';

		var ajusteY = 0.005;
		this.mesh_1.position.y = ajusteY;

		this.mesh_1.userData = this;
		this.add(this.mesh_1);
		this.meshArray.push(this.mesh_1);
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
