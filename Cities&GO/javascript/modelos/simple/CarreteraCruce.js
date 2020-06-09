class CarreteraCruce extends ObjetoSimple {
	constructor() {
		super();

		var carretera = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshPhongMaterial({ color: 0x000000 })
		);

		var acera_1 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		var acera_2 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		var acera_3 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		var acera_4 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 1),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		this.name = 'carreteracruce';

		var ajusteY = 0.05;
		carretera.position.y = ajusteY;
		acera_1.position.y = 0.25;
		acera_2.position.y = 0.25;
		acera_3.position.y = 0.25;
		acera_4.position.y = 0.25;

		carretera.receiveShadow = true;

		acera_1.receiveShadow = true;
		acera_1.castShadow = true;

		acera_2.receiveShadow = true;
		acera_2.castShadow = true;

		acera_3.receiveShadow = true;
		acera_3.castShadow = true;

		acera_4.receiveShadow = true;
		acera_4.castShadow = true;

		carretera.userData = this;
		acera_1.userData = this;
		acera_2.userData = this;
		acera_3.userData = this;
		acera_4.userData = this;

		this.add(carretera);
		this.meshArray.push(carretera);

		acera_1.position.x = 2;
		acera_1.position.z = 2;
		this.add(acera_1);
		this.meshArray.push(acera_1);

		acera_2.position.x = -2;
		acera_2.position.z = -2;
		this.add(acera_2);
		this.meshArray.push(acera_2);

		acera_3.position.x = -2;
		acera_3.position.z = 2;
		this.add(acera_3);
		this.meshArray.push(acera_3);

		acera_4.position.x = 2;
		acera_4.position.z = -2;
		this.add(acera_4);
		this.meshArray.push(acera_4);
	}
}
