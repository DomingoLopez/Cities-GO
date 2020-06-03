class Agua extends THREE.Mesh {
	constructor() {
		var c = new Colores();
		var colorAgua = c.getColorAgua();

		super(new THREE.BoxGeometry(5, 0.1, 5), new THREE.MeshBasicMaterial({ color: colorAgua }));
		this.colorReal = colorAgua;
	}

	getColorReal() {
		return this.colorReal;
	}
}
