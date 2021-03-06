import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickerComponent } from './pages/juego/clicker.component';
import {HttpClientModule} from '@angular/common/http';
import { PantallaVictoriaComponent } from './pages/pantalla-victoria/pantalla-victoria.component';
@NgModule({
  declarations: [
    AppComponent,
    ClickerComponent,
    PantallaVictoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
