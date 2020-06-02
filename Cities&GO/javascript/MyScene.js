 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    //Interfaz
    this.gui = this.createGUI ();
    //Luces
    this.createLights ();
    //Camara
    this.createCamera ();
    //Ejes    
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    //Estado de la aplicación
    this.applicationMode = MyScene.NO_ACTION;  

    //Creamos el mapa, pasándole la escena, el ancho y el largo. 
    //Si da tiempo hacemos un formulario donde podamos introducir el ancho y largo deseado
    this.mapa =  new Map(this, 50, 50); //Ancho, largo, y tam de cada cuadrado

    this.add(this.mapa);


  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0 , 30, 70);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 2;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
 


  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
      this.animacion = false;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }


  onMouseDown (event) {
      //this.mapa.resaltaHover(event, MyScene.NO_ACTION);
  }

  onMouseClick(event){

      switch(this.applicationMode){

        case MyScene.ADDING_OBJECT:
          this.mapa.addObject(event);
        break;

      }


  }


  onMouseMove(event){
  
      switch(this.applicationMode){

        case MyScene.ADDING_OBJECT:
          this.mapa.escogiendoZona(event);
        break;


      }

      
  }


  setApplicationMode(estado){
    this.applicationMode = estado;
  }

  setProvisionalMapa(mesh){
    this.mapa.addProvisional(mesh);
  }

  update () {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se muestran o no los ejes según lo que idique la GUI
    this.axis.visible = this.guiControls.axisOnOff;
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
   
    // Se actualiza el resto del modelo

    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
  }
}

/**
 * ESTADOS DE LA ESCENA A TENER EN CUENTA
 */

MyScene.NO_ACTION = 0;
MyScene.ADDING_OBJECT = 1;
MyScene.MOVING_OBJECT = 2;



/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  
  /**
   * LISTENERS DE RATÓN
   */
  window.addEventListener ("mousedown", (event) => scene.onMouseDown(event), true);
  window.addEventListener ("click", (event) => scene.onMouseClick(event), true);
  window.addEventListener ("mousemove", (event) => scene.onMouseMove(event), true);

  /**
   * LISTENERS DE TECLADO
   */
  




  /**
   * LISTENERS DE MENÚ Y JS EN EL HTML
   */

  //Listener para seleccionar un objeto del menú. 
  //Modificamos además el estado de la escena para actuar en función.

  $(".elementos-escena button").click(function(){
    
    var elemento = $(this).val();
    var ajusteY = null;

    var mat = new THREE.MeshBasicMaterial({transparent:true, opacity :0.5, color: 0x2194ce});
    var geom = null;

    switch(elemento){

      case 'casa':

      geom = new THREE.BoxGeometry(5,5,5);
      ajusteY = 2.5;
      break;

      case 'bloque-pisos':
        geom = new THREE.BoxGeometry(5,10,5);
        ajusteY = 5;
      break;

      case 'rascacielos':
        geom = new THREE.BoxGeometry(5,15,5);
        ajusteY = 7.5;
      break;

    }

    var mesh = new THREE.Mesh(geom, mat);
    mesh.position.y = ajusteY;


    scene.setProvisionalMapa(mesh);
    scene.setApplicationMode(MyScene.ADDING_OBJECT);

    
  });




  // Que no se nos olvide, la primera visualización.
  scene.update();


});
