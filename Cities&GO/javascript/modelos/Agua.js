class Agua extends THREE.Object3D {
	constructor() {
		super();
		var c = new Colores();
		var colorAgua = c.getColorAgua();
		this.colorReal = colorAgua;
		/*
		water = new THREE.Water(renderer, camera, scene, {
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: waterNormals,
			alpha: 1.0,
			sunDirection: light.position.clone().normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 50.0
		});*/

		var loader = new THREE.TextureLoader();
		var textura = loader.load('../imgs/agua2.jpg');

		this.meshArray = [];
		this.mesh_1 = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshPhongMaterial({ map: textura, color: 0xffffff })
		);

		var ajusteY = 0.05;
		this.mesh_1.position.y = ajusteY;
		this.mesh_1.name = 'Agua';

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
