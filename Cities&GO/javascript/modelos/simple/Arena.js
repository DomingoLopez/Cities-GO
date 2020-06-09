class Arena extends ObjetoSimple {
	constructor() {
		super();

		var c = new Colores();
		var colorArena = c.getColorArena();

		this.arena = new THREE.Mesh(
			new THREE.BoxGeometry(5, 0.1, 5),
			new THREE.MeshPhongMaterial({ color: colorArena })
		);

		var ajusteY = 0.05;
		this.arena.position.y = ajusteY;
		this.arena.name = 'arena';
		this.arena.receiveShadow = true;

		this.arena.userData = this;
		this.add(this.arena);
		this.meshArray.push(this.arena);
	}
}
