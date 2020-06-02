class Camara extends THREE.Object3D {
	constructor() {
		super();

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		// También se indica dónde se coloca
		this.camera.position.set(0, 30, 70);

		this.add(this.camera);
	}

	getCamera() {
		return this.camera;
	}

	lookAt(vector) {
		this.camera.lookAt(vector);
	}

	//control
	onKeyDown(event) {
		var keyCode = event.which;
		var xSpeed = 1;
		var ySpeed = 1;
		var rotationSpeed = 0.025;

		switch (keyCode) {
			//w
			case 87:
				this.camera.position.z -= ySpeed;
				break;
			//s
			case 83:
				this.camera.position.z += ySpeed;
				break;
			//up
			case 38:
				this.rotation.x -= rotationSpeed;
				break;
			//down
			case 40:
				this.rotation.x += rotationSpeed;
				break;
			//izq
			case 37:
				this.rotation.y -= rotationSpeed;
				break;
			//der
			case 39:
				this.rotation.y += rotationSpeed;
				break;
			case 65:
				this.camera.position.x -= xSpeed;
				break;
			case 68:
				this.camera.position.x += xSpeed;
				break;
			case 90:
				this.camera.position.y += ySpeed;
				break;
			case 88:
				this.camera.position.y -= ySpeed;
				break;
			//Espacio
			case 32:
				this.camera.position.set(0, 30, 70);
				break;
		}
	}
}
