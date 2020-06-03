class Carretera extends THREE.Mesh {
	constructor() {
		var c = new Colores();
		var colorCarretera = c.getColorCarretera();

		super(new THREE.BoxGeometry(5, 0.1, 5), new THREE.MeshBasicMaterial({ color: colorCarretera }));
		this.colorReal = colorCarretera;
	}

	getColorReal() {
		return this.colorReal;
	}
}
