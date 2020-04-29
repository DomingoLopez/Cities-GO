 
class Reloj extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      this.createGUI(gui,titleGui);

    }
    
    createGUI (gui,titleGui) {
        this.guiControls = new function () {

            this.Velocidad = 1.0;
    
            // Un botón para dejarlo todo en su posición inicial
            // Cuando se pulse se ejecutará esta función.
            this.reset = function () {
             this.Velocidad = 1.0;

            }
    
    
    
    
    
          } 
          
          // Se crea una sección para los controles de la caja
          var folder = gui.addFolder (titleGui);
        
          folder.add(this.guiControls, 'Velocidad', -12, 12, 1.0).name ('Velocidad (marcas/s): ').listen();
          gui.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
   


    update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación

      }
  }