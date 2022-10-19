import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private REST_API_SERVER = "https://fedin-api.fedin-web.com";  
  // private REST_API_SERVER = "https://localhost:44314";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-type": "Application/json",
      })
  };
  constructor(private httpClient: HttpClient) { }


  validaDocumento(NumeroDocumento:any) {
    return this.httpClient.post<any>(
      this.REST_API_SERVER + '/ValidaDocumento',
      {NumeroDocumento: NumeroDocumento},
      this.httpOptions
    )
    .pipe(retry(1));
  }

  CerrarSesion(NumeroDocumento:any) {
    return this.httpClient.post<any>(
      this.REST_API_SERVER + '/CierraSesion',
      {NumeroDocumento: NumeroDocumento},
      this.httpOptions
    )
    .pipe(retry(1));
  }


  getUltimaVez(NumeroDocumento){
    return this.httpClient.get<any>(this.REST_API_SERVER + '/getUltimaVez?Documento='
     + NumeroDocumento,this.httpOptions).pipe(retry(1));
  }

  validaToken(token:any,NumeroDocumento:any) {
    return this.httpClient.post<any>(
      this.REST_API_SERVER + '/validaToken',
      {Token: token,
      NumeroDocumento: NumeroDocumento},
      this.httpOptions
    )
    .pipe(retry(1));
  }

  RecuperarClave(NumeroDocumento:any) {
    return this.httpClient.post<any>(
      this.REST_API_SERVER + '/RecuperarClave',
      {NumeroDocumento: NumeroDocumento},
      this.httpOptions
    )
    .pipe(retry(1));
  }

  IniciarSesion(NumeroDocumento:any, Clave:any) {
    return this.httpClient.post<any>(
      this.REST_API_SERVER + '/ValidaUsuario',
      {
        NumeroDocumento: NumeroDocumento,
       Clave: Clave
      },
      this.httpOptions
    )
    .pipe(retry(1));
  }

  ActualizarClave(NumeroDocumento: any, Clave:any){
    return this.httpClient.post<any>(
      this.REST_API_SERVER + '/NuevaClave',
      {NumeroDocumento: NumeroDocumento,
        Clave: Clave},
      this.httpOptions
    )
    .pipe(retry(1));
  }

  Prueba(){
    return this.httpClient.get<any>(this.REST_API_SERVER + '/Prueba',this.httpOptions).pipe(retry(1));
  }
}
