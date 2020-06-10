class CasaBasica extends ObjetoComplejo {
	constructor() {
		super();

		this.colores_casa = [ 0xfebcc8, 0xffffd8, 0xc0fefe, 0x836853, 0xff4b43 ];

		var cesped = new Cesped();
		this.casa = new Casa();
		this.add(cesped);
		this.add(this.casa);

		this.meshArray.push(cesped);
		this.meshArray.push(this.casa);
	}

	changeColor(){

		var tejado = this.casa.getTejado();
		var colorAnterior = '0x' + tejado.material.color.getHexString();
		
		var terminado =  false;
		var indice_color = null;

		for(var i = 0; i< this.colores_casa.length && !terminado; i++){
			if(colorAnterior == this.colores_casa[i]){
				terminado = true;
				indice_color = i;
			}
		}
		//No funciona el findIndex para esto
		// indice_color = this.colores_casa.findIndex(colorAnterior);

		
		var nuevo_indice = (indice_color % (this.colores_casa.length) + 1);

		if (nuevo_indice == this.colores_casa.length){
			nuevo_indice = 0;
		}

		var newColor = this.colores_casa[nuevo_indice];

		tejado.material.color = new THREE.Color(newColor);

		return newColor;
	}


	setColorChange(color){


		var tejado = this.casa.getTejado();
		tejado.material.color = new THREE.Color(color);


	}




}
