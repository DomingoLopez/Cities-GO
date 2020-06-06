class Arbol extends THREE.Object3D {
	constructor() {
		super();

		var geocilindro = new THREE.CylinderGeometry();
		var geocono = new THREE.DodecahedronGeometry();

		// Como material se crea uno a partir de un color
		var matcono = new THREE.MeshPhongMaterial({ color: 0x00e400 });
		var matcil = new THREE.MeshPhongMaterial({ color: 0xf0e400 });

		this.meshArray = [];

		this.cono = new THREE.Mesh(geocono, matcono);
		this.cilindro = new THREE.Mesh(geocilindro, matcil);

		this.cono.castShadow = true;
		this.cono.receiveShadow = true;
		this.cilindro.castShadow = true;
		this.cilindro.receiveShadow = true;

		this.cono.position.y = 4;
		this.cilindro.position.y = 2;

		this.cono.scale.set(2.2, 2.1, 2.6);
		this.cilindro.scale.set(0.5, 4, 0.5);

		this.add(this.cono);
		this.add(this.cilindro);

		this.meshArray.push(this.cono);
		this.meshArray.push(this.cilindro);
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
