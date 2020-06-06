class ActionStack{

    constructor(){

        this.stack = [];
        //this.lastAction = null; //Última acción para repetir al pulsar una tecla
        

    }


    pushAction(action){
        this.stack.push(action);
    }

    popAction(){
       var lastAction =  this.stack.pop();
       return lastAction;
    }

    empty(){
        return this.stack.length == 0;
    }

};