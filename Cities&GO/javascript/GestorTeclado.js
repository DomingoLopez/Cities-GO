class GestorTeclado{

    constructor(gestorAcciones,camara){

        this.gestorAcciones = gestorAcciones;

        this.camaraObject3D = camara;

        this.camera = camara.getCamera();

    }


    //control
	onKeyDown(event) {
		
		var xSpeed = 1;
		var ySpeed = 1;
        var rotationSpeed = 0.025;
        
        var keyCode = event.which;

		switch (keyCode) {
			//w
			case 87:
				this.camera.position.z -= ySpeed;
				break;
			//s
			case 83:
				this.camera.position.z += ySpeed;
				break;
			//up
			case 38:
				this.camaraObject3D.rotation.x -= rotationSpeed;
				break;
			//down
			case 40:
				this.camaraObject3D.rotation.x += rotationSpeed;
				break;
			//izq
			case 37:
				this.camaraObject3D.rotation.y -= rotationSpeed;
				break;
			//der
			case 39:
				this.camaraObject3D.rotation.y += rotationSpeed;
				break;
			case 65:
				this.camera.position.x -= xSpeed;
				break;
			case 68:
				this.camera.position.x += xSpeed;
				break;
			case 90:
				this.camera.position.y += ySpeed;
				break;
			case 88:
				this.camera.position.y -= ySpeed;
				break;
			//Espacio
			case 32:
				this.camera.position.set(0, 30, 70);
                break;
            
            //SUPRIMIR
            case 46:

                this.gestorAcciones.deleteORcancel();

                break;

		}
	}



};