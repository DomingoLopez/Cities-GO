class Arboles extends ObjetoComplejo {
	constructor() {
		super();

		var cesped = new Cesped();
		this.add(cesped);

		var arbol_1 = new Arbol();
		arbol_1.scale.set(0.5, 0.5, 0.5);
		arbol_1.position.x = 1.5;
		arbol_1.position.z = -1;
		this.add(arbol_1);

		var arbol_2 = new Arbol();
		arbol_2.scale.set(0.5, 0.5, 0.5);
		arbol_2.position.x = -1.5;
		this.add(arbol_2);

		var arbol_3 = new Arbol();
		arbol_3.scale.set(0.3, 0.3, 0.3);
		arbol_3.position.x = 1;
		arbol_3.position.z = 1;
		this.add(arbol_3);

		this.meshArray.push(cesped);
		this.meshArray.push(arbol_1);
		this.meshArray.push(arbol_2);
		this.meshArray.push(arbol_3);
	}
}
