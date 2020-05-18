import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';

//declare function openEinstein(): any;
//declare function openFibonacci(): any;
//declare function openNewton(): any;
//declare function openHelp(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clicker Energía';

}
