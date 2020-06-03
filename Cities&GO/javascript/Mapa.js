class Map extends THREE.Object3D {
	constructor(scene, ancho, largo) {
		super();

		//Se le pasa la escena para poder hacer cambios en ella
		this.scene = scene;
		this.ancho = ancho;
		this.largo = largo;
		this.tam_celda = 5;

		//Variable auxiliar para trabajar con él
		this.celdaActual = null;

		this.celdas = this.createFieldBox(this.ancho, this.largo, this.tam_celda);
		this.objetos = [];

		this.objetoAColocar = null;
		//Objeto auxiliar helper para la colocación
		this.helper = null;

		this.raycaster = new THREE.Raycaster(); // RayCaster para selección del suelo
	}

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

	getEstadoCelda(meshCelda) {
		if (meshCelda != null) {
			var campos = meshCelda.name.split('-');
			console.log(campos[3]);
			console.log(campos[3] == 'free' ? true : false);

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

	//Obtenemos las coordenadas donde se ha pulsado el ratón
	getMouse(event) {
		var mouse = new THREE.Vector2();
		mouse.x = event.clientX / window.innerWidth * 2 - 1;
		mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
		return mouse;
	}

	//Obtenemos el punto del mapa donde se ha pulsado
	getPointOnGround(event) {
		var mouse = this.getMouse(event);
		this.raycaster.setFromCamera(mouse, this.scene.getCamera());
		var surfaces = this.celdas;
		var pickedObjects = this.raycaster.intersectObjects(surfaces);
		if (pickedObjects.length > 0) {
			return pickedObjects[0];
		} else return null;
	}

	getPointOnObjects(event) {
		var mouse = this.getMouse(event);
		this.raycaster.setFromCamera(mouse, this.scene.getCamera());
		var surfaces = this.objetos;
		var pickedObjects = this.raycaster.intersectObjects(surfaces);
		if (pickedObjects.length > 0) {
			return pickedObjects; //Ha de devolver todos los objetos en el rayo, no solo uno
		} else return null;
	}

	addProvisional(mesh) {
		this.objetoAColocar = mesh;
		this.add(this.objetoAColocar);

		//Añadimos el helper
		this.helper = new AssignHelper();
		this.add(this.helper);
	}

	escogiendoZona(event) {
		var celdaEnHover = this.getPointOnGround(event);
		var objectosEnZona = this.getPointOnObjects(event);

		if (celdaEnHover != null) {

			this.objetoAColocar.position.x = celdaEnHover.object.position.x;
			this.objetoAColocar.position.z = celdaEnHover.object.position.z;
			this.helper.position.x = celdaEnHover.object.position.x;
			this.helper.position.z = celdaEnHover.object.position.z;

			if (this.celdaActual == null) {
				var celdaAnterior = celdaEnHover.object;
				this.celdaActual = celdaAnterior;
			} else if (celdaEnHover.object != this.celdaActual) {
				this.celdaActual.material.wireframe = true;

				var celdaAnterior = celdaEnHover.object;
				this.celdaActual = celdaAnterior;

				celdaAnterior.material.wireframe = false;
			} else {
				//Si son el mismo

				this.celdaActual.material.wireframe = false;
			}
		}

		if (objectosEnZona != null) {
			
				var terminado = false;
				for(var i = 0; i<objectosEnZona.length && !terminado; i++){
					if(objectosEnZona[i].object.position.x == this.objetoAColocar.position.x &&
						objectosEnZona[i].object.position.z == this.objetoAColocar.position.z){

						terminado = true;

						}
				}

				if(terminado){//he entrado en el bucle porque coincide
					this.helper.setColorError();
					this.objetoAColocarPermitido = false;
				}else{
					this.helper.setColorCorrecto();
					this.objetoAColocarPermitido = true;
				}

	
		} else {
			
			this.helper.setColorCorrecto();
			this.objetoAColocarPermitido = true;
		}
	}

	addObject(event) {
		var celdaPickada = this.getPointOnGround(event);

		if (celdaPickada != null && this.objetoAColocarPermitido) {
			
			var asignador = new Colores();
			var color_asociado = asignador.getColorObjeto(this.objetoAColocar);
			this.objetoAColocar.material.color = new THREE.Color(color_asociado);

			this.objetos.push(this.objetoAColocar);

			this.remove(this.helper);
			this.scene.setApplicationMode(MyScene.NO_ACTION);
		}
	}

	update() {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
		// Primero, el escalado
		// Segundo, la rotación en Z
		// Después, la rotación en Y
		// Luego, la rotación en X
		// Y por último la traslación
	}
}
