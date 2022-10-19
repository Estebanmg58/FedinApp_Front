import { Component, OnInit,AfterViewInit,ViewChild,ViewEncapsulation } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AccountService } from '../../services/account.service'
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';


export interface Ahorros {
  Consecutivo: number;
  NombreProducto: string;
  FechaApertura: string;
  FechaVencimiento: string;
  Cuota: string;
  Saldo: string;
  // InteresCausado: string;
}

export interface Creditos {
  NumeroPagare: number;
  NombreLinea: string;
  FechaApertura: string;
  FechaVencimiento: string;
  Plazo: string;
  MontoInicial: string;
  Cuota: string;
  Saldo: string;
}

export interface DataOtros {
  Nombre: string;
  Cuota: string;
  Saldo: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ContentComponent implements OnInit {
  displayedColumns: string[] = ['Consecutivo',  'NombreProducto','FechaApertura','FechaVencimiento','Cuota', 'Saldo'];
  displayedColumnsCredito: string[] = ['NumeroPagare',  'NombreLinea','FechaApertura','FechaVencimiento','Plazo', 'MontoInicial','Cuota','Saldo'];
  displayedColumnsOtrs: string[] = ['Nombre', 'Cuota', 'Saldo'];
  dataSourceAhorros: MatTableDataSource<Ahorros>;
  dataSourceCreditos: MatTableDataSource<Creditos>;
  dataOtros: MatTableDataSource<DataOtros>;
  AhorrosLst: Ahorros[];
  lstAhoros: Ahorros[];
  lstNovedades: DataOtros[];
  lstCreditos: Creditos[];
  SaldoAhorros: string;
  SaldoCredito: string;
  SaldoOtros: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  viewSpinner: boolean = false;
  nomModule='Portafolio';
  constructor(private route: ActivatedRoute,private accountService: AccountService) {
    // Create 100 users
    // this.AhorrosLst = this.getAhorros("1017206678");

   }

  ngOnInit() {
    var NumeroDocumento = this.route.snapshot.paramMap.get("Documento");
    var paramDoc = $("#parmDoc").val();
    // localStorage.setItem('documento', null);
    // if(paramDoc != "" && paramDoc != undefined)
    localStorage.setItem('documento', NumeroDocumento);
    $("#parmDoc").val(NumeroDocumento);
    var NumeroDocumento = $("#parmDoc").val();
    const Ahorros = Array.from({length: 1}, (_, k) => this.getAhorros(NumeroDocumento));
    const Creditos = Array.from({length: 1}, (_, k) => this.getCreditos(NumeroDocumento));
    const Novedades = Array.from({length: 1}, (_, k) => this.getNovedades(NumeroDocumento));

    // const datOtros = Array.from({length: 1}, (_, k) => DataOtros(k + 1));
    // console.log("estos son los resultados del usuario en geenral ")
    // console.log(users)
    // Assign the data to the data source for the table to render
     this.dataSourceAhorros = new MatTableDataSource(Ahorros);
    this.dataSourceCreditos = new MatTableDataSource(Creditos);
    this.dataOtros = new MatTableDataSource(Novedades);

    // this.dataOtros = new MatTableDataSource(datOtros);
    this.getSaldos();
    this.viewSpinner = true;
    setTimeout(() => {
      this.viewSpinner = false;
    }, 3000);
  }


  getAhorros(NumeroDocumento: string): any{
    this.viewSpinner = true;
    this.accountService.getAhorros(
      NumeroDocumento
    ).subscribe(
      (result) => {
        this.viewSpinner = false;

        if(result == "1"){
          localStorage.clear();
          window.location.href = '/#/login';
        }else{
        this.lstAhoros = result;
        return this.lstAhoros;
        }

      },
      (error) => {
        this.viewSpinner = false;
      }
    );
  }

  getCreditos(NumeroDocumento: string): any{
    this.viewSpinner = true;
    this.accountService.getCreditos(
      NumeroDocumento
    ).subscribe(
      (result) => {
        this.viewSpinner = false;
        this.lstCreditos = result;
        return this.lstCreditos;
      },
      (error) => {
        this.viewSpinner = false;
      }
    );
  }

  getNovedades(NumeroDocumento: string): any{
    this.viewSpinner = true;
    this.accountService.getNovedades(
      NumeroDocumento
    ).subscribe(
      (result) => {
        this.viewSpinner = false;
        this.lstNovedades = result;
        return this.lstNovedades;
      },
      (error) => {
        this.viewSpinner = false;
      }
    );
  }

  getSaldos(): any{
    this.viewSpinner = true;
    var NumeroDocumento = $("#parmDoc").val();

    // setTimeout(() => {
    this.accountService.getSaldos(
      NumeroDocumento
    ).subscribe(
      (result) => {
        this.viewSpinner = false;
        this.SaldoAhorros = result.SaldoAhorros;
        this.SaldoCredito = result.SaldoCredito;
        this.SaldoOtros = result.SaldoOtros;

      },
      (error) => {
        this.viewSpinner = false;
      }
    );


    // }, 500);

  }

}
