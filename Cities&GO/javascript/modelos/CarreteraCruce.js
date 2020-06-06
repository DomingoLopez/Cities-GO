class CarreteraCruce extends THREE.Object3D {
	constructor() {
		super();

		this.meshArray = [];
		this.mesh_1 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshPhongMaterial({ color: 0x000000 })
		);

		this.acera1 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);
		this.acera2 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);
		this.acera3 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);
		this.acera4 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		this.mesh_1.name = 'carreteracruce';

		var ajusteY = 0.05;
		this.mesh_1.position.y = ajusteY;
		this.acera1.position.y = 0.25;
		this.acera2.position.y = 0.25;
		this.acera3.position.y = 0.25;
		this.acera4.position.y = 0.25;

		this.mesh_1.receiveShadow = true;

		this.acera1.receiveShadow = true;
		this.acera1.castShadow = true;

		this.acera2.receiveShadow = true;
		this.acera2.castShadow = true;

		this.acera3.receiveShadow = true;
		this.acera3.castShadow = true;

		this.acera4.receiveShadow = true;
		this.acera4.castShadow = true;

		this.mesh_1.userData = this;
		this.acera1.userData = this;
		this.acera2.userData = this;
		this.acera3.userData = this;
		this.acera4.userData = this;

		this.add(this.mesh_1);
		this.meshArray.push(this.mesh_1);

		this.acera1.position.x = 2;
		this.acera1.position.z = 2;
		this.add(this.acera1);
		this.meshArray.push(this.acera1);

		this.acera2.position.x = -2;
		this.acera2.position.z = -2;
		this.add(this.acera2);
		this.meshArray.push(this.acera2);

		this.acera3.position.x = -2;
		this.acera3.position.z = 2;
		this.add(this.acera3);
		this.meshArray.push(this.acera3);

		this.acera4.position.x = 2;
		this.acera4.position.z = -2;
		this.add(this.acera4);
		this.meshArray.push(this.acera4);
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
