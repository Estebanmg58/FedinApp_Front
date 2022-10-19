import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private REST_API_SERVER = "https://fedin-api.fedin-web.com";
  // private REST_API_SERVER = "https://localhost:44314";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-type": "Application/json",
      })
  };

  constructor(private httpClient: HttpClient) { }

  getAhorros(NumeroDocumento:any) {
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/getAhorros?Documento='+NumeroDocumento,
      this.httpOptions
    )
    .pipe(retry(1));
  }

  getCreditos(NumeroDocumento:any) {
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/getCreditos?Documento='+NumeroDocumento,
      this.httpOptions
    )
    .pipe(retry(1));
  }

  getNovedades(NumeroDocumento:any){
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/getNovedades?Documento='+NumeroDocumento,
      this.httpOptions
    )
    .pipe(retry(1));
  }

  getSaldos(NumeroDocumento:any) {
    return this.httpClient.get<any>(
      this.REST_API_SERVER + '/getSaldos?Documento='+NumeroDocumento,
      this.httpOptions
    )
    .pipe(retry(1));
  }

  ActualizaInfo(Documento, Data, TipoActualizacion) {
      return this.httpClient.post<any>(
        this.REST_API_SERVER + '/ActualizaInfo',
        {
          Documento: Documento,
          Data: Data,
          TipoActualizacion: TipoActualizacion
        },
        this.httpOptions
      )
      .pipe(retry(1));
  }


}
