//Esta clase es una clase que crea objetos de tipo cientifico, se usaran para guardar los valores recogidos mediante la peticion get items del postman.
//Los atributos tienen el mismo nombre que en los JSON de cientifico del postman.
export class Cientifico{

   public id: string;             
   public nombre: string;
   public descripcion:string;
   public imagen: string;      
   public energia: number;
   public precio: number;

    constructor(id: any, nombre: string, desc: string, imagen: string, energia: number, precio: number){
        
            this.id = id;               
            this.nombre = nombre;
            this.descripcion = desc;
            this.imagen = imagen;       
            this.energia = energia;
            this.precio = precio;

    }



}