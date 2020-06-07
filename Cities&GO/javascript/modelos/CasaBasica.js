class CasaBasica extends THREE.Object3D {
	constructor() {
		super();
		/*
		//Casa
		var geom = new THREE.BoxGeometry(2, 2, 3);
		var mat = new THREE.MeshPhongMaterial({ color: 0xffffff });

		this.casa = new THREE.Mesh(geom, mat);
		this.casa.position.y = 1;

		this.meshVentana1 = this.createVentana();
		this.meshCristal = this.createCristal();

		this.meshMarcoPuerta = this.createMarcoPuerta();
		this.meshPuerta = this.createInteriorPuerta();

		this.meshTejado = this.createTejado();
		this.meshSuelo = this.createSuelo();

		//Ajuste Ventana
		this.meshVentana1.rotation.y = Math.PI / 2;
		this.meshVentana1.position.x = 1;
		this.meshVentana1.position.y = 1;

		this.meshCristal.rotation.y = Math.PI / 2;
		this.meshCristal.position.x = 1;
		this.meshCristal.position.y = 1;

		//Ajuste Puerta
		this.meshMarcoPuerta.position.y = 0.35;
		this.meshMarcoPuerta.position.z = 1.55;

		this.meshPuerta.position.y = 0.3;
		this.meshPuerta.position.z = 1.55;

		//Ajuste tejado
		this.meshTejado.rotation.y = Math.PI / 4;
		this.meshTejado.position.y = 0.5 + 2;
		this.meshTejado.position.z = -0.5;

		//Ajuste suelo
		this.meshSuelo.position.y = 0.05;

		//Añadimos la variable userData
		this.casa.userData = this;
		this.meshVentana1.userData = this;
		this.meshCristal.userData = this;
		this.meshMarcoPuerta.userData = this;
		this.meshPuerta.userData = this;
		this.meshTejado.userData = this;
		this.meshSuelo.userData = this;

		//Añadimos casteo de sombras
		this.casa.castShadow = true;
		this.meshVentana1.castShadow = true;
		this.meshMarcoPuerta.castShadow = true;
		this.meshPuerta.castShadow = true;
		this.meshCristal.castShadow = true;
		this.meshTejado.castShadow = true;
		this.meshSuelo.castShadow = true;

		this.casa.receiveShadow = true;
		this.meshVentana1.receiveShadow = true;
		this.meshMarcoPuerta.receiveShadow = true;
		this.meshPuerta.receiveShadow = true;
		this.meshCristal.receiveShadow = true;
		this.meshTejado.receiveShadow = true;
		this.meshSuelo.receiveShadow = true;

		this.add(this.casa);
		this.add(this.meshVentana1);
		this.add(this.meshCristal);
		this.add(this.meshMarcoPuerta);
		this.add(this.meshPuerta);
		this.add(this.meshTejado);
		this.add(this.meshSuelo);

		this.meshArray = [
			this.casa,
			this.meshVentana1,
			this.meshCristal,
			this.meshMarcoPuerta,
			this.meshPuerta,
			this.meshTejado,
			this.meshSuelo
		];*/

		var cesped = new Cesped();
<<<<<<< HEAD
		var casa = new Casa();
		this.add(cesped);
		this.add(casa);

		this.meshArray = [];
		this.meshArray.push(cesped);
		this.meshArray.push(casa);
=======
		var base = cesped.getMeshBase();
		base.userData = this;
		this.add(base);

		this.meshArray = [];
		this.meshArray.push(base);
		this.meshArray.push(cone);
		this.meshArray.push(caja);
>>>>>>> 3fbd060b5873a225bb324176b8bcbe8f58aaaa60
	}

	getMeshArray() {
		var mesh = [];
		for (var i = 0; i < this.meshArray.length; i++) {
			var cadaMesh = this.meshArray[i].getMeshArray();
			for (var j = 0; j < cadaMesh.length; j++) {
				var nuevo_mesh = cadaMesh[j];
				nuevo_mesh.userData = this;
				mesh.push(nuevo_mesh);
			}
		}
		console.log(mesh);
		return mesh;
	}

	createVentana() {
		//Crear un cilindro, después otro con un poco menos de radio y restarlos
		var geom1 = new THREE.BoxGeometry(0.5, 0.5, 0.05);
		var geom2 = new THREE.BoxGeometry(0.2, 0.2, 0.05);
		var geom3 = new THREE.BoxGeometry(0.2, 0.2, 0.05);
		var geom4 = new THREE.BoxGeometry(0.2, 0.2, 0.05);
		var geom5 = new THREE.BoxGeometry(0.2, 0.2, 0.05);

		geom2.translate(-0.125, 0.125, 0);
		geom3.translate(-0.125, -0.125, 0);
		geom4.translate(0.125, 0.125, 0);
		geom5.translate(0.125, -0.125, 0);

		//Se colocan donde deben estar

		//Se pasan a nodos BSP
		var nodoBSP1 = new ThreeBSP(geom1);
		var nodoBSP2 = new ThreeBSP(geom2);
		var nodoBSP3 = new ThreeBSP(geom3);
		var nodoBSP4 = new ThreeBSP(geom4);
		var nodoBSP5 = new ThreeBSP(geom5);
		//Se realizan las operaciones
		var resultado = nodoBSP1.subtract(nodoBSP2);
		var resultado = resultado.subtract(nodoBSP3);
		var resultado = resultado.subtract(nodoBSP4);
		var resultado = resultado.subtract(nodoBSP5);

		var mat = new THREE.MeshPhongMaterial({
			flatShading: false,
			wireframe: false,
			side: THREE.DoubleSide,
			color: 0x0
		});
		//Se combierte en un mesh
		var resultadoMesh = resultado.toMesh(mat);

		//var resultadoMesh = nodoBSP2.toMesh()

		//Se computan los vectores normales para finalizar
		resultadoMesh.geometry.computeFaceNormals();
		resultadoMesh.geometry.computeVertexNormals();

		return resultadoMesh;
	}

	createCristal() {
		var geom = new THREE.BoxGeometry(0.5, 0.5, 0.01);
		var mat = new THREE.MeshPhysicalMaterial({ color: 0xa3ff, clearcoat: 1, emissive: 0x72a72, shininess: 100 });
		var mesh = new THREE.Mesh(geom, mat);

		return mesh;
	}

	createMarcoPuerta() {
		var geom1 = new THREE.BoxGeometry(0.4, 0.7, 0.05);
		var geom2 = new THREE.BoxGeometry(0.3, 0.7, 0.05);

		geom2.translate(0, -0.1, 0);

		//Se colocan donde deben estar

		//Se pasan a nodos BSP
		var nodoBSP1 = new ThreeBSP(geom1);
		var nodoBSP2 = new ThreeBSP(geom2);

		//Se realizan las operaciones
		var resultado = nodoBSP1.subtract(nodoBSP2);

		var mat = new THREE.MeshPhongMaterial({
			flatShading: false,
			wireframe: false,
			side: THREE.DoubleSide,
			color: 0x0
		});
		//Se combierte en un mesh
		var resultadoMesh = resultado.toMesh(mat);

		//var resultadoMesh = nodoBSP2.toMesh()

		//Se computan los vectores normales para finalizar
		resultadoMesh.geometry.computeFaceNormals();
		resultadoMesh.geometry.computeVertexNormals();

		return resultadoMesh;
	}

	createInteriorPuerta() {
		var geom = new THREE.BoxGeometry(0.3, 0.6, 0.01);
		var mat = new THREE.MeshPhysicalMaterial({ color: 0x603900, clearcoat: 1, emissive: 0xf0f03 });
		var mesh = new THREE.Mesh(geom, mat);

		return mesh;
	}

	createTejado() {
		var geom = new THREE.ConeGeometry(1.4, 1, 4);
		var mat = new THREE.MeshPhongMaterial({ color: 0x2d110c, clearcoat: 1, emissive: 0xf0f03 });
		var mesh = new THREE.Mesh(geom, mat);

		return mesh;
	}

	createSuelo() {
		var geom = new THREE.BoxGeometry(5 / 1.5, 0.1, 5 / 1.5);
		var mat = new THREE.MeshPhongMaterial({ color: 0xffe0b6 });
		var mesh = new THREE.Mesh(geom, mat);

		return mesh;
	}

	update() {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
		// Primero, el escalado
		// Segundo, la rotación en Z
		// Después, la rotación en Y
		// Luego, la rotación en X
		// Y por último la traslación
	}
}
