class Acera extends THREE.Object3D {
	constructor() {
		super();
		var c = new Colores();
		var colorAcera = c.getColorAcera();
		this.colorReal = colorAcera;
		this.meshArray = [];
		this.mesh_1 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.5, 5),
			new THREE.MeshPhongMaterial({ color: colorAcera })
		);

		var ajusteY = 0.25;
		this.mesh_1.position.y = ajusteY;
		this.mesh_1.name = 'acera';
		this.mesh_1.receiveShadow = true;

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
