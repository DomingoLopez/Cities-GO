class Rascacielos extends ObjetoComplejo {
	constructor() {
		super();

		var edificio = new Edificio(12);
		this.meshArray.push(edificio);
		this.add(edificio);

		var acera = new Acera();
		this.meshArray.push(acera);
		this.add(acera);
	}
}
