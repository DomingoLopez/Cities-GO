class Cesped extends ObjetoSimple {
	constructor() {
		super();

		var c = new Colores();
		var colorCesped = c.getColorCesped();

		var cesped = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshPhongMaterial({ color: colorCesped })
		);

		var ajusteY = 0.05;
		cesped.position.y = ajusteY;
		cesped.name = 'cesped';
		cesped.receiveShadow = true;

		cesped.userData = this;
		this.add(cesped);
		this.meshArray.push(cesped);
	}
}
