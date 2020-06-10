class Casa extends ObjetoSimple {
	constructor() {
		super();

		var shape = new THREE.Shape();
		shape.lineTo(1.8, 0);
		shape.lineTo(0, 1);
		shape.lineTo(-1.8, 0);

		var color = new Colores();

		var material = new THREE.MeshPhongMaterial({ color: color.getColorCasa() });
		var extrudeSettings = {
			steps: 1,
			depth: 4,
			bevelEnabled: false
		};

		var geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);

		this.tejado = new THREE.Mesh(geo, material);
		this.tejado.position.z = -2;
		this.tejado.position.y = 2;

		this.add(this.tejado);

		material = new THREE.MeshPhongMaterial({ color: 0xeeeeee });
		var caja = new THREE.Mesh(new THREE.BoxGeometry(3, 4, 3), material);
		this.add(caja);

		this.tejado.userData = this;
		caja.userData = this;

		this.tejado.castShadow = true;
		this.tejado.receiveShadow = true;
		caja.castShadow = true;
		caja.receiveShadow = true;

		this.meshArray.push(this.tejado);
		this.meshArray.push(caja);
	}


	getTejado(){
		return this.tejado;
	}
}
