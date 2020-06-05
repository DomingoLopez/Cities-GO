class SkyBox extends THREE.Object3D {
	constructor() {
        super();

        this.geomSkyBox = new THREE.SphereGeometry(5000,50,50);
        //this.geomSkyBox = new THREE.BoxGeometry(5000,5000,5000);
        var loader = new THREE.TextureLoader();
    	var textura = loader.load ("../imgs/Skybox3.jpg");
        //textura.mapping = THREE.CubeReflectionMapping;
        this.skybox = new THREE.Mesh(this.geomSkyBox, new THREE.MeshPhongMaterial({map:textura, side : THREE.DoubleSide}));

        this.add(this.skybox);

	}






	update(){

    }
}
