class GestorAcciones {
	constructor(scene, mapa) {
		this.scene = scene;
		this.mapa = mapa;

		// RayCaster para selección del suelo
		this.raycaster = new THREE.Raycaster();

		//Variables para colocar objetcos
		this.objetoAColocar = null;
		//Variable para permitir colocar un objeto
		this.objetoAColocarPermitido = null;
		//Variable auxiliar para mostrar el objeto en el mapa
		this.objectOnScene = false;
		//Objeto auxiliar helper para la colocación
		this.helper = new AssignHelper();
		//Booleano para saber si el helper está en uso y no volver a pintarlo
		this.helperOnScene = false;
		//Variable auxiliar para trabajar con él
		this.celdaActual = null;

		//Elemento actual para seguir añadiendo
		this.elementoActual = null;

		/*El gestor de acciones lleva la traza de acciones mediante una clase ActionStack,
		Una pila que almacena las acciones que se han realizado para poder revertirlas al pulsar
		Ctrl + Z por ejemplo.
		*/
		this.actions = new ActionStack();

		//Coordenadas de la posición anterior del objeto. Por si se revierte la acción
		this.lastestObjectCoords = null;
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
	prepareADD(elemento) {
		this.elementoActual = elemento;

		/**
		 * Hemos de hacer la comprobación siguiente, dado que puede ser que el usuario 
		 * sin terminar la acción pertinente seleccione otro elemento a elegir,
		 * lo que provocaría fallos. (No se elimina el objeto anterior en la escena, etc)
		 * Por eso, hemos de hacer ésta comprobación
		 */
		if (this.objectOnScene) {
			this.mapa.remove(this.objetoAColocar);
			this.objetoAColocar = null;
			this.helperOnScene = false;
			this.mapa.remove(this.helper);
			this.celdaActual.material.color = new THREE.Color(0xadc986);
		}
		this.objectOnScene = false;

		var gestor = new GestorModelos(this.elementoActual);
		var object3D = gestor.getObject3D();

		this.objetoAColocar = object3D;
	}

	/**
     * Como su nombre indica, prepara el escenario para un posible desplazamiento de objetos
     */
	prepareMOVE(obj) {
		this.objetoAColocar = obj;
		this.objectOnScene = true;

		var lastPosition = {
			posX: this.objetoAColocar.position.x,
			posZ: this.objetoAColocar.position.z
		};

		this.lastestObjectCoords = lastPosition;
		//Añadimos el helper

		this.setHelper(this.objetoAColocar);
		this.helper.setColorSeleccion();
		this.mapa.add(this.helper);
		this.helperOnScene = true;
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

			if (!this.helperOnScene) {
				this.mapa.add(this.helper);
				this.helperOnScene = true;
			}

			if (!this.objectOnScene) {
				this.mapa.add(this.objetoAColocar);
				this.objectOnScene = true;
			}

			if (this.celdaActual == null) {
				var celdaAnterior = celdaEnHover.object;
				this.celdaActual = celdaAnterior;
			} else if (celdaEnHover.object != this.celdaActual) {
				//this.celdaActual.material.wireframe = true;
				this.celdaActual.material.color = new THREE.Color(0xadc986);

				var celdaAnterior = celdaEnHover.object;
				this.celdaActual = celdaAnterior;

				//celdaAnterior.material.wireframe = false;
				celdaAnterior.material.color = new THREE.Color(0x235111);
			} else {
				//Si son el mismo
				//this.celdaActual.material.wireframe = false;
				this.celdaActual.material.color = new THREE.Color(0x235111);
			}
		}

		if (objectosEnZona != null) {
			var terminado = false;
			for (var i = 0; i < objectosEnZona.length && !terminado; i++) {
				if (
					objectosEnZona[i].object.userData.position.x == celdaEnHover.object.position.x &&
					objectosEnZona[i].object.userData.position.z == celdaEnHover.object.position.z
				) {
					if (objectosEnZona[i].object.userData != this.objetoAColocar) terminado = true;
					//terminado = true;
				}
			}

			if (terminado) {
				//he entrado en el bucle porque coincide
				this.helper.setColorError();
				this.objetoAColocarPermitido = false;
			} else {
				this.helper.setColorSeleccion();
				this.objetoAColocarPermitido = true;
			}
		} else {
			this.helper.setColorSeleccion();
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
			var objeto = objetoSeleccionado.object.userData; //Tenemos el object3D

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
			var array = this.objetoAColocar.getMeshArray();
			for (var i = 0; i < array.length; i++) {
				this.mapa.insertObject(array[i]);
			}
			//this.mapa.add(this.objetoAColocar);
			celdaPickada.object.material.color = new THREE.Color(0xadc986); //Debemos comprobar si estamos insertando ó moviendo

			/*Una vez añadido el objeto a la escena, debemos introducir la acción
			en la pila del sistema para poder revertirla
			*/ if (
				this.scene.getApplicationMode() == MyScene.ADDING_OBJECT
			) {
				var action = new Action(Action.INSERTAR, this.objetoAColocar);
				this.actions.pushAction(action);
				this.objectOnScene = false;
				this.prepareADD(this.elementoActual);

				//Ésto evitará dobles picados sin querer
				this.objetoAColocarPermitido = false;
				this.helper.setColorError();

			} else if (this.scene.getApplicationMode() == MyScene.SELECTED_OBJECT) {
				var actualCoords = {
					posX: this.objetoAColocar.position.x,
					posZ: this.objetoAColocar.position.z
				};

				this.objectOnScene = false;
				this.objetoAColocarPermitido = false;

				var action = new Action(Action.MOVER, {
					obj: this.objetoAColocar,
					lastestCoords: this.lastestObjectCoords,
					actualCoords: actualCoords
				});
				this.actions.pushAction(action);
				this.helper.setColorCorrecto();
				this.scene.setApplicationMode(MyScene.NO_ACTION);
			}

			
		}
	}

	/**
	 * Método que rota 90º el objeto si estamos en modo adición o selección
	 */
	rotateOBJ() {
		if (
			this.scene.getApplicationMode() == MyScene.SELECTED_OBJECT ||
			this.scene.getApplicationMode() == MyScene.ADDING_OBJECT
		) {
			this.objetoAColocar.rotation.y += Math.PI / 2;
		}
	}

	/**
     * Método que se llama tras recibir una instrucción de suprimir desde el teclado
     * Si hay un objeto seleccionado
     */
	deleteOBJ() {
		if (this.scene.getApplicationMode() == MyScene.SELECTED_OBJECT) {
			//Si hemos seleccionado un objeto, debe estar en this.objetoAColocar
			//Y además, no está en el array de objetos del mapa, dado que vamos a volver a colocarlo
			//Simplemente podemos quitar de la escena el objeto a colocar, ponerlo a null y destruir el helper
			//Finalmente, ponemos de nuevo no action

			//Añadimos la acción de borrado a la pila
			var action = new Action(Action.BORRAR, this.objetoAColocar);
			this.actions.pushAction(action);

			this.mapa.remove(this.objetoAColocar);
			//No hace falta que lo borremos porque ya lo borramos al picarlo
			//this.mapa.deleteFromObjectsArray(this.objetoAColocar);
			this.celdaActual.material.color = new THREE.Color(0xadc986);
			this.helper.setColorCorrecto();
			this.destroyHelper();
			this.scene.setApplicationMode(MyScene.NO_ACTION);
		}
	}

	/**
	 * Método que cancela la acción de añadido a la escena
	 */
	cancelAction() {
		switch (this.scene.getApplicationMode()) {
			case MyScene.ADDING_OBJECT:
				this.mapa.remove(this.objetoAColocar);
				//Evitamos que salga de color rojo
				this.helper.setColorCorrecto();
				this.destroyHelper();
				this.celdaActual.material.color = new THREE.Color(0xadc986);
				this.scene.setApplicationMode(MyScene.NO_ACTION);

				break;

			case MyScene.SELECTED_OBJECT:
				this.objetoAColocar.position.x = this.lastestObjectCoords.posX;
				this.objetoAColocar.position.z = this.lastestObjectCoords.posZ;

				//Volvemos a insertar el objeto
				var array = this.objetoAColocar.getMeshArray();
				for (var i = 0; i < array.length; i++) {
					this.mapa.insertObject(array[i]);
				}
				this.objectOnScene = false;
				//this.helperOnScene = false;

				//Evitamos que salga de color rojo
				this.helper.setColorCorrecto();
				this.destroyHelper();
				this.celdaActual.material.color = new THREE.Color(0xadc986);
				this.scene.setApplicationMode(MyScene.NO_ACTION);

				break;
		}
	}

	/**
	  * Método que se ejecuta cuando se pulsa Ctrl + Z, y que saca de la pila la última acción realizada
	  * para revertirla
	  */
	unDoAction() {
		//De momento sólo lo vamos a permitir cuando no se estén realizando acciones
		if (this.scene.getApplicationMode() == MyScene.NO_ACTION) {
			if (!this.actions.empty()) {
				var accion = this.actions.popAction();
				var tipo = accion.getType();
				var options = accion.getOptions();

				//Una vez sacad la acción, la metemos en la pila del rehacer
				this.actions.pushActionInverse(accion);

				switch (tipo) {
					case Action.INSERTAR:
						//En options tenemos object3D. Solo tenemos que eliminarlo de la escena y borrarlo del mapa
						this.mapa.remove(options);
						this.mapa.deleteFromObjectsArray(options);

						break;

					case Action.MOVER:
						var posX = options.lastestCoords.posX;
						var posZ = options.lastestCoords.posZ;

						var obj = options.obj;
						obj.position.x = posX;
						obj.position.z = posZ;

						break;
				}
			}
		} else if (this.scene.getApplicationMode() == MyScene.ADDING_OBJECT) {
			this.cancelAction();
		}
	}

	reDoAction() {
		if (this.scene.getApplicationMode() == MyScene.NO_ACTION) {
			if (!this.actions.emptyInverse()) {
				var accion = this.actions.popActionInverse();
				var tipo = accion.getType();
				var options = accion.getOptions();

				//Una vez sacad la acción, la metemos en la pila del rehacer
				this.actions.pushAction(accion);

				switch (tipo) {
					//Si la acción desecha era insertar, ahora hay que insertarlo
					case Action.INSERTAR:
						//En options tenemos object3D. Solo tenemos que eliminarlo de la escena y borrarlo del mapa
						this.mapa.add(options);
						var child = options.getMeshArray();

						for (var i = 0; i < child.length; i++) {
							this.mapa.insertObject(child[i]);
						}

						break;
					//Si la acción desecha era mover, ahora hay que moverlo a su posición correcta
					case Action.MOVER:
						var posX = options.actualCoords.posX;
						var posZ = options.actualCoords.posZ;

						var obj = options.obj;
						obj.position.x = posX;
						obj.position.z = posZ;

						break;
				}
			}
		} else if (this.scene.getApplicationMode() == MyScene.ADDING_OBJECT) {
			this.cancelAction();
		}
	}
}
