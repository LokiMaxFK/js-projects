
// Declaración de clase
class Mascota{
    #direccionPrivada;
    #nombreResponsable;

    constructor(nombre, edad, sexo, direccion){
        this.#direccionPrivada = direccion;
        this.nombre = nombre;
        this.edad = edad;
        this.sexo = sexo;
    }

    static nombresPopulares = ["Coco", "Thor", "Max", "Rocky", "Toby"];

    static obtenerNombre(){

        const numeroMaximo = this.nombresPopulares.length-1;
        const numeroRandom = Math.round(Math.random() * numeroMaximo);

        return this.nombresPopulares[numeroRandom];
    }

    get nombreResponsable(){

        if(!this.#nombreResponsable){
            return "No hay un dueño registrado";
        }

        return this.#nombreResponsable;
    }

    set nombreResponsable(nombre){
       
        if(typeof nombre !== "string" || nombre.trim().length < 6){
            return "Nombre no valido, debe ser un string y mayor a 6 carácteres.";
        }

        this.#nombreResponsable = nombre;

    }


    correr(){
        console.log(`¡${this.nombre} ha ladrado!, corre.`);
    }

    saludar(){
        console.log(`Mi nombre es ${this.nombre} y tengo ${this.edad}
            estos meses de edad y soy ${this.sexo} y mi dirección es ${this.#direccionPrivada}`);
    }

}

class Perro extends Mascota{

    constructor(nombre, edad, sexo, raza){
        super(nombre, edad, sexo);
        this.raza = raza;
    }

    ladrar(){
        console.log(`He ladrado`);
    }

    saludar(){
        super.saludar();
        console.log(`Mi raza es ${this.raza}`);
    }

}

const loki = new Mascota("Loki", 24, "Macho", "Direccion Real #50");
console.log( loki.nombreResponsable );
console.log( loki.nombreResponsable = "Jordan Alex" );
console.log( loki.nombreResponsable );
