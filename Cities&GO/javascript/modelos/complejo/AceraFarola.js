class AceraFarola extends ObjetoComplejo {
	constructor() {
		super();

		var acera = new Acera();
		this.add(acera);
		this.meshArray.push(acera);

		var farola = new Farola();
		farola.position.z = -1;
		farola.scale.set(0.8, 0.8, 0.8);

		this.add(farola);
		this.meshArray.push(farola);

		//Creamos la luz aqui para poder mandar target al suelo
		var light = new THREE.SpotLight(0xeffe00, 4, 7);
		light.position.set(0, 3.2, 0.6);
		light.target = acera;
		light.penumbra = 0.1;
		light.decay = 2;
		this.add(light);
	}
}
