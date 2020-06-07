class Casa extends THREE.Mesh {
	constructor() {
		super();

		var shape = new THREE.Shape();
		shape.lineTo(1.8, 0);
		shape.lineTo(0, 1);
		shape.lineTo(-1.8, 0);
		var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		var extrudeSettings = {
			steps: 1,
			depth: 4,
			bevelEnabled: false
		};
		var geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);

		var tejado = new THREE.Mesh(geo, material);
		tejado.position.z = -2;
		tejado.position.y = 2;

		this.add(tejado);

		material = new THREE.MeshPhongMaterial({ color: 0xeeeeee });
		var caja = new THREE.Mesh(new THREE.BoxGeometry(3, 4, 3), material);
		this.add(caja);

		tejado.userData = this;
		caja.userData = this;

		tejado.castShadow = true;
		tejado.receiveShadow = true;
		caja.castShadow = true;
		caja.receiveShadow = true;

		this.meshArray = [];
		this.meshArray.push(tejado);
		this.meshArray.push(caja);
	}

	getMeshArray() {
		return this.meshArray;
	}
}
