class Mapa extends THREE.Object3D {
	constructor(scene, ancho, largo, gui) {
		super();

		//Se le pasa la escena para poder hacer cambios en ella
		this.scene = scene;
		this.ancho = ancho;
		this.largo = largo;
		this.tam_celda = 5;

		//Añadimos la interfaz dat gui para el control del mapa
		this.createGUI(gui, 'Control del mapa');

		//Array de celdas del mapa
		this.celdas = this.createFieldBox(this.ancho, this.largo, this.tam_celda);
		//Array de los objetos que hay sobre el mapa
		this.objetos = [];

		//Creamos el terreno restante hasta casi el final del Skybox
		this.terreno = this.createGround(ancho, largo);
		this.add(this.terreno);

		//Creamos las guías, por si el usuario quiere verlas
		this.guias = new THREE.Object3D();
		this.guidesArray = this.createGuides(this.ancho, this.largo, this.tam_celda);
		this.add(this.guias);
	}

	/**
	 * Crea el campo sobre el que se va a trabajar
	 */
	createFieldBox(ancho, largo, tam_celda) {
		var matrix = [];
		var movZ = 0;
		var movX = 0;

		var options = {
			wireframe: false,
			color: 0xadc986
		};

		for (var i = 0; i < ancho / tam_celda; i++) {
			movZ = largo / 2 - i * tam_celda - tam_celda / 2;

			for (var j = 0; j < largo / tam_celda; j++) {
				movX = ancho / 2 - j * tam_celda - tam_celda / 2;

				var geom = new THREE.BoxGeometry(tam_celda, 0.1, 5);
				var mat = new THREE.MeshPhongMaterial(options);
				var mesh = new THREE.Mesh(geom, mat);
				mesh.receiveShadow = true;

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
	 * Creamos las guías, por si el usuario las quiere visualizar
	 */

	createGuides(ancho, largo, tam_celda) {
		var matrix = [];
		var movZ = 0;
		var movX = 0;

		var options = {
			wireframe: true,
			color: 0x418ea0,
			transparent: true,
			opacity: 0.5
		};

		for (var i = 0; i < ancho / tam_celda; i++) {
			movZ = largo / 2 - i * tam_celda - tam_celda / 2;

			for (var j = 0; j < largo / tam_celda; j++) {
				movX = ancho / 2 - j * tam_celda - tam_celda / 2;

				var geom = new THREE.BoxGeometry(tam_celda, 0.1, 5);
				var mat = new THREE.MeshPhongMaterial(options);
				var mesh = new THREE.Mesh(geom, mat);

				mesh.position.x = movX;
				mesh.position.z = movZ;
				mesh.position.y = -0.05;
				mesh.name = 'guide' + '-' + i + '-' + j + '-' + 'free'; //free y busy son libre ó ocupada
				matrix.push(mesh);
				this.guias.add(mesh);
			}
		}

		return matrix;
	}

	/**
	 * Creamos el terreno exterior de la zona a trabajar, para dar sensación de horizonte con el 
	 * Skybox
	 */

	createGround(ancho, largo) {
		//Hemos de usar nodosBSP.

		var geom1 = new THREE.BoxGeometry(2000, 0.1, 2000);
		var geom2 = new THREE.BoxGeometry(ancho, 0.1, largo);

		//Se colocan donde deben estar

		//Se pasan a nodos BSP
		var nodoBSP1 = new ThreeBSP(geom1);
		var nodoBSP2 = new ThreeBSP(geom2);

		//Se realizan las operaciones
		var resultado = nodoBSP1.subtract(nodoBSP2);
		var mat = new THREE.MeshPhongMaterial({
			flatShading: false,
			wireframe: false,
			side: THREE.DoubleSide,
			color: 0xa6dd95
		});
		//Se combierte en un mesh
		var resultadoMesh = resultado.toMesh(mat);
		resultadoMesh.receiveShadow = true;

		//var resultadoMesh = nodoBSP2.toMesh()

		//Se computan los vectores normales para finalizar
		resultadoMesh.geometry.computeFaceNormals();
		resultadoMesh.geometry.computeVertexNormals();

		return resultadoMesh;
	}

	createGUI(gui, titulo) {
		this.guiControls = new function() {
			this.guidesOnOff = false;
		}();

		// Se crea una sección para los controles de la caja
		var folder = gui.addFolder(titulo);
		folder.add(this.guiControls, 'guidesOnOff').name('Guias Construcción : ');
	}

	/**
	 * Devuelve el array de objetos que están sobre el mapa
	 */
	getObjects() {
		return this.objetos;
	}

	/**
	 * Inserta un objeto en el array de objetos del mapa
	 */
	insertObject(mesh) {
		this.objetos.push(mesh);
	}

	/**
	 * Borra un objeto del array de objetos del mapa. 
	 * Limpia también los espacios que puedan quedar con 'undefined' al borrar
	 */
	deleteFromObjectsArray(object3D) {
		var terminado;
		//Hay que borrar todos los meshes del array de objetos
		var children = object3D.getMeshArray();

		//A ver si podemos mejorar éste doble for....
		for (var i = 0; i < children.length; i++) {
			var terminado = false;
			for (var j = 0; j < this.objetos.length && !terminado; j++) {
				if (children[i] == this.objetos[j]) {
					terminado = true;
					delete this.objetos[j];
				}
			}
		}

		//Al hacer delete quedan huecos con undefined, asi los eliminamos
		var aux = this.objetos.filter(function(limpios) {
			return limpios != undefined;
		});

		this.objetos = aux;
	}

	/**
	 * Devuelve el array de celdas del mapa
	 */
	getCeldas() {
		return this.celdas;
	}

	update() {
		this.guias.visible = this.guiControls.guidesOnOff;
	}
}
