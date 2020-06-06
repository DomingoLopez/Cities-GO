class Arena extends THREE.Object3D {
	constructor() {
		super();
		var c = new Colores();
		var colorArena = c.getColorArena();
		this.colorReal = colorArena;
		this.meshArray = [];
		this.mesh_1 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshPhongMaterial({ color: colorArena })
		);

		var ajusteY = 0.05;
		this.mesh_1.position.y = ajusteY;
		this.mesh_1.name = 'arena';
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
