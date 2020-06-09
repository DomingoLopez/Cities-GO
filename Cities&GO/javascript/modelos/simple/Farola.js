class Farola extends ObjetoSimple {
	constructor() {
		super();

		var geocilindro = new THREE.CylinderGeometry();

		var geocono = new THREE.DodecahedronGeometry();
		// Como material se crea uno a partir de un color
		var mat = new THREE.MeshPhongMaterial({
			color: 0xffffff
		});

		var cono = new THREE.Mesh(geocono, mat);
		var cilindro = new THREE.Mesh(geocilindro, mat);

		cono.castShadow = true;
		cono.receiveShadow = true;
		cilindro.castShadow = true;
		cilindro.receiveShadow = true;

		cono.position.y = 3.8;
		cono.position.z = 0.8;
		cilindro.position.y = 2;

		cono.scale.set(0.6, 0.3, 1);
		cilindro.scale.set(0.2, 4, 0.2);

		this.add(cono);
		this.add(cilindro);

		this.meshArray.push(cono);
		this.meshArray.push(cilindro);

		/*
		var light = new THREE.SpotLight(0xeffe00, 1, 3, 1.5708);
		light.position.set(0, 5, 2.5);
		this.add(light);*/
	}
}
