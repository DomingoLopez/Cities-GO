class Casa extends THREE.Mesh {
	constructor() {
		/*
		var c = new Colores();
		var colorCasa = c.getRandomCasa();

		super(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ color: colorCasa }));
		this.colorReal = colorCasa;*/
	}

	getColorReal() {
		return this.colorReal;
	}
}
