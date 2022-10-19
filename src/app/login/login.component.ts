import { Component, OnInit, DoCheck } from '@angular/core';
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { LoginService } from '../services/login.service'
import { Observable } from 'rxjs';
import { XsegundoService, valorReloj } from '../services/hour.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit, DoCheck {
  hide = true;
  mensajeSeguridad= false;
  viewSpinner: boolean = false;
  datos: Observable<valorReloj>;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  ampm: string;
  segundos: string;

  constructor(private LoginService: LoginService,
    public segundo: XsegundoService) { }

  public YearNow: any;
  public btnContinuar: Boolean = true;
  public validaDocumento: Boolean = false;
  public validaClave: Boolean = false;
  public validaDocumento2: Boolean = false;
  public NumeroDocumento: any;
  public Email: any;
  ngOnInit(): void {

    this.datos = this.segundo.getInfoReloj();
    this.datos.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo
    });
  }

  ngDoCheck() {
    var date = new Date();
    var year = date.getFullYear();
    var mes = date.getMonth();
    var dia = date.getDay();
    // date.getHours();
    // date.getMinutes();
    // date.getSeconds();
    this.YearNow = date.toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
    });
  }

  public ValidExist() {

    var documento = $("#numDocumento").val();

    this.NumeroDocumento = documento;

    if (documento != "" && documento != undefined) {
      this.validaDocumento = false;
      $("#btnSiguiente").val("Cargando...");
      this.LoginService.validaDocumento(documento).subscribe(
        (result) => {
          if (!result.Existe) {
            Swal.fire({
              title: 'El número de documento: <b>' + documento + '</b> no existe',
              icon: 'warning',
              confirmButtonColor: "#027680",
              allowOutsideClick: false
            })
            localStorage.setItem('documento', null);
            $("#numDocumento").val("");
            $("#btnSiguiente").val("Siguiente");
            console.log(result.Email)
            this.Email = result.Email;
          } else {
            localStorage.setItem('documento', null);
            if(result.Email == "" || result.Email == null || result.Email == undefined){
              Swal.fire({
                title: 'No se ha encontrado un email registrado',
                icon: 'warning',
                confirmButtonColor: "#027680",
                allowOutsideClick: false
              })
              $("#btnSiguiente").val("Siguiente");
            }else{
              localStorage.setItem('documento', documento);
              this.Email = result.Email;
              this.btnContinuar = false;
              $("#numDocumento").val("");
              $("#btnSiguiente").val("Siguiente");
              console.log(result.Email)
            }
          }

        },
        (error) => {
          const errorMessage = <any>error;
          console.log(errorMessage);
          $("#btnSiguiente").val("Siguiente");
        }
      );
    } else {
      this.validaDocumento = true;
    }

  }


  Regresar() {
    this.btnContinuar = true;
  }

  RecuperarClave() {
    var NumeroDocumento = this.NumeroDocumento;
    if (NumeroDocumento != "" && NumeroDocumento != undefined) {
      this.validaDocumento2 = false;
      $("#btnEnviar").val("Cargando...");
      this.LoginService.validaDocumento(NumeroDocumento).subscribe(
        (result) => {
          if (!result) {
            Swal.fire({
              title: 'El número de documento: <b>' + NumeroDocumento + '</b>, no existe',
              icon: 'warning',
              confirmButtonColor: "#027680",
              allowOutsideClick: false
            })
            $("#numDocumento2").val("");
            $("#btnEnviar").val("Enviar");
          } else {
            this.LoginService.RecuperarClave(NumeroDocumento).subscribe(
              (result) => {
                Swal.fire({
                  title: result,
                  icon: 'success',
                  confirmButtonColor: "#027680",
                  allowOutsideClick: false
                })
                $("#segundaX").click();
                $("#btnEnviar").val("Enviar");
                // $("#numDocumento2").val("");
              },
              (error) => {
                const errorMessage = <any>error;
                console.log(errorMessage);
                $("#btnEnviar").val("Enviar");
              }
            );
          }
        },
        (error) => {
          const errorMessage = <any>error;
          console.log(errorMessage);
          $("#btnEnviar").val("Enviar");
        }
      );

    } else {
      this.validaDocumento2 = true;
    }
  }

  IniciarSesion() {
    var clave = $("#Clave").val();
    if (clave != "" && clave != undefined) {
      this.validaClave = false;
      this.LoginService.IniciarSesion(this.NumeroDocumento, clave).subscribe(
        (result) => {
          if (!result) {
            Swal.fire({
              title: 'Contraseña incorrecta, por favor ingrese nuevamente.',
              icon: 'error',
              confirmButtonColor: "#027680",
              allowOutsideClick: false
            })
            $("#Clave").val("");
          } else {
            $("#Clave").val("");
            // $("#IniciaStarter").click();
            // $("#NumeroDocumento").val(this.NumeroDocumento);
            window.location.href = '/#/starter/home/'+this.NumeroDocumento
          }

        },
        (error) => {
          const errorMessage = <any>error;
          console.log(errorMessage);
        }
      );
    } else {
      this.validaClave = true;
    }
  }

}
