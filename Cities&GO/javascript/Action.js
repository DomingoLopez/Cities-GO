class Action{ //Vamos a implementar nuestra propia clase Stack

 
    constructor(tipo, opciones){
        this.type = tipo; //Tipo de acción
        this.options = opciones; //Array de opciones

    }



    getType(){
        return this.type;
    }

    getOptions(){
        return this.options;
    }


};


Action.INSERTAR = 100; //En options hay que guardar el uuid del object3D, para poder borrarlo.
Action.MOVER = 101; //En options hay que guardar la posición inicial, y la final del objeto3D, así como su uuid, para volver a colocarlo en la posicion incial
Action.BORRAR = 102;//En options hay que guardar la posición donde estaba el objeto, así como el tipo de objeto, para volver a crearlo, ó hacer un clone del objeto
Action.GIRAR = 103; //Hay que guardar en options el uuid del objet3D para girarlo en sentido contrario