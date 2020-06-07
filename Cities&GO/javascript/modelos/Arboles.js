class Arboles extends THREE.Object3D {
	constructor() {
		super();

		this.cesped = new Cesped();
		this.add(this.cesped);

		this.arbol_1 = new Arbol();
		this.arbol_1.scale.set(0.5, 0.5, 0.5);
		this.arbol_1.position.x = 1.5;
		this.arbol_1.position.z = -1;
		this.add(this.arbol_1);

		this.arbol_2 = new Arbol();
		this.arbol_2.scale.set(0.5, 0.5, 0.5);
		this.arbol_2.position.x = -1.5;
		this.add(this.arbol_2);

		this.arbol_3 = new Arbol();
		this.arbol_3.scale.set(0.3, 0.3, 0.3);
		this.arbol_3.position.x = 1;
		this.arbol_3.position.z = 1;
		this.add(this.arbol_3);

		this.meshArray = [];
		this.meshArray.push(this.cesped);
		this.meshArray.push(this.arbol_1);
		this.meshArray.push(this.arbol_2);
		this.meshArray.push(this.arbol_3);
	}

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

	update() {
		//this.rotation.y += 0.01;
		//this.scale.set(, 0.05, 0.05);
		//this.obj.rotation.x += 0.02;
	}
}
