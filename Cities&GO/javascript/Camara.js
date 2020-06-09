class Camara extends THREE.Object3D {
	constructor(renderer) {
		super();

		//Camara Perspectiva

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
		// También se indica dónde se coloca
		this.camera.position.set(0, 50, 150);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.add(this.camera);

		//Controles para la cámara en perspectiva usando OrbitControls

	
		// Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
		this.cameraControl = new THREE.OrbitControls(this.camera, renderer.domElement);
		//Configuración de los controles de órbita
		this.cameraControl.minPolarAngle = 0;
		this.cameraControl.maxPolarAngle = Math.PI / 2.1; //El .1 es para que no toque el suelo del todo
		this.cameraControl.maxDistance = 500;
		this.cameraControl.saveState();
		this.cameraControl.update();
	

	

	
	}


	resetPosicion(){
		this.cameraControl.reset();
	}


	getCamera(){
		return this.camera;
	}


}
