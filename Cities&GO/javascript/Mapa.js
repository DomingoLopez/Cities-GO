class Map extends THREE.Object3D {
	constructor(scene, ancho, largo) {
		super();

		//Se le pasa la escena para poder hacer cambios en ella
		this.scene = scene;
		this.ancho = ancho;
		this.largo = largo;
		this.tam_celda = 5;


		//Array de celdas del mapa
		this.celdas = this.createFieldBox(this.ancho, this.largo, this.tam_celda);
		//Array de los objetos que hay sobre el mapa
		this.objetos = [];


		
	}


	/**
	 * Crea el campo sobre el que se va a trabajar
	 */
	createFieldBox(ancho, largo, tam_celda) {
		var matrix = [];
		var movZ = 0;
		var movX = 0;

		for (var i = 0; i < ancho / tam_celda; i++) {
			movZ = largo / 2 - i * tam_celda - tam_celda / 2;

			for (var j = 0; j < largo / tam_celda; j++) {
				movX = ancho / 2 - j * tam_celda - tam_celda / 2;

				var geom = new THREE.BoxGeometry(tam_celda, 0.1, 5);
				var mat = new THREE.MeshBasicMaterial({
					wireframe: true,
					transparent: true,
					opacity: 0.5,
					color: 0x2194ce
				});
				var mesh = new THREE.Mesh(geom, mat);

				mesh.position.x = movX;
				mesh.position.z = movZ;
				mesh.position.y = -0.05;
				mesh.name = 'field' + '-' + i + '-' + j + '-' + 'free'; //free y busy son libre ó ocupada

				matrix.push(mesh);

				this.add(mesh);
			}
		}

		return matrix;
	}

	/**
	 * Devuelve el array de objetos que están sobre el mapa
	 */
	getObjetcs(){
		return this.objetos;
	}

	/**
	 * Inserta un objeto en el array de objetos del mapa
	 */
	insertObject(mesh){
		this.objetos.push(mesh);
	}


	/**
	 * Borra un objeto del array de objetos del mapa. 
	 * Limpia también los espacios que puedan quedar con 'undefined' al borrar
	 */
	deleteFromObjectsArray(mesh){

		var terminado;
		for(var i = 0; i<this.objetos.length && !terminado; i++){
			
			if(mesh == this.objetos[i]){
				terminado =  true;
				delete this.objetos[i];
			}
		}
		//AL HACER DELETE, QUEDAN HUECOS CON UNDEFINED EN EL ARRAY.
		//SE BORRAN ASÍ
		var aux = this.objetos.filter(function(limpios){
			return limpios != undefined;
		});

		this.objetos = aux;

	}

	/**
	 * Devuelve el array de celdas del mapa
	 */
	getCeldas(){
		return this.celdas;
	}

/*
	getEstadoCelda(meshCelda) {
		if (meshCelda != null) {
			var campos = meshCelda.name.split('-');


			return campos[3] == 'free' ? true : false;
		} else {
			return null;
		}
	}

	setEstadoCelda(meshCelda, estado) {
		var campos = meshCelda.name.split('-');
		campos[3] = estado;
		var nombre = campos.join('-');

		meshCelda.name = nombre;
	}

*/

	update() {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
		// Primero, el escalado
		// Segundo, la rotación en Z
		// Después, la rotación en Y
		// Luego, la rotación en X
		// Y por último la traslación
	}
}
