class Pino extends ObjetoSimple {
	constructor() {
		super();

		var geocilindro = new THREE.CylinderGeometry();
		var geocono = new THREE.ConeGeometry();

		// Como material se crea uno a partir de un color
		var matcono = new THREE.MeshPhongMaterial({ color: 0x00e400 });
		var matcil = new THREE.MeshPhongMaterial({ color: 0xf0e400 });

		var cono = new THREE.Mesh(geocono, matcono);
		var cilindro = new THREE.Mesh(geocilindro, matcil);

		cono.castShadow = true;
		cono.receiveShadow = true;
		cilindro.castShadow = true;
		cilindro.receiveShadow = true;

		cono.position.y = 4;
		cilindro.position.y = 2;

		cono.scale.set(2, 5, 2);
		cilindro.scale.set(0.5, 4, 0.5);

		this.add(cono);
		this.add(cilindro);

		this.meshArray.push(cono);
		this.meshArray.push(cilindro);
	}
}
