class Arbol extends ObjetoSimple {
	constructor() {
		super();

		var geocilindro = new THREE.CylinderGeometry();
		var geohojas = new THREE.DodecahedronGeometry();

		var matcil = new THREE.MeshPhongMaterial({ color: 0xf0e400 });
		var mathojas = new THREE.MeshPhongMaterial({ color: 0x00e400 });

		var cilindro = new THREE.Mesh(geocilindro, matcil);
		this.hojas = new THREE.Mesh(geohojas, mathojas);

		this.hojas.castShadow = true;
		this.hojas.receiveShadow = true;
		cilindro.castShadow = true;
		cilindro.receiveShadow = true;

		this.hojas.position.y = 4;
		cilindro.position.y = 2;

		this.hojas.scale.set(2.2, 2.1, 2.6);
		cilindro.scale.set(0.5, 4, 0.5);

		this.add(this.hojas);
		this.add(cilindro);

		this.meshArray.push(this.hojas);
		this.meshArray.push(cilindro);
	}


	getHojas(){
		return this.hojas;
	}


}
