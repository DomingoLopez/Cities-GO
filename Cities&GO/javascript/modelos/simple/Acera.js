class Acera extends ObjetoSimple {
	constructor() {
		super();

		var c = new Colores();
		var colorAcera = c.getColorAcera();

		var acera = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.5, 5),
			new THREE.MeshPhongMaterial({ color: colorAcera })
		);

		var ajusteY = 0.25;
		acera.position.y = ajusteY;
		acera.name = 'acera';
		acera.receiveShadow = true;

		acera.userData = this;
		this.add(acera);
		this.meshArray.push(acera);
	}
}
