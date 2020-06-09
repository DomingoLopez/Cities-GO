class AssignHelper extends THREE.Mesh {
	//Se movera con el objeto a insertar/mover e indicará si la casilla en la que se encuentra
	//está disponible para insertar el objeto o no
	constructor() {
		super(
			new THREE.CylinderGeometry(0.5, 0.5, 30, 32),
			new THREE.MeshBasicMaterial({ color: 0x58ce21, transparent: true, opacity: 0.4 })
		);
		this.position.y = 15;

		var color = new Colores();
		this.colorCorrecto = color.getColorCorrecto();
		this.colorError = color.getColorError();
		this.colorSeleccion = color.getColorSeleccion();
	}

	getColorCorrecto() {
		return this.colorCorrecto;
	}

	getColorError() {
		return this.colorError;
	}

	setColorCorrecto() {
		this.material.color = new THREE.Color(this.colorCorrecto);
	}

	setColorError() {
		this.material.color = new THREE.Color(this.colorError);
	}

	setColorSeleccion() {
		this.material.color = new THREE.Color(this.colorSeleccion);
	}
}
