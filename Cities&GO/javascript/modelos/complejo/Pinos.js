class Pinos extends ObjetoComplejo {
	constructor() {
		super();

		var cesped = new Cesped();
		this.add(cesped);
		this.meshArray.push(cesped);

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				var pino = new Pino();
				pino.scale.set(0.5, 0.5, 0.5);
				pino.position.x = -1.8 + j * 1.7;
				pino.position.z = -1.8 + i * 1.7;
				this.add(pino);
				this.meshArray.push(pino);
			}
		}
	}
}
