import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {

  @Input('nomModule') nomModule: string;

  textoInicioSesion: string;
  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
    var NumeroDocumento = $("#parmDoc").val();

    // setTimeout(() => {
    this.LoginService.getUltimaVez(
      NumeroDocumento
    ).subscribe(
      (result) => {

        if(result == "1"){
          localStorage.clear();
          window.location.href = '/#/login';
        }else{
        result;
        this.textoInicioSesion = 'Bienvenido(a) '+result.Nombre +'. Su último ingreso fue: '+result.UltimaVez;
        }
      },
      (error) => {
      }
    );
  }
}

