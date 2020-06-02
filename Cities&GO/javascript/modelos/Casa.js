class Casa extends THREE.Object3D {
	constructor() {
		super();

		var random = Math.floor(Math.random() * 3) + 1;

		// Un Mesh se compone de geometría y material
		var boxGeom = new THREE.BoxGeometry(5, 5, 5);
		// Como material se crea uno a partir de un color (elegido entre tres)

		var colores = [ 0xfebcc8, 0xffffd8, 0xeaebff ];
		var boxMat = new THREE.MeshPhongMaterial({ color: colores[random] });

		// Ya podemos construir el Mesh
		this.caja = new THREE.Mesh(boxGeom, boxMat);
		// Y añadirlo como hijo del Object3D (el this)
		this.add(this.caja);
	}
}
