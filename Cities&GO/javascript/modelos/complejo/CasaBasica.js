class CasaBasica extends ObjetoComplejo {
	constructor() {
		super();

		var cesped = new Cesped();
		var casa = new Casa();
		this.add(cesped);
		this.add(casa);

		this.meshArray.push(cesped);
		this.meshArray.push(casa);
	}
}
