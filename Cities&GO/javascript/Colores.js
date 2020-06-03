class Colores {
	constructor() {
		this.colores_casa = [ 0xfebcc8, 0xffffd8, 0xc0fefe, 0x836853 ];
		this.colores_rascacielos = [ 0x18436d, 0x202c39, 0x6b5a45 ];
	}

	getColorCesped() {
		return 0x07ad62;
	}

	getColorAgua() {
		return 0x2379fe;
	}

	getColorCarretera() {
		return 0x000000;
	}

	getRandomCasa() {
		var random = Math.floor(Math.random() * this.colores_casa.length);
		return this.colores_casa[random];
	}

	getRandomRasca() {
		var random = Math.floor(Math.random() * this.colores_rascacielos.length);
		return this.colores_rascacielos[random];
	}

	getColorObjeto(objeto) {
		var nuevo_color;
		switch (objeto.name) {
			case 'casa':
				nuevo_color = new THREE.Color(this.getRandomCasa());
				break;
			case 'cesped':
				nuevo_color = new THREE.Color(this.getColorCesped());
				break;
			case 'agua':
				nuevo_color = new THREE.Color(this.getColorAgua());
				break;
			case 'carretera':
				nuevo_color = new THREE.Color(this.getColorCarretera());
				break;
			case 'rascacielos':
				nuevo_color = new THREE.Color(this.getRandomRasca());
				break;
		}
		return nuevo_color;
	}
}
