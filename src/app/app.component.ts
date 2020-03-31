import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

declare function openEinstein(): any;
declare function openFibonacci(): any;
declare function openNewton(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Prueba';
  //name:string = '';
  puntos:number;
  finJuego:boolean;
  einsteinComprado:boolean = false;
  newtonComprado:boolean = false;
  energiaActual:number = 0;
  energiaXClicActual:number = 1;
  energiaXClicPrevio:number = 1;
  energiaXSegundo;
  multiplicadorTotal:number = 0;

  preciosCientificos = [3, 10, 15];
  energiasCientificos = [5, 10, 15];
  preciosFibonacci = [10, 50, 150, 300];
  indexPrecioActual = 0;
  precioMejoraFibonacci= this.preciosFibonacci[this.indexPrecioActual];

  minutos:number = 4;
  segundos:number = 59;

  tiempoLimite;

  constructor(private httpClient:HttpClient) {

    this.tiempoLimite = setInterval(() => {this.timer()}, 1000);

  }

  timer(): void{
    if(--this.segundos < 0){
      this.segundos = 59;
      if(--this.minutos < 0){
        /*this.minutos = 2;
        this.segundos = 59;
*/      
        clearInterval(this.tiempoLimite);
        this.getPuntos();
      }
      }
  }
  
 /* onNameKeyUp(event:any){
    this.puntos = event.target.value;
    this.found = false;
  }*/

  addEnergia(){

    this.energiaActual = this.energiaActual + this.energiaXClicActual;


  }

  mejorarClicker(){

    if(this.energiaActual >= this.precioMejoraFibonacci){

      if(this.indexPrecioActual == 0){

        openFibonacci()
  
      }

      //Restar el precio de la compra
      this.energiaActual = this.energiaActual - this.precioMejoraFibonacci;


      //Este clic genera mas, y guardamos el valor para la siguiente compra
      this.energiaXClicActual = this.energiaXClicActual + this.energiaXClicPrevio;
      this.energiaXClicPrevio = this.energiaXClicActual - this.energiaXClicPrevio;

      //Ahora la proxima compra cuesta mas
      this.precioMejoraFibonacci = this.preciosFibonacci[++this.indexPrecioActual];

    }



  }

   addMultiplicadorXsegundo(multiplicador: number){

    //Paramos el contador
    clearInterval(this.energiaXSegundo);

    //Actualizamos el total/Segundo
    this.multiplicadorTotal = this.multiplicadorTotal + multiplicador;

    this.energiaXSegundo = setInterval(() => {this.generarXSegundo()}, 1000);

  }

  generarXSegundo(){

    this.energiaActual = this.energiaActual + this.multiplicadorTotal;

  }

  comprarEinstein(){

    if (this.energiaActual >= this.preciosCientificos[0]){

      //Restar el precio de la compra
      this.energiaActual = this.energiaActual - this.preciosCientificos[0];

      this.addMultiplicadorXsegundo(5);
    
      openEinstein();
      this.einsteinComprado = true;
    }
  }

  comprarNewton(){

    if (this.energiaActual >= this.preciosCientificos[1]){

      //Restar el precio de la compra
      this.energiaActual = this.energiaActual - this.preciosCientificos[1];

      this.addMultiplicadorXsegundo(10);
    
      openNewton();
      this.newtonComprado = true;
    }
  }

  getPuntos(){

    let headers = new HttpHeaders();
    headers = headers.set('invitation', '65ef6b8c-5d4b-11ea-a3da-0242ac120003');

    this.finJuego = false;
    this.httpClient.get('https://gameserver.centic.ovh/games/info/', {headers})
    .subscribe(
      (data:any) => {

        console.log(data);

        //if(data.length){

          this.puntos = data.config.percent;
          this.finJuego = true;

        //}

      }     
    )
  }

}
