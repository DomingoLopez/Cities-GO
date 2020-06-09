class ObjetoSimple extends THREE.Object3D {
	//Clase padre de todos los objetos que solo estan compuestos por mesh
	constructor() {
		super();
		this.meshArray = [];
	}

	getMeshArray() {
		return this.meshArray;
	}
}
