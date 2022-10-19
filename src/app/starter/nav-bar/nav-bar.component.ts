import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-starter-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public viewSpinner:Boolean = false;
  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }
  cerrarSesion(){
    // this.cerrarSesion()
    localStorage.clear();


    var NumeroDocumento = $("#parmDoc").val();

    //si algo reemplazar por petición ajax
    $.ajax({
      method: "POST",
      url: "https://fedin-api.fedin-web.com/CierraSesion", 
      data: { NumeroDocumento: NumeroDocumento }
    });
    console.log('Metodo logout');
    this.viewSpinner = true;
    setTimeout(() => {
      window.location.href='/#/login'
      this.viewSpinner = false;
    }, 1040);
  }
}
