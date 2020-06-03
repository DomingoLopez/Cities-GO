class Cesped extends THREE.Mesh {
	constructor() {
		var c = new Colores();
		var colorCesped = c.getColorCesped();

		super(new THREE.BoxGeometry(5, 0.5, 5), new THREE.MeshBasicMaterial({ color: colorCesped }));
		this.colorReal = colorCesped;
	}

	getColorReal() {
		return this.colorReal;
	}
}
