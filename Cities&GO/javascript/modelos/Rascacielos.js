class Rascacielos extends THREE.Mesh {
	constructor() {
		var c = new Colores();
		var colorRascacielos = c.getRandomRasca();

		super(new THREE.BoxGeometry(5, 15, 5), new THREE.MeshBasicMaterial({ color: colorRascacielos }));
		this.colorReal = colorRascacielos;
	}

	getColorReal() {
		return this.colorReal;
	}
}
