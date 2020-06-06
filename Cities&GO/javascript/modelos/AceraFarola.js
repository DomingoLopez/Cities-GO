class AceraFarola extends THREE.Object3D {
	constructor() {
		super();

		this.acera = new Acera();
		this.add(this.acera);

		this.farola = new Farola();
		//this.farola.position.y = 1;
		this.farola.position.z = -1;
		this.farola.scale.set(0.8, 0.8, 0.8);

		this.add(this.farola);

		this.meshArray = [];
		this.meshArray.push(this.acera);
		this.meshArray.push(this.farola);

		var light = new THREE.SpotLight(0xeffe00, 4, 7);
		light.position.set(0, 3.2, 0.6);
		light.target = this.acera;
		light.penumbra = 0.1;
		light.decay = 2;
		this.add(light);
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
		console.log(mesh);
		return mesh;
	}

	update() {
		//this.rotation.y += 0.01;
		//this.scale.set(, 0.05, 0.05);
		//this.obj.rotation.x += 0.02;
	}
}
