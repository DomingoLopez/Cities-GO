class Farola extends THREE.Object3D {
	constructor() {
		super();

		var geocilindro = new THREE.CylinderGeometry();
		var geoesfera = new THREE.SphereGeometry();

		var geocono = new THREE.DodecahedronGeometry();
		// Como material se crea uno a partir de un color
		var mat = new THREE.MeshPhongMaterial({
			color: 0xffffff
		});

		this.cono = new THREE.Mesh(geocono, mat);
		this.cilindro = new THREE.Mesh(geocilindro, mat);

		this.cono.castShadow = true;
		this.cono.receiveShadow = true;
		this.cilindro.castShadow = true;
		this.cilindro.receiveShadow = true;

		this.cono.position.y = 3.8;
		this.cono.position.z = 0.8;
		this.cilindro.position.y = 2;

		this.cono.scale.set(0.6, 0.3, 1);
		this.cilindro.scale.set(0.2, 4, 0.2);

		this.add(this.cono);
		this.add(this.cilindro);

		this.meshArray = [];
		this.meshArray.push(this.cono);
		this.meshArray.push(this.cilindro);
		/*
		var light = new THREE.SpotLight(0xeffe00, 1, 3, 1.5708);
		light.position.set(0, 5, 2.5);
		this.add(light);*/
	}

	getMeshArray() {
		return this.meshArray;
	}

	update() {
		//this.rotation.y += 0.01;
		//this.scale.set(, 0.05, 0.05);
		//this.obj.rotation.x += 0.02;
	}
}
