class AceraFarola extends THREE.Object3D {
	constructor() {
		super();

		this.acera = new Acera();
		var ac = this.acera.getMeshBase();

		this.farola = new Farola();
		//this.farola.position.y = 1;
		this.farola.position.z = -1;
		this.farola.scale.set(0.8, 0.8, 0.8);

		var childFarola = this.farola.getMeshArray();

		this.add(childFarola[0]); childFarola[0].userData = this;
		this.add(childFarola[1]); childFarola[1].userData = this;
		this.add(ac); ac.userData = this;

		this.meshArray = [];
		this.meshArray.push(ac);
		this.meshArray.push(childFarola[0]);
		this.meshArray.push(childFarola[1]);

		var light = new THREE.SpotLight(0xeffe00, 4, 7);
		light.position.set(0, 3.2, 0.6);
		light.target = ac;
		light.penumbra = 0.1;
		light.decay = 2;
		this.add(light);
	}

	getMeshArray() {
		/*var mesh = [];
		for (var i = 0; i < this.meshArray.length; i++) {
			var cadaMesh = this.meshArray[i].getMeshArray();
			for (var j = 0; j < cadaMesh.length; j++) {
				var nuevo_mesh = cadaMesh[j];
				nuevo_mesh.userData = this;
				mesh.push(nuevo_mesh);
			}
		}
		return mesh;*/


		return this.meshArray;
	}

	update() {
		//this.rotation.y += 0.01;
		//this.scale.set(, 0.05, 0.05);
		//this.obj.rotation.x += 0.02;
	}
}
