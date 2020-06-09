class Agua extends ObjetoSimple {
	constructor() {
		super();

		var loader = new THREE.TextureLoader();
		var textura = loader.load('../imgs/agua2.jpg');

		var agua = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshPhongMaterial({ map: textura, color: 0xffffff })
		);

		var ajusteY = 0.05;
		agua.position.y = ajusteY;
		agua.name = 'agua';

		agua.userData = this;
		this.add(agua);
		this.meshArray.push(agua);
	}
}
