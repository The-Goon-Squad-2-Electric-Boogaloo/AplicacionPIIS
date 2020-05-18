import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClickerService } from'./clicker.service';
import { Cientifico } from '../../class/cientifico';

//Funciones en java script para abrir los pop-up en el html cuando se hace click en un boton de compra o en el boton de ayuda
declare function openCientifico0(): any;
declare function openFibonacci(): any;
declare function openCientifico1(): any;
declare function openCientifico2(): any;
declare function openCientifico3(): any;
declare function openHelp(): any;

@Component({
    selector: 'juego-clicker',
    templateUrl: './clicker.component.html',
    styleUrls: ['./clicker.component.css']
  })

  export class ClickerComponent implements OnInit{

    //Porcentaje de puntos a obtener en la API de Centic, se incializa a 0, se actualiza segun los cientificos que se han comprado
    puntos:number = 0;

    //Token para indicar el final del juego
    finJuego:boolean;

    //Tokens para saber cuando mostrar que cientfico se puede comprar segun cuales se han comprado
    cientifico0Comprado:boolean = false;
    cientifico1Comprado:boolean = false;
    cientifico2Comprado: boolean = false;
    cientifico3Comprado:boolean = false;
    esconder:boolean = false;
    foundganar:boolean = false;
    tiempoLimite;

    //Variable que llevara la cuenta de la energia actual del jugador
    energiaActual:number = 0;

    //Variables para la generacion por click y por segundo
    energiaXClicActual:number = 1;
    energiaXClicPrevio:number = 1;
    energiaXSegundo;
    multiplicadorTotal:number = 0;

    //Tokens obtenidos para la funcion Getpuntos, que hace la peticion send point en la API del postman
    validation:string;
    invitation:string;
  
    //Parametros para coger la informacion de los centeficos desde la API
    i:number = 0;
    rutaImagen:string [] = [];
    ruta:string = 'https://gameserver.centic.ovh';

    //Array de cientificos
    cientificos: Cientifico[] = [];
   
    //Variables estaticas para ir variando el precio de fibonacci
    preciosFibonacci = [10, 50, 150, 300];
    indexPrecioActual = 0;
    precioMejoraFibonacci= this.preciosFibonacci[this.indexPrecioActual];

    //Variable para la peticion GetCientificos para obtener los headers
    headers: string[];

    //Constructor del componente
    constructor(private httpClient:HttpClient, private sanitizer: DomSanitizer, private rutaGanar: Router, private route: ActivatedRoute, private clickerService: ClickerService) {

        //Ejecuta en el incio de la aplicacion el metodo para obtener los cientificos. Es necesario para el html y que el juego basicamente pueda funcionar.
        this.getCientifico();
        this.tiempoLimite = setTimeout(() => {this.help()}, 1000);

      }

      ngOnInit(){

        console.log("Iniciando");

      }


    //Metodo para añadir energia a la variable actual mediante clicks en el boton.
    addEnergia(){

        this.energiaActual = this.energiaActual + this.energiaXClicActual;
      }
    
    
    //Metodo que se encarga de mejorar la energia por click obtenida
      mejorarClicker(){
    
        //Comprueba si el jugador tiene la energia suficiente para poder comprar la mejora de energia por click de fibonacci
        if(this.energiaActual >= this.precioMejoraFibonacci){
    
          //Si es la primera vez que se compra, se mostrara un pop-up con la informacion de fibonacci
          if(this.indexPrecioActual == 0){
    
            openFibonacci()
      
          }
    
          //Restar el precio de la compra a la energia actual del jugador
          this.energiaActual = this.energiaActual - this.precioMejoraFibonacci;
    
    
          //Este clic genera mas, y guardamos el valor para la siguiente compra
          this.energiaXClicActual = this.energiaXClicActual + this.energiaXClicPrevio;
          this.energiaXClicPrevio = this.energiaXClicActual - this.energiaXClicPrevio;
    
          //Ahora la proxima compra cuesta mas
          this.precioMejoraFibonacci = this.preciosFibonacci[++this.indexPrecioActual];
    
        }
    
    
    
      }
    
      //Metodo para añadir energia por segundo
       addMultiplicadorXsegundo(multiplicador: number){
    
        //Paramos el contador
        clearInterval(this.energiaXSegundo);
    
        //Actualizamos el total/Segundo
        this.multiplicadorTotal = this.multiplicadorTotal + multiplicador;
    
        this.energiaXSegundo = setInterval(() => {this.generarXSegundo()}, 1000);
    
      }
    
      //Metodo que suma energia por segundo segun el valor de this.multiplicadorTotal
      generarXSegundo(){
    
        this.energiaActual = this.energiaActual + this.multiplicadorTotal;
    
      }
    

      //Metodo de comprar al cientifico en la primera posicion del array, este metodo basicamente, aumenta la energia por segundo obtenida en 5
      comprarCientifico0(){
    
        //Primero comprueba si la energia actual es igual o mayor al preico del cientifico
        if (this.energiaActual >= this.cientificos[0].precio){
    
          //Restar el precio de la compra
          this.energiaActual = this.energiaActual - this.cientificos[0].precio;
    
          //Se llama a la funcion para aumentar la energia por segundo, se le pasa un 5 para aumentarla en 5
          this.addMultiplicadorXsegundo(5);
        
          //Se actualiza el porcentaje de los puntos que va a obtener el jugador si termina el juego, en este caso obtendria un 25% de los puntos
          this.puntos = 25;
          
          //Se abre un pop-up con la información del cientifico
          openCientifico0();

          //Se actualiza el token para que el juego sepa que ya se ha comprado a Einstein
          this.cientifico0Comprado = true;
        }
      }
    
      //Los tres siguientes metodos son iguales que el anterior, asi que se van a comentar solo las cosas que varian un poco, pero la idea es la misma

      comprarCientifico1(){
    
        if (this.energiaActual >= this.cientificos[1].precio){
    
          //Restar el precio de la compra
          this.energiaActual = this.energiaActual - this.cientificos[1].precio;
    
          //Se llama a la funcion para aumentar la energia por segundo, se le pasa un 10 para aumentarla en 10
          this.addMultiplicadorXsegundo(10);
          
          //Se actualiza el porcentaje de los puntos que va a obtener el jugador si termina el juego, en este caso obtendria un 50% de los puntos
          this.puntos = 50;
          openCientifico1();
          this.cientifico1Comprado = true;
        }
      }

      compraroCientifco2(){
    
        if (this.energiaActual >= this.cientificos[2].precio){
    
          //Restar el precio de la compra
          this.energiaActual = this.energiaActual - this.cientificos[2].precio;
    
          //Se llama a la funcion para aumentar la energia por segundo, se le pasa un 15 para aumentarla en 15
          this.addMultiplicadorXsegundo(15);
          
          //Se actualiza el porcentaje de los puntos que va a obtener el jugador si termina el juego, en este caso obtendria un 75% de los puntos
          this.puntos = 75;
          openCientifico2();
          this.cientifico2Comprado = true;
        }
      }

      comprarCientifico3(){
    
        if (this.energiaActual >= this.cientificos[3].precio){
    
          //Restar el precio de la compra
          this.energiaActual = this.energiaActual - this.cientificos[3].precio;
    
          //Se llama a la funcion para aumentar la energia por segundo, se le pasa un 20 para aumentarla en 20
          this.addMultiplicadorXsegundo(20);
        
          //Se actualiza el porcentaje de los puntos que va a obtener el jugador si termina el juego, en este caso obtendria un 100% de los puntos
          this.puntos = 100;
          openCientifico3();
          this.cientifico3Comprado = true;
        }
      }
    
      //Metodo para abrir el pop-up con la informacion de tutorial para el jugador
      help(){
        
          openHelp();    
        
      }

      //Este metodo se encarga de abrir la pagina cuando el jugador termina el juego
      abrirPagina(nombrePagina:string):void{
        this.rutaGanar.navigate([`${nombrePagina}`]);  //Funciona como es debido

        //Con estos tokens se indica que se puede esconder el html que muestra el juego, y asi se muestra solo la pagina cuando el usuario acaba el juego
        this.foundganar=true;
        this.esconder=true;
      }

    
      //Metodo para obtener los cientificos mediante la peticion get items del postman.
      getCientifico(){
            
        //Se realiza la peticion mediante un metodo dentro de un service, este service devuelve un Observable que es un array de cientificos, este metodo
        //realiza la peticion get items mediante una URL.
        this.clickerService.getCientificos()
        //Mediante el subscribe, se va a recorer la respuesta de la peticion
        .subscribe(
          resp => {
            console.log(resp);
            const keys = resp.headers.keys();
            this.headers = keys.map(key =>
              `${key}: ${resp.headers.get(key)}`);

              //Variable para recorrer los diferentes cientificos devueltos por la respuesta de la peticion
              let i = 0;
            //En este for se recorren todos los cientificos que estan dentro del body de la respuesta de la peticion, que en este cason son cientificos en
            //objetos JSON.
            for (const data of resp.body) {
              //Se guarda cada cientifico en el array de cientificos declarado anteriormente
                this.cientificos[i]  = new Cientifico(i, data.nombre, data.descripcion, this.ruta.concat(data.imagen).toString(), data.energia, data.precio);
              //Se aumenta para pasar al siguiente cientifico JSON de la respuesta de la peticion
                i++;
            }



          }
          )

    //Para saber que se han cargado bien los cientificos en el array
    //console.log(this.cientificos);

    }

    //Metodo para obtener puntos en la aplicacion del CENTIC segun el numero de cientificos comprados durante el juego. Este metodo
    //se activa cuando el usuario termina el juego.
    getPuntos(){
    
      //Parametros obtenidos cuando el usuario ingresa al juego mediante la aplicacion del juego
      this.route.queryParams.subscribe(params => {
        this.validation = params['validation'];
        this.invitation = params['invitation'];
    });

      //Se pone el token del fin del juego en false y se llama a la peticion send points del postmanm, esta peticion se hace en un service, se le pasan
      //los parametros y el token, este metodo del service devuelve un observable de tipo boleeano
      this.finJuego = false;
      this.clickerService.getPuntos(this.validation, this.invitation, this.puntos)
      .subscribe(
        (data:any) => {
  
          console.log(data);

            //Se pone el token a true y se abre la pagina de Victoria metiante el metodo de abrir pagina
            this.finJuego = true;
            this.abrirPagina('Victoria');

  
        }     
      )
      
}

    //Funcion que se ejecuta una vez compradas todas las mejoras
    todosComprados(){
      this.abrirPagina('Victoria');
    }

    
  }