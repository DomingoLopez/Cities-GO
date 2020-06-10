class Rascacielos extends ObjetoComplejo {
	constructor() {
		super();

		this.colores_rascacielos = [ 0x18436d, 0x202c39, 0x6b5a45 ];

		var edificio = new Edificio(12);
		this.meshArray.push(edificio);
		this.add(edificio);

		var acera = new Acera();
		this.meshArray.push(acera);
		this.add(acera);
	}

	changeColor(){

		var arrayMeshes = this.getMeshArray();
		var colorAnterior = '0x' + arrayMeshes[1].material.color.getHexString();
		
		var terminado =  false;
		var indice_color = null;

		for(var i = 0; i< this.colores_rascacielos.length && !terminado; i++){
			if(colorAnterior == this.colores_rascacielos[i]){
				terminado = true;
				indice_color = i;
			}
		}
		//No funciona el findIndex para esto
		// indice_color = this.colores_casa.findIndex(colorAnterior);

		
		var nuevo_indice = (indice_color % (this.colores_rascacielos.length) + 1);

		if (nuevo_indice == this.colores_rascacielos.length){
			nuevo_indice = 0;
		}

		var newColor = this.colores_rascacielos[nuevo_indice];

		//-1 porque el último añadido es la acera
		for(var i = 0; i< arrayMeshes.length -1; i++){
			if( (i%2) != 0){
				arrayMeshes[i].material.color = new THREE.Color(newColor);
			}
		}


		return newColor;
	}


	setColorChange(color){

		var arrayMeshes = this.getMeshArray();

		for(var i = 0; i< arrayMeshes.length-1; i++){
			if( (i%2) != 0){
				arrayMeshes[i].material.color = new THREE.Color(color);
			}
		}


	}
}
