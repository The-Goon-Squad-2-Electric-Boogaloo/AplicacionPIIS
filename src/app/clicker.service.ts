import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Cientifico } from './cientifico';
import { Observable, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ClickerService {

  //Variables para la peticion de getPuntos
  puntos:number = 0;
  finJuego:boolean;

  //Variables para recoger los campos de los cientificos de la API mediante la peticion getCientifico
  descCientifico:string [] = [];
  nombreCientifico:string[] = [];
  rutaImagen:string [] = [];
  ruta:string = 'https://gameserver.centic.ovh';
  preciosCientificos:number [] = [];
  energiasCientificos:number [] = [];
  public cientificos:Cientifico [] = [];
  public cientifico1: Cientifico;


  constructor(private httpClient:HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

    getCientificos(): Observable<HttpResponse<Cientifico[]>>{
         return this.httpClient.get<Cientifico[]>('https://gameserver.centic.ovh/items?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI', { observe: 'response' });

        }


getPuntos(validation: string, invitation: string, puntos: number): Observable<Boolean>{
    /*
      this.route.queryParams.subscribe(params => {
        this.validation = params['validation'];
        this.invitation = params['invitation'];
    });
    */
     return this.httpClient.post<Boolean>('https://gameserver.centic.ovh/games/send_points', {
        
        invitation: invitation,
        validation: validation,
        percent: puntos,
        title: 'Puntos ganados',
        resume: 'Has ganado puntos con el juego',
        message: 'Como has jugado al juego dle TCM has recibido puntos por ello'
  
  
      })
      /*
      .subscribe(
        (data:any) => {
  
          console.log(data);

  
            this.finJuego = true;
  

  
        }     
      )
      */  
}

}
