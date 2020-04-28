import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

declare function openEinstein(): any;
declare function openFibonacci(): any;
declare function openNewton(): any;
declare function openTesla(): any;
declare function openTuring(): any;
declare function openHelp(): any;

@Component({
    selector: 'clicker-chingon',
    templateUrl: './pages/clicker.component.html',
    styleUrls: ['./clicker.component.css']
  })

  export class ClickerComponent implements OnInit{

    puntos:number = 0;
    finJuego:boolean;
    einsteinComprado:boolean = false;
    newtonComprado:boolean = false;
    teslaComprado: boolean = false;
    turingComprado:boolean = false;
    energiaActual:number = 0;
    energiaXClicActual:number = 1;
    energiaXClicPrevio:number = 1;
    energiaXSegundo;
    multiplicadorTotal:number = 0;
    validation:string;
    invitation:string;
  
    //Parametros para coger la informacion de los centeficos 
    i:number = 0;
    descCientifico:string [] = [];
    nombreCientifico:string[] = [];
    rutaImagen:string [] = [];
    ruta:string = 'https://gameserver.centic.ovh';
    preciosCientificos:number [] = [];
    energiasCientificos:number [] = [];
    
    preciosFibonacci = [10, 50, 150, 300];
    indexPrecioActual = 0;
    precioMejoraFibonacci= this.preciosFibonacci[this.indexPrecioActual];

    constructor(private httpClient:HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) {

        this.getCentefico();

    
      }

      ngOnInit(){

        this.help();

      }

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
        
          this.puntos = 25;
          openEinstein();
          this.einsteinComprado = true;
        }
      }
    
      comprarNewton(){
    
        if (this.energiaActual >= this.preciosCientificos[1]){
    
          //Restar el precio de la compra
          this.energiaActual = this.energiaActual - this.preciosCientificos[1];
    
          this.addMultiplicadorXsegundo(10);
          
          this.puntos = 50;
          openNewton();
          this.newtonComprado = true;
        }
      }

      comprarTesla(){
    
        if (this.energiaActual >= this.preciosCientificos[2]){
    
          //Restar el precio de la compra
          this.energiaActual = this.energiaActual - this.preciosCientificos[2];
    
          this.addMultiplicadorXsegundo(15);
          
          this.puntos = 75;
          openTesla();
          this.teslaComprado = true;
        }
      }

      comprarTuring(){
    
        if (this.energiaActual >= this.preciosCientificos[3]){
    
          //Restar el precio de la compra
          this.energiaActual = this.energiaActual - this.preciosCientificos[3];
    
          this.addMultiplicadorXsegundo(20);
        
          this.puntos = 100;
          openTuring();
          this.turingComprado = true;
        }
      }
    
      help(){
    
        
          openHelp();
          
        
      }

      getCentefico(){
        
        this.httpClient.get('https://gameserver.centic.ovh/items?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI',)
        .subscribe(
          (data:any[]) => {
            
            
           for(let i = 0; i<data.length; i++){
            
            this.nombreCientifico[i] = data[i].nombre;
            this.descCientifico[i] = data[i].descripcion;
            this.rutaImagen[i] = this.ruta.concat(data[i].imagen).toString();
            this.energiasCientificos[i] = data[i].energia;
            this.preciosCientificos[i] = data[i].precio;

            }
          }     
        )
    
    
      }

      getPuntos(){
    
        /********************* */
            //CODIGO CORRECTO, DESCOMENTAR CUANDO SE SUBA AL SERVIDOR
        /********************* */
            
            //Cojo el validation de la URL
            this.route.queryParams.subscribe(params => {
              this.validation = params['validation'];
              this.invitation = params['invitation'];
          });
          
          console.log(this.validation);
            /*let headers = new HttpHeaders(
        {
          'invitation': '65ef6b8c-5d4b-11ea-a3da-0242ac120003',
          'validation': this.validation,
          'percent': '50',
          'title': 'Puntos ganados',
          'resume': 'Has ganado puntos con el juego',
          'message': 'Como has jugado al juego dle TCM has recibido puntos por ello'
          
        }
            );*/
        
            this.finJuego = false;
            this.httpClient.post('https://gameserver.centic.ovh/games/send_points', {
              
              invitation: this.invitation,
              validation: this.validation,
              percent: this.puntos,
              title: 'Puntos ganados',
              resume: 'Has ganado puntos con el juego',
              message: 'Como has jugado al juego dle TCM has recibido puntos por ello'
        
        
            })
            .subscribe(
              (data:any) => {
        
                console.log(data);
        
                //if(data.length){
        
                  this.finJuego = true;
        
                //}
        
              }     
            )
           
        
        /*************** */
        //FIN DEL CODIGO CORRECTO, CONTINUA EL CODIGO PLACEHOLDER
        /****************** */
          }
    /*
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
      */
      
      
  }