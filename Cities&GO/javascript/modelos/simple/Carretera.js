class Carretera extends ObjetoSimple {
	constructor() {
		super();

		var carretera = new THREE.Mesh(
			new THREE.BoxGeometry(3, 0.1, 5),
			new THREE.MeshPhongMaterial({ color: 0x000000 })
		);

		var acera_1 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 5),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		var acera_2 = new THREE.Mesh(
			new THREE.BoxGeometry(1, 0.5, 5),
			new THREE.MeshPhongMaterial({ color: 0x777777 })
		);

		acera_1.position.x = 2;
		acera_2.position.x = -2;

		this.name = 'carretera';

		var ajusteY = 0.05;
		carretera.position.y = ajusteY;
		acera_1.position.y = 0.25;
		acera_2.position.y = 0.25;

		carretera.receiveShadow = true;
		acera_1.receiveShadow = true;
		acera_2.receiveShadow = true;

		acera_1.castShadow = true;
		acera_2.castShadow = true;

		carretera.userData = this;
		acera_1.userData = this;
		acera_2.userData = this;

		this.add(carretera);
		this.add(acera_1);
		this.add(acera_2);

		this.meshArray.push(carretera);
		this.meshArray.push(acera_1);
		this.meshArray.push(acera_2);
	}
}
