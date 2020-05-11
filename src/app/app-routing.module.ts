import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PantallaVictoriaComponent } from '../app/pantalla-victoria/pantalla-victoria.component'


const routes: Routes = [
  {path: 'Victoria', component: PantallaVictoriaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
