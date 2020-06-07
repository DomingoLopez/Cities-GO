class CarreteraGiro extends THREE.Object3D {
	constructor() {
		super();

		this.meshArray = [];
		this.mesh_1 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshPhongMaterial({ color: 0x000000 })
		);

		this.acera_1 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 5),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		this.acera_2 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		this.acera_3 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		this.acera_3 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		this.acera_1.position.x = 2;
		this.acera_2.position.x = -2;
		this.acera_2.position.z = -2;
		this.acera_3.position.z = 2;

		this.mesh_1.name = 'carreteragiro';

		var ajusteY = 0.05;
		this.mesh_1.position.y = ajusteY;
		this.acera_1.position.y = 0.25;
		this.acera_2.position.y = 0.25;
		this.acera_3.position.y = 0.25;

		this.mesh_1.receiveShadow = true;
		this.acera_1.receiveShadow = true;
		this.acera_2.receiveShadow = true;
		this.acera_3.receiveShadow = true;

		this.acera_1.castShadow = true;
		this.acera_2.castShadow = true;
		this.acera_3.castShadow = true;

		this.mesh_1.userData = this;
		this.acera_1.userData = this;
		this.acera_2.userData = this;
		this.acera_3.userData = this;

		this.add(this.mesh_1);
		this.add(this.acera_1);
		this.add(this.acera_2);
		this.add(this.acera_3);

		this.meshArray.push(this.mesh_1);
		this.meshArray.push(this.acera_1);
		this.meshArray.push(this.acera_2);
		this.meshArray.push(this.acera_3);
	}

	getMeshArray() {
		return this.meshArray;
	}
}
