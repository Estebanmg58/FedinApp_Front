import { Component, OnInit,DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-starter-main-side-bar',
  templateUrl: './main-side-bar.component.html',
  styleUrls: ['./main-side-bar.component.scss']
})
export class MainSideBarComponent implements OnInit {
  NumeroDocumento: string;
  constructor(private route: ActivatedRoute) {

   }

  ngOnInit() {

    var NumeroDocumento = this.route.snapshot.paramMap.get("Documento");
    var DocumentoLocal = localStorage.getItem('documento');

    if(DocumentoLocal != "null" && DocumentoLocal != undefined){
      var DocumentoLocal = localStorage.getItem('documento');
      this.NumeroDocumento = DocumentoLocal;
    }else{

      localStorage.setItem('documento', NumeroDocumento);
      this.NumeroDocumento = NumeroDocumento

    }


    $("#parmDoc").val(this.NumeroDocumento);
  }



}
