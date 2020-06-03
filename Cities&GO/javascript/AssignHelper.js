class AssignHelper extends THREE.Mesh {
	constructor() {

        super(new THREE.CylinderGeometry(0.5,0.5,30, 32), new THREE.MeshBasicMaterial({ color: 0x58ce21, transparent:true, opacity: 0.4 }));
        this.position.y = 15;
        this.colorCorrecto = 0x58ce21;
        this.colorError = 0xce2121;
	}

	getColorCorrecto() {
		return this.colorCorrecto;
    }
    
    getColorError() {
		return this.colorError;
    }
    
    setColorCorrecto(){
        this.material.color = new THREE.Color(this.colorCorrecto);
    }

    setColorError(){
        this.material.color = new THREE.Color(this.colorError);
    }
}
