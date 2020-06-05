/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
	constructor(myCanvas) {
		super();

		// Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
		this.renderer = this.createRenderer(myCanvas);
		//Interfaz
		this.gui = this.createGUI();
		
		//Luces
		this.createLights();
		//Camara
		this.createCamera();

		//Ejes
		this.axis = new THREE.AxesHelper(5);
		this.add(this.axis);

		//Estado de la aplicación
		this.applicationMode = MyScene.NO_ACTION;

		//Creamos el mapa, pasándole la escena, el ancho y el largo.
		//Si da tiempo hacemos un formulario donde podamos introducir el ancho y largo deseado
		
		this.mapa = new Mapa(this, 150, 150, this.gui); //Ancho, largo, y tam de cada cuadrado
		this.add(this.mapa);

		//Creamos Skybox
		this.skybox = new SkyBox();
		this.add(this.skybox);

		//Creamos Sol
		this.sol = new Sol(this.gui);
		this.add(this.sol);

		//Creamos el gestor de Acciones, que será llamado cada vez que se
		//cumpla un evento del ratón o teclado
		this.gestorAcciones = new GestorAcciones(this, this.mapa);

		//Gestor para detección y acciones de las teclas
		this.gestorTeclado = new GestorTeclado(this.gestorAcciones, this.camara);


	}

	createCamera() {
		// Creamos la camara, que se encuentra en un nodo del grafo
		// y se controla por teclado
		this.camara = new Camara();
		this.camara.lookAt(new THREE.Vector3(0, 0, 0));
		var look = new THREE.Vector3(0, 0, 0);
		this.add(this.camara);
		/**
		 * AÑADIDO PARA LA CÁMARA. QUITAR SI NO
		 */
    
		// Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
		this.cameraControl = new THREE.OrbitControls(this.camara.getCamera(), this.renderer.domElement);
		//Configuración de los controles de órbita
		this.cameraControl.minPolarAngle = 0;
		this.cameraControl.maxPolarAngle = Math.PI/2.1; //El .1 es para que no toque el suelo del todo
		this.cameraControl.maxDistance = 500;
		this.cameraControl.update();
		
		
		
		// Se configuran las velocidades de los movimientos
		/*this.cameraControl.rotateSpeed = 2;
		this.cameraControl.zoomSpeed = 2;
		this.cameraControl.panSpeed = 0.3;
		// Debe orbitar con respecto al punto de mira de la cámara*/
		//this.cameraControl.target = look;

	}

	createGUI() {
		// Se crea la interfaz gráfica de usuario
		var gui = new dat.GUI();

		// La escena le va a añadir sus propios controles.
		// Se definen mediante una   new function()
		// En este caso la intensidad de la luz y si se muestran o no los ejes
		this.guiControls = new function() {
			// En el contexto de una función   this   alude a la función
			this.lightIntensity = 0.5;
			this.ambientIntensity = 0.3;
			this.spotlightOnOff = false;
			this.luzHemisferioOnOff = true; //....
			this.axisOnOff = true;
		};

		// Se crea una sección para los controles de esta clase
		var folder = gui.addFolder('Luz y Ejes');

		// Se le añade un control para la intensidad de la luz
		folder.add(this.guiControls, 'ambientIntensity', 0, 0.8, 0.1).name('Ambient int.: ');
		folder.add(this.guiControls, 'spotlightOnOff').name('Spotlight : ');
		folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Spotlight int.: ');
		
		folder.add(this.guiControls, 'luzHemisferioOnOff').name('Luz Hemisferio : ');

		// Y otro para mostrar u ocultar los ejes
		folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes : ');
		return gui;
	}

	createLights() {
		// Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
		// La luz ambiental solo tiene un color y una intensidad
		// Se declara como   var   y va a ser una variable local a este método
		//    se hace así puesto que no va a ser accedida desde otros métodos
		this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
		// La añadimos a la escena
		this.add(this.ambientLight);

		// Se crea una luz focal que va a ser la luz principal de la escena
		// La luz focal, además tiene una posición, y un punto de mira
		// Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
		// En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
		this.spotLight = new THREE.SpotLight(0xffffff, this.guiControls.lightIntensity, 2000);
		this.spotLight.position.set(0, 100, -100);

		//Activamos el casteo de sombras en la luz spot
		this.spotLight.castShadow = true;
		this.add(this.spotLight);

		//Luz de Hemisferio. Sensación agradable para el cielo
		this.luzHemisferio = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );
		this.luzHemisferio.position.set( 0, 500, 0 );
		this.add( this.luzHemisferio );
	}

	createRenderer(myCanvas) {
		// Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

		// Se instancia un Renderer   WebGL
		var renderer = new THREE.WebGLRenderer();

		// Se establece un color de fondo en las imágenes que genera el render
		renderer.setClearColor(new THREE.Color(0xeeeeee), 1.0);

		// Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
		renderer.setSize(window.innerWidth, window.innerHeight);

		//Activamos la gestión de sombras del renderizador
		renderer.shadowMap.enabled = true;
		//Le indicamos el typo de sombreado
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;//THREE.PCFSoftShadowMap; // THREE.VSMShadowMap

		// La visualización se muestra en el lienzo recibido
		$(myCanvas).append(renderer.domElement);

		return renderer;
	}

	getCamera() {
		// En principio se devuelve la única cámara que tenemos
		// Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
		return this.camara.getCamera();
	}

	setCameraAspect(ratio) {
		// Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
		// su sistema operativo hay que actualizar el ratio de aspecto de la cámara
		this.getCamera().aspect = ratio;
		// Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
		this.getCamera().updateProjectionMatrix();
	}

	onWindowResize() {
		// Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
		// Hay que actualizar el ratio de aspecto de la cámara
		this.setCameraAspect(window.innerWidth / window.innerHeight);

		// Y también el tamaño del renderizador
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	onMouseClick(event) {
		switch (this.applicationMode) {
			case MyScene.ADDING_OBJECT:
				this.gestorAcciones.addObject(event);
				break;

			case MyScene.SELECTED_OBJECT:
				this.gestorAcciones.addObject(event);
				break;

			case MyScene.NO_ACTION:
				this.gestorAcciones.selectObject(event);
				break;
		}
	}

	onMouseMove(event) {
		switch (this.applicationMode) {
			case MyScene.ADDING_OBJECT:
				this.gestorAcciones.choosingZone(event);
				break;

			case MyScene.SELECTED_OBJECT:
				this.gestorAcciones.choosingZone(event);
				break;

			case MyScene.NO_ACTION:
				this.gestorAcciones.reloadHelper();
				this.gestorAcciones.choosingObject(event);
				break;
		}
	}

	setApplicationMode(estado) {
		this.applicationMode = estado;
	}

	getApplicationMode() {
		return this.applicationMode;
	}

	prepareGestorAcciones(mesh) {
		this.gestorAcciones.prepareADD(mesh);
	}

	update() {
		// Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.

		// Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
		// Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
		requestAnimationFrame(() => this.update());

		// Se actualizan los elementos de la escena para cada frame
		// Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
		this.ambientLight.intensity = this.guiControls.ambientIntensity;
		this.spotLight.intensity = this.guiControls.lightIntensity;
		this.spotLight.visible = this.guiControls.spotlightOnOff;
		this.luzHemisferio.visible = this.guiControls.luzHemisferioOnOff;

		// Se muestran o no los ejes según lo que idique la GUI
		this.axis.visible = this.guiControls.axisOnOff;

		/**
		 * AÑADIDO PARA LA CÁMARA.QUITAR SI NO
		 */
		this.cameraControl.update();

		// Se actualiza el resto del modelo

		//Actualizamos el mapa
		this.mapa.update();
		this.sol.update();

		// Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
		this.renderer.render(this, this.getCamera());
	}
}

/**
 * ESTADOS DE LA ESCENA A TENER EN CUENTA
 */

MyScene.NO_ACTION = 0;
MyScene.ADDING_OBJECT = 1;
MyScene.SELECTED_OBJECT = 2;
MyScene.MOVING_OBJECT = 3;

/// La función   main
$(function() {
	// Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
	var scene = new MyScene('#WebGL-output');

	// Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
	window.addEventListener('resize', () => scene.onWindowResize());

	/**
   * LISTENERS DE RATÓN
   */
	window.addEventListener('click', (event) => scene.onMouseClick(event), true);
	window.addEventListener('mousemove', (event) => scene.onMouseMove(event), true);

	/**
   * LISTENERS DE TECLADO
   */

	//Listener para el teclado
	window.addEventListener('keydown', (event) => scene.gestorTeclado.onKeyDown(event), false);

	/**
   * LISTENERS DE MENÚ Y JS EN EL HTML
   */

	//Listener para seleccionar un objeto del menú.
	//Modificamos además el estado de la escena para actuar en función.

	$('.elementos-escena button').click(function() {
		var elemento = $(this).val();
		var gestor = new GestorModelos(elemento);
		var object3D = gestor.getObject3D();

		scene.prepareGestorAcciones(object3D);
		scene.setApplicationMode(MyScene.ADDING_OBJECT);
	});

	// Que no se nos olvide, la primera visualización.
	scene.update();
});
