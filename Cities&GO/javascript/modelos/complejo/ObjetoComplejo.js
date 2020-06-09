class ObjetoComplejo extends THREE.Object3D {
	//Clase padre de todos los objetos que estan compuestos
	//por otros object3D
	constructor() {
		super();
		this.meshArray = [];
	}

	/*Recorre todo los object3d de los que esta compuesto y asigna userData de los
    / respectivos mesh al modelo jerarquico
    */
	getMeshArray() {
		var mesh = [];
		for (var i = 0; i < this.meshArray.length; i++) {
			var cadaMesh = this.meshArray[i].getMeshArray();
			for (var j = 0; j < cadaMesh.length; j++) {
				var nuevo_mesh = cadaMesh[j];
				nuevo_mesh.userData = this;
				mesh.push(nuevo_mesh);
			}
		}
		return mesh;
	}
}
