class Cesped extends THREE.Object3D {
	constructor() {
		super();
		var c = new Colores();
		var colorCesped = c.getColorCesped();
		this.colorReal = colorCesped;
		this.meshArray = [];
		this.mesh_1 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshBasicMaterial({ color: colorCesped })
		);

		var ajusteY = 0.05;
		this.mesh_1.position.y = ajusteY;
		this.mesh_1.name = 'cesped';

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
