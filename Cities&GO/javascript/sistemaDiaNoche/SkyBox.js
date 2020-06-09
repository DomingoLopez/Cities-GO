class SkyBox extends THREE.Object3D {
	//Se encarga de mostrar el cielo
	constructor() {
		super();
		this.geomSkyBox = new THREE.SphereGeometry(5000, 50, 50);
		var loader = new THREE.TextureLoader();
		var textura = loader.load('../imgs/Skybox3.jpg');
		this.skybox = new THREE.Mesh(
			this.geomSkyBox,
			new THREE.MeshPhongMaterial({ map: textura, side: THREE.DoubleSide })
		);

		this.add(this.skybox);
	}

	update() {}
}
