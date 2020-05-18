import { Component, OnInit } from '@angular/core';
import { ClickerComponent } from '../juego/clicker.component';

@Component({
  selector: 'app-pantalla-victoria',
  templateUrl: './pantalla-victoria.component.html',
  styleUrls: ['./pantalla-victoria.component.css']
})
export class PantallaVictoriaComponent implements OnInit {

  constructor(private clickercomponent: ClickerComponent) { }

  ganar0:boolean=false;
  ganar1:boolean=false;
  ganar2:boolean=false;
  ganar3:boolean=false;
  ganar4:boolean=false;
  puntos:number;

  //Metodo que se encarga de mostrar una imagen diferente en funcion de las mejoras compradas
  ngOnInit(): void {

    console.log(this.clickercomponent.puntos);
    this.puntos=this.clickercomponent.puntos;
    //Ningun cientifico
    if(this.clickercomponent.puntos==0)
    this.ganar0=true;
    //1 Cientifico
    if(this.clickercomponent.puntos==25)
    this.ganar1=true;
    //2 Cientificos
    if(this.clickercomponent.puntos==50)
    this.ganar2=true;
    //3 Cientificos
    if(this.clickercomponent.puntos==75)
    this.ganar3=true;
    //4 Cientificos (Todas las mejoras)
    if(this.clickercomponent.puntos==100)
    this.ganar4=true;
  
  }

}
