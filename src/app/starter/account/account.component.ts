import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AccountService } from '../../services/account.service'
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import {LoginService} from '../../services/login.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  CelularForm = new FormControl('', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
  ClaveInicial = new FormControl('', [Validators.required]);
  ClaveFinal = new FormControl('', [Validators.required]);


  viewSpinner: boolean = false;
  matcher = new MyErrorStateMatcher();
  hide = true;
  nomModule='Actualizar datos';
  selected: any = "";
  NumeroDocumento: string;
  constructor(private route: ActivatedRoute,private accountService: AccountService, private loginService: LoginService) { }

  ngOnInit(): void {
    var NumeroDocumento = this.route.snapshot.paramMap.get("Documento");
    this.NumeroDocumento = NumeroDocumento;
    $("#parmDoc").val(NumeroDocumento);
    

  }

  guardarRegistro(f: NgForm){

  }

  ActualizaInfo(){
    this.viewSpinner = true;
    var info = "";

    var TipoActualiza = 0;

    if(this.selected == 'email'){
      info = $("#emailValue").val();
      TipoActualiza = 1;
    }
    if(this.selected == 'celular'){
      info = $("#Celular").val();
      TipoActualiza = 2;
    }

    if(this.selected == 'clave'){
    var clave = $("#ClaveNv").val();
    var claveAnterior = $("#ConfirmClave").val();
    if(clave == ""){
      Swal.fire({
        title: 'Por favor verifica la información',
        icon: 'warning',
        confirmButtonColor: "#027680",
        allowOutsideClick: false
      })
      this.viewSpinner = false;

    }else if(claveAnterior == "" ){
      Swal.fire({
        title: 'Por favor verifica la información',
        icon: 'warning',
        confirmButtonColor: "#027680",
        allowOutsideClick: false
      })
      this.viewSpinner = false;

    }else if(clave != claveAnterior){

      Swal.fire({
        title: 'Las contraseñas no coinciden',
        icon: 'warning',
        confirmButtonColor: "#027680",
        allowOutsideClick: false
      })

      this.viewSpinner = false;

    }else{
      this.loginService.ActualizarClave(this.NumeroDocumento,claveAnterior).subscribe(
        (result) => {
          if(result){
            Swal.fire({
              title: 'Contraseña actualizada correctamente',
              icon: 'success',
              confirmButtonColor: "#027680",
              allowOutsideClick: false
            })
            this.viewSpinner = false;
            $("#ClaveNv").val("");
            $("#ConfirmClave").val("");
          }
          else{
            Swal.fire({
              title: 'La contraseña no puede ser igual a la antigua',
              icon: 'warning',
              confirmButtonColor: "#027680",
              allowOutsideClick: false
            })
            this.viewSpinner = false;

          }

        },
        (error) => {
          const errorMessage = <any>error;
          console.log(errorMessage);
          this.viewSpinner = false;

        }
      );
    }
    }else{
      if(TipoActualiza == 1 && (info == "" || info == undefined || info == null)){
        Swal.fire({
          title: 'El email es obligatorio',
          icon: 'warning',
          confirmButtonColor: "#027680",
          allowOutsideClick: false
        })
        this.viewSpinner = false;

      }else if(TipoActualiza == 2 && (info == "" || info == undefined || info == null || isNaN(Number(info)))){
        Swal.fire({
          title: 'Ingrese un número valido',
          icon: 'warning',
          confirmButtonColor: "#027680",
          allowOutsideClick: false
        })
        this.viewSpinner = false;

      }else{
        this.accountService.ActualizaInfo(this.NumeroDocumento,info, TipoActualiza).subscribe(
          (result) => {
            if (result) {
              this.viewSpinner = false;
              Swal.fire({
                title: 'La información ha sido actualizada',
                icon: 'success',
                confirmButtonColor: "#027680",
                allowOutsideClick: false
              })
              $("#emailValue").val("");
              $("#Celular").val("");
            } else {
              this.viewSpinner = false;
              Swal.fire({
                title: 'Ha ocurrido un error actualizando tu información',
                icon: 'error',
                confirmButtonColor: "#027680",
                allowOutsideClick: false
              })

            }

          },
          (error) => {
            this.viewSpinner = false;
            const errorMessage = <any>error;
            console.log(errorMessage);
          }
        );
      }

    }







  }

}
