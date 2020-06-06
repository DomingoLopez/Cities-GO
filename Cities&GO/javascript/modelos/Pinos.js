class Pinos extends THREE.Object3D {
	constructor() {
		super();

		this.cesped = new Cesped();
		this.add(this.cesped);

		this.meshArray = [];
		this.meshArray.push(this.cesped);

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				var pino = new Pino();
				pino.scale.set(0.5, 0.5, 0.5);
				pino.position.x = -1.8 + j * 1.7;
				pino.position.z = -1.8 + i * 1.7;
				this.add(pino);
				this.meshArray.push(pino);
			}
		}
		/*
		this.pino_1 = new Pino();
		this.pino_1.scale.set(0.5, 0.5, 0.5);
		this.pino_1.position.x = 1.5;
		this.add(this.pino_1);

		this.pino_2 = new Pino();
		this.pino_2.scale.set(0.5, 0.5, 0.5);
		this.pino_2.position.x = -1.5;
		this.add(this.pino_2);

		this.pino_3 = new Pino();
		this.pino_3.scale.set(0.3, 0.3, 0.3);
		this.pino_3.position.x = 1;
		this.pino_3.position.z = 1;
		this.add(this.pino_3);

		this.meshArray = [];
		this.meshArray.push(this.cesped);
		this.meshArray.push(this.pino_1);
		this.meshArray.push(this.pino_2);
		this.meshArray.push(this.pino_3);*/
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
