import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {LoginService} from '../services/login.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-remember-password',
  templateUrl: './remember-password.component.html',
  styleUrls: ['./remember-password.component.scss']
})
export class RememberPasswordComponent implements OnInit {
  hide = true;
  hidev = true;
  constructor(private route: ActivatedRoute, private loginService: LoginService) { }


  public YearNow: any;
  // public claveAnteriorValida: Boolean = false;
  // public claveNuevaValida: Boolean = false;
  public Documento:any;
  // public claveAnterior:any;
  // public clave:any;
  ngOnInit(): void {

    var token = '';//this.route.snapshot.paramMap.get("token");
    this.Documento = this.route.snapshot.paramMap.get("Num");

  }
  ngDoCheck() {
  }

  ActualizarClave(){
    var clave = $("#ClaveNueva").val();
    var claveAnterior = $("#claveAnterior").val();

    // falta validar campos
    if(clave == ""){
      Swal.fire({
        title: 'Por favor verifica la información',
        icon: 'warning',
        confirmButtonColor: "#027680",
        allowOutsideClick: false
      })

    }else if(claveAnterior == "" ){
      Swal.fire({
        title: 'Por favor verifica la información',
        icon: 'warning',
        confirmButtonColor: "#027680",
        allowOutsideClick: false
      })
    }else if(clave != claveAnterior){

      Swal.fire({
        title: 'Las contraseñas no coinciden',
        icon: 'warning',
        confirmButtonColor: "#027680",
        allowOutsideClick: false
      })
      $("#ClaveNueva").val("");
      $("#claveAnterior").val("");

    }else{

      this.loginService.ActualizarClave(this.Documento,claveAnterior).subscribe(
        (result) => {
          if(result){
            Swal.fire({
              title: 'Contraseña actualizada correctamente',
              icon: 'success',
              confirmButtonColor: "#027680",
              allowOutsideClick: false
            })
            setTimeout(() => {
              window.location.href='/#/login'
            }, 1040);

          }
          else{
            Swal.fire({
              title: 'La contraseña no puede ser igual a la antigua',
              icon: 'warning',
              confirmButtonColor: "#027680",
              allowOutsideClick: false
            })
          }

        },
        (error) => {
          const errorMessage = <any>error;
          console.log(errorMessage);
        }
      );
    }


  }


}
