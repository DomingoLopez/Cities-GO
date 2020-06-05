class SkyBox extends THREE.Object3D {
	constructor() {
        super();

        this.geomSkyBox = new THREE.SphereGeometry(800,50,50);

        var loader = new THREE.TextureLoader();
    	var textura = loader.load ("../imgs/Skybox3.jpg");
        
        this.skybox = new THREE.Mesh(this.geomSkyBox, new THREE.MeshPhongMaterial({map:textura, side : THREE.DoubleSide}));

        this.add(this.skybox);

	}






	update(){

    }
}
