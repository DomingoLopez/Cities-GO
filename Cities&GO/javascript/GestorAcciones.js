class GestorAcciones {
	constructor(scene, mapa) {
		this.scene = scene;
		this.mapa = mapa;

		// RayCaster para selección del suelo
		this.raycaster = new THREE.Raycaster();

		//Variables para colocar objetcos
		this.objetoAColocar = null;
		//Objeto auxiliar helper para la colocación
		this.helper = new AssignHelper();
		//Booleano para saber si el helper está en uso y no volver a pintarlo
		this.helperOnScene = false;
		//Variable auxiliar para trabajar con él
		this.celdaActual = null;
	}

	/**
     * Coloca el helper en la posición inicial 0,0,0 para tener una referencia de los objetos nuevos que se añaden
     */
	reloadHelper() {
		this.helper.position.x = 0;
		this.helper.position.z = 0;
	}

	/**
     * Elimina el helper de la escena. No lo destruye, sólo
     * que no lo muestra. (No queremos estar destruyendo y construyendo todo 
     * el rato el helper)
     */
	destroyHelper() {
		this.mapa.remove(this.helper);
	}

	setHelper(mesh) {
		this.helper.position.x = mesh.position.x;
		this.helper.position.z = mesh.position.z;
	}

	/**
     * Como su nombre indica, prepara el escenario para la posible inserción de un elemento
     */
	prepareADD(mesh) {
		this.objetoAColocar = mesh;
		//var array = this.objetoAColocar.getMeshArray();
		//for (var i = 0; i < array.length; i++) {
		//	this.mapa.add(array[i]);
		//}
		this.mapa.add(this.objetoAColocar);

		//Añadimos el helper
		this.reloadHelper();
		this.mapa.add(this.helper);
	}

	/**
     * Como su nombre indica, prepara el escenario para un posible desplazamiento de objetos
     */
	prepareMOVE(mesh) {
		this.objetoAColocar = mesh.userData;
		this.mapa.add(this.objetoAColocar);

		//Añadimos el helper

		this.setHelper(this.objetoAColocar);
		this.mapa.add(this.helper);
	}

	/*
    *Obtenemos las coordenadas donde se ha pulsado el ratón
    */
	getMouse(event) {
		var mouse = new THREE.Vector2();
		mouse.x = event.clientX / window.innerWidth * 2 - 1;
		mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
		return mouse;
	}

	/**
     * Obtenemos el punto del mapa donde se ha pulsado
     */
	getPointOnGround(event) {
		var mouse = this.getMouse(event);
		this.raycaster.setFromCamera(mouse, this.scene.getCamera());
		var surfaces = this.mapa.getCeldas();
		var pickedObjects = this.raycaster.intersectObjects(surfaces);
		if (pickedObjects.length > 0) {
			return pickedObjects[0];
		} else return null;
	}

	/**
     * Obtenemos los objetos(TODOS) que hay en el rayo emisor 
     */
	getPointOnObjects(event) {
		var mouse = this.getMouse(event);
		this.raycaster.setFromCamera(mouse, this.scene.getCamera());
		var surfaces = this.mapa.getObjects();
		var pickedObjects = this.raycaster.intersectObjects(surfaces);
		if (pickedObjects.length > 0) {
			return pickedObjects; //Ha de devolver todos los objetos en el rayo, no solo uno
		} else return null;
	}

	/**
     * Obtenemos EL objeto primero que se encuentre el raycaster
     */
	getPointOnObject(event) {
		var mouse = this.getMouse(event);
		this.raycaster.setFromCamera(mouse, this.scene.getCamera());
		var surfaces = this.mapa.getObjects();
		var pickedObjects = this.raycaster.intersectObjects(surfaces);
		if (pickedObjects.length > 0) {
			return pickedObjects[0]; //Ha de devolver todos los objetos en el rayo, no solo uno
		} else return null;
	}

	/**
     * Método que lleva la lógica de seleccionar una zona del mapa 
     * para añadir un objeto a ella. Hace uso del helper para ayudar al usuario,
     * consistente en una barrita iluminada.
     */
	choosingZone(event) {
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
			for (var i = 0; i < objectosEnZona.length && !terminado; i++) {
				if (
					objectosEnZona[i].object.userData.position.x == this.objetoAColocar.position.x &&
					objectosEnZona[i].object.userData.position.z == this.objetoAColocar.position.z
				) {
					if (objectosEnZona[i].object.userData != this.objetoAColocar) terminado = true;
				}
			}

			if (terminado) {
				//he entrado en el bucle porque coincide
				this.helper.setColorError();
				this.objetoAColocarPermitido = false;
			} else {
				this.helper.setColorCorrecto();
				this.objetoAColocarPermitido = true;
			}
		} else {
			this.helper.setColorCorrecto();
			this.objetoAColocarPermitido = true;
		}
	}

	/**
     * Método que lleva la lógica de elegir un objeto que ya esté en la escena.
     * Es llamado con el evento mousemove de la escena si no hay ninguna acción a 
     * realizar
     */
	choosingObject(event) {
		var objetoASeleccionar = this.getPointOnObject(event);

		if (objetoASeleccionar != null) {
			this.helper.position.x = objetoASeleccionar.object.userData.position.x;
			this.helper.position.z = objetoASeleccionar.object.userData.position.z;

			if (this.helperOnScene == false) {
				this.mapa.add(this.helper);
				this.helperOnScene = true;
			}
		} else {
			if (this.helperOnScene) {
				this.mapa.remove(this.helper);
			}
			this.helperOnScene = false;
		}
	}

	/**
     * Método que contiene la lógica para seleccionar un objeto al hacer 
     * click sobre él tras el evento de click de la escena. 
     * Se seleccina dicho objeto y se pasa a un estado ADDING_OBJECT
     * Reutilizando el método "ChoosingZone" para reubicar el objeto
     */
	selectObject(event) {
		//Aquí habría que acceder al userData del mesh seleccionado
		//Y ya operar con el object3D.
		//De momento lo tratamos como un mesh
		var objetoSeleccionado = this.getPointOnObject(event);

		if (objetoSeleccionado != null) {
			//Si hemos picado un objeto.
			//Ahora obtenemos el object3D. Lo dicho, de momento no
			var objeto = objetoSeleccionado.object;

			//Debemos borrar el objeto del array de objetos de la escena
			//SI NO, GG
			this.mapa.deleteFromObjectsArray(objeto);

			//Ahora sí lo añadimos para su gestión
			this.prepareMOVE(objeto);
			this.scene.setApplicationMode(MyScene.SELECTED_OBJECT);
		}
	}

	/**
     * Método de adición de un objeto a la escena (Ya sea por nueva incorporación ó por
     * moverlo de ubicación)
     */
	addObject(event) {
		var celdaPickada = this.getPointOnGround(event);

		if (celdaPickada != null && this.objetoAColocarPermitido) {
			//var asignador = new Colores();
			//var color_asociado = asignador.getColorObjeto(this.objetoAColocar);
			//this.objetoAColocar.material.color = new THREE.Color(color_asociado);

			var array = this.objetoAColocar.getMeshArray();
			for (var i = 0; i < array.length; i++) {
				this.mapa.insertObject(array[i]);
			}
			//this.mapa.insertObject(array);

			this.destroyHelper();
			this.scene.setApplicationMode(MyScene.NO_ACTION);
		}
	}

	/**
     * Método que se llama tras recibir una instrucción de suprimir desde el teclado
     * Si hay un objeto seleccionado
     */
	deleteORcancel() {
		if (
			this.scene.getApplicationMode() == MyScene.SELECTED_OBJECT ||
			this.scene.getApplicationMode() == MyScene.ADDING_OBJECT
		) {
			//Si hemos seleccionado un objeto, debe estar en this.objetoAColocar
			//Y además, no está en el array de objetos del mapa, dado que vamos a volver a colocarlo
			//Simplemente podemos quitar de la escena el objeto a colocar, ponerlo a null y destruir el helper
			//Finalmente, ponemos de nuevo no action
			this.mapa.remove(this.objetoAColocar);
			this.celdaActual.material.wireframe = true; //La celda actual hay que ponerla con su wireframe
			this.destroyHelper();
			this.scene.setApplicationMode(MyScene.NO_ACTION);
		}

		/*switch(this.scene.getApplicationMode()){

            case MyScene.SELECTED_OBJECT:
                //Si hemos seleccionado un objeto, debe estar en this.objetoAColocar
                //Y además, no está en el array de objetos del mapa, dado que vamos a volver a colocarlo
                //Simplemente podemos quitar de la escena el objeto a colocar, ponerlo a null y destruir el helper
                //Finalmente, ponemos de nuevo no action
                this.mapa.remove(this.objetoAColocar);
                //La celda actual hay que ponerla con su wireframe
                this.celdaActual.material.wireframe = true;
                this.destroyHelper();
                this.scene.setApplicationMode(MyScene.NO_ACTION);
                break;
            
            case MyScene.ADDING_OBJECT:
                this.mapa.remove(this.objetoAColocar);
                //La celda actual hay que ponerla con su wireframe
                this.celdaActual.material.wireframe = true;
                this.destroyHelper();
                this.scene.setApplicationMode(MyScene.NO_ACTION);
                break;

            case MyScene.NO_ACTION:
                //Sin implementar. Lo mismo no nos sirve
                break;




        }*/
	}
}
