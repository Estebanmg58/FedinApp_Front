import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsolidateAccountService {

  private REST_API_SERVER = "https://fedin-api.fedin-web.com";
  // private REST_API_SERVER = "https://localhost:44314";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-type": "Application/json",
      })
  };
  constructor(private httpClient: HttpClient) { }

  getCosolidatedCuenta(NumeroDocumento:any) {
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/getPdfConsolidadoCuenta?Documento='+NumeroDocumento,
      this.httpOptions
    )
    .pipe(retry(1));
  }

  sendConsolidadoCuenta(NumeroDocumento:any) {
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/sendConsolidadoCuenta?Documento='+NumeroDocumento,
      this.httpOptions)
    .pipe(retry(1));
  }

}
