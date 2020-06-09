class ActionStack {
	constructor() {
		//Pila para deshacer
		this.stack = [];

		//Pila para Rehacer
		this.inverseStack = [];
	}

	pushAction(action) {
		this.stack.push(action);
	}

	pushActionInverse(action) {
		this.inverseStack.push(action);
	}

	popAction() {
		var lastAction = this.stack.pop();
		return lastAction;
	}

	popActionInverse() {
		var lastAction = this.inverseStack.pop();
		return lastAction;
	}

	empty() {
		return this.stack.length == 0;
	}

	emptyInverse() {
		return this.inverseStack.length == 0;
	}
}
