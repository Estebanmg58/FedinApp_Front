import { Component, OnInit } from '@angular/core';
import { ConsolidateAccountService } from '../../services/consolidate-account.service'
import * as $ from 'jquery';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-consolidated-account',
  templateUrl: './consolidated-account.component.html',
  styleUrls: ['./consolidated-account.component.scss']
})
export class ConsolidatedAccountComponent implements OnInit {

  viewSpinner: boolean = false;
  linkPdf: any;
  nomModule = 'Consolidado estado de cuenta';
  step: Number = 0;
  NumeroDocumento: string;
  constructor(private route: ActivatedRoute,private consolidateAccountService:ConsolidateAccountService) { }

  ngOnInit(): void {
    var NumeroDocumento = this.route.snapshot.paramMap.get("Documento");
    $("#parmDoc").val(NumeroDocumento);
    this.NumeroDocumento = NumeroDocumento;
    this.getPdf();
  }

  setStep(index: number) {
    this.step = index;
  }

  // descargar(){
  //   console.log('descargar');
  // }

  enviarCorreo(){
    this.viewSpinner = true;

    this.consolidateAccountService.sendConsolidadoCuenta(
      this.NumeroDocumento
    ).subscribe(
      (result) => {
        this.viewSpinner = false;
        if(result == "1"){
          localStorage.clear();
          window.location.href = '/#/login';
        }else{
          Swal.fire({
            title: "Se ha enviado exitosamente al correo",
            icon: 'success',
            confirmButtonColor: "#027680",
            allowOutsideClick: false
          })
      }
      },
      (error) => {
        this.viewSpinner = false;
        console.log(error);
      }
    );
  }

  getPdf(){

    this.viewSpinner = true;

    this.consolidateAccountService.getCosolidatedCuenta(
      this.NumeroDocumento
    ).subscribe(
      (result) => {
        this.viewSpinner = false;
        if(result == "1"){
          localStorage.clear();
          window.location.href = '/#/login';
        }else{
          const pdfinBase64 = result.FileStream._buffer;
          this.linkPdf = pdfinBase64;
          const byteArray = new Uint8Array(atob(pdfinBase64).split("").map((char) => char.charCodeAt(0)));
          const newBolb = new Blob([byteArray], { type: "application/pdf" });
          const url = window.URL.createObjectURL(newBolb);
          document.getElementById("EsatadoCuenta").setAttribute("data", url);
          document.getElementById("EsatadoCuenta").setAttribute("name", "movimiento");
        }

        
      },
      (error) => {
        this.viewSpinner = false;
        console.log(error);
      }
    );
  }

  descargarPDF(){
    // var NumeroDocumento = $("#NumeroDocumento").val();
    const linkSource = `data:application/pdf;base64,${this.linkPdf}`;
    const downloadLink = document.createElement("a");
    var fileName = "";

    downloadLink.href = linkSource;
    downloadLink.download = "consolidado_de_cuenta_"+this.NumeroDocumento;
    // this.loading = false;
    downloadLink.click();
  }

}
