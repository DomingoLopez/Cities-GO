class Edificio extends ObjetoSimple {
	constructor(numero) {
		super();
		this.nombre = 'edificio';
		this.generarRascacielos(numero);
	}

	generarRascacielos(numero) {
		//var random = Math.floor(Math.random() * 3) * 2 + 12;
		var c = new Colores();
		var colorRascacielos = c.getRandomRasca();
		for (var i = 0; i < numero; i++) {
			var col = colorRascacielos;
			var geo = 5;
			if (i % 2 === 0) {
				geo = 4.5;
				col = 0xeeeeee;
			}

			this.meshArray[i] = new THREE.Mesh(
				new THREE.BoxGeometry(geo, 1, geo),
				new THREE.MeshPhongMaterial({ color: col })
			);
			this.meshArray[i].castShadow = true;

			var ajusteY = i + 0.5;
			this.meshArray[i].position.y = ajusteY;
			this.meshArray[i].name = this.nombre;
			this.meshArray[i].userData = this;
			this.add(this.meshArray[i]);
		}
	}
}
