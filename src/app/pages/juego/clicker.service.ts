import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Cientifico } from '../../class/cientifico';
import { Observable, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ClickerService {

  constructor(private httpClient:HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

    //Metodo que llama a la funcion get items de POSTMAN, se hace mediante la URL y una peticion tipo get. Devuelve un array de cientificos al componente
    getCientificos(): Observable<HttpResponse<Cientifico[]>>{
         return this.httpClient.get<Cientifico[]>('https://gameserver.centic.ovh/items?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5bmFtZSI6InVjYW0yIiwiZ2FtZSI6InVjYW0yIiwidXNlcm5hbWUiOiJ1Y2FtMiIsImlhdCI6MTU4Mzc3NzU5Nn0.IuHEXQ1fSHJuGdqo-POT8TEVY38U5UOC_bIy61ldcRI', { observe: 'response' });

        }


    //Metodo que llama a la funcion send points del postman, se necesita pasarle los parametros del usuario y el porcentaje de puntos que va a obtener.
    //Devuelve un Boolean. Se realiza mediante una peticion post.
    getPuntos(validation: string, invitation: string, puntos: number): Observable<Boolean>{

        return this.httpClient.post<Boolean>('https://gameserver.centic.ovh/games/send_points', {
            
            invitation: invitation,
            validation: validation,
            //Porcentaje de puntos obtenidos
            percent: puntos,
            title: 'Puntos ganados',
            resume: 'Has ganado puntos con el juego',
            message: 'Como has jugado al juego dle TCM has recibido puntos por ello'
      
      
          })

    }

}
