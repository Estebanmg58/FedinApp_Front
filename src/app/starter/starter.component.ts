import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { LoginService } from '../services/login.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html'
})

export class StarterComponent implements OnInit, OnDestroy {

  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor(private route: ActivatedRoute,private LoginService: LoginService) { }

  ngOnInit() {
    this.body.classList.add('sidebar-mini');
    var NumeroDocumento = this.route.snapshot.paramMap.get("Documento");
    var paramDoc = $("#parmDoc").val();
    // if(paramDoc != "" && paramDoc != undefined)
    $("#parmDoc").val(NumeroDocumento);

    var DocumentoLocal = localStorage.getItem('documento');
    // if(NumeroDocumento == DocumentoLocal){
    //   // todo ok
    // }else{
    //   window.location.href = "./"; //esta función te saca
    // }


  }

  ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('sidebar-mini');
  }

}


var base_url = 'fake_url';
var timeout;
document.onmousemove = function(){
    clearTimeout(timeout);
    contadorSesion(); //aqui cargamos la funcion de inactividad
}

function contadorSesion() {
   timeout = setTimeout(function () {
    Swal.fire({
      text: "Tu sesión ha finalizado",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        var NumeroDocumento = $("#parmDoc").val();

        //si algo reemplazar por petición ajax
        $.ajax({
          method: "POST",
          url: "https://fedin-api.fedin-web.com/CierraSesion",
          data: { NumeroDocumento: NumeroDocumento }
        });
        setTimeout(() => {
          window.location.href = "./#/"; //esta función te saca
        }, 500);
      }
    })
    }, 500000);

}



