class Sol extends THREE.Object3D {
	constructor(gui) {
		super();

		//Creamos el sol, que se encarga de iluminar la escena
		this.conjuntoSol = new THREE.Object3D();

		var geomSol = new THREE.SphereGeometry(100, 50, 50);
		var matSol = new THREE.MeshPhongMaterial({ color: 0xdda600, emissive: 0xe9f795 });
		this.sol = new THREE.Mesh(geomSol, matSol);

		this.sol.position.set(-1, 0.75, -1);
		this.sol.position.multiplyScalar(1000);
		this.conjuntoSol.add(this.sol);

		this.luzSolar = new THREE.DirectionalLight(0xffffff, 0.5);
		this.luzSolar.position.set(-1, 0.75, -1);
		this.luzSolar.position.multiplyScalar(1000);
		this.luzSolar.name = 'luzSolar';

		this.conjuntoSol.add(this.luzSolar);

		this.luzSolar.castShadow = true;
		var d = 300;

		this.luzSolar.shadow.camera.left = -d;
		this.luzSolar.shadow.camera.right = d;
		this.luzSolar.shadow.camera.top = d;
		this.luzSolar.shadow.camera.bottom = -d;

		this.luzSolar.shadow.camera.far = 3500;
		this.luzSolar.shadow.bias = -0.0001;
		this.luzSolar.shadow.darkness = 0.35;

		this.add(this.conjuntoSol);

		this.createGUI(gui);
	}

	createGUI(gui) {
		this.guiControls = new function() {
			// En el contexto de una función   this   alude a la función
			this.diaNoche = false;
			this.luzSolarOnOff = true; //...
			this.velocidadDiaNoche = 0.001;
		}();

		// Se crea una sección para los controles de esta clase
		var folder = gui.addFolder('Sistema Día Noche');
		var that = this;

		// Se le añade un control para la intensidad de la luz
		folder.add(this.guiControls, 'luzSolarOnOff').name('Luz Solar: ');
		folder.add(this.guiControls, 'diaNoche').name('Dia y Noche: ');
		folder.add(this.guiControls, 'velocidadDiaNoche', 0, 0.01, 0.001).name('Velocidad: ');
	}

	update() {
		this.luzSolar.visible = this.guiControls.luzSolarOnOff;

		if (this.guiControls.luzSolarOnOff && this.guiControls.diaNoche) {
			this.rotation.z += this.guiControls.velocidadDiaNoche;
		}
	}
}
