class Camara extends THREE.Object3D {
	constructor() {
		super();

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set(0, 20, 100);

		this.add(this.camera);
	}

	getCamera() {
		return this.camera;
	}

	lookAt(vector) {
		this.camera.lookAt(vector);
	}

	
}
