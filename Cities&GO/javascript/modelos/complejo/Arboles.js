class Arboles extends ObjetoComplejo {
	constructor() {
		super();

		this.colores_arboles = [0x00e400, 0xe58e41];

		var cesped = new Cesped();
		this.add(cesped);

		this.arbol_1 = new Arbol();
		this.arbol_1.scale.set(0.5, 0.5, 0.5);
		this.arbol_1.position.x = 1.5;
		this.arbol_1.position.z = -1;
		this.add(this.arbol_1);

		this.arbol_2 = new Arbol();
		this.arbol_2.scale.set(0.5, 0.5, 0.5);
		this.arbol_2.position.x = -1.5;
		this.add(this.arbol_2);

		this.arbol_3 = new Arbol();
		this.arbol_3.scale.set(0.3, 0.3, 0.3);
		this.arbol_3.position.x = 1;
		this.arbol_3.position.z = 1;
		this.add(this.arbol_3);

		this.meshArray.push(cesped);
		this.meshArray.push(this.arbol_1);
		this.meshArray.push(this.arbol_2);
		this.meshArray.push(this.arbol_3);
	}

	changeColor(){

		var arbol_1 = this.arbol_1.getHojas();
		var arbol_2 = this.arbol_2.getHojas();
		var arbol_3 = this.arbol_3.getHojas();

		var colorAnterior = '0x' + arbol_1.material.color.getHexString();
		
		var terminado =  false;
		var indice_color = null;

		for(var i = 0; i< this.colores_arboles.length && !terminado; i++){
			if(colorAnterior == this.colores_arboles[i]){
				terminado = true;
				indice_color = i;
			}
		}
		//No funciona el findIndex para esto
		// indice_color = this.colores_casa.findIndex(colorAnterior);

		var nuevo_indice = (indice_color % (this.colores_arboles.length) + 1);

		if (nuevo_indice == this.colores_arboles.length){
			nuevo_indice = 0;
		}

		var newColor = this.colores_arboles[nuevo_indice];

		arbol_1.material.color = new THREE.Color(newColor);
		arbol_2.material.color = new THREE.Color(newColor);
		arbol_3.material.color = new THREE.Color(newColor);

		return newColor;
	}


	setColorChange(color){


		var arbol_1 = this.arbol_1.getHojas();
		var arbol_2 = this.arbol_2.getHojas();
		var arbol_3 = this.arbol_3.getHojas();

		arbol_1.material.color = new THREE.Color(color);
		arbol_2.material.color = new THREE.Color(color);
		arbol_3.material.color = new THREE.Color(color);


	}


}
