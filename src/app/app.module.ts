import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RememberPasswordComponent } from './remember-password/remember-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from './material.module';
import { XsegundoService } from './services/hour.service';
import { StarterModule } from './starter/starter.module';
// import { NgxInactivityDetectorModule } from 'ngx-inactivity-detector';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RememberPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    StarterModule
  ],
  providers: [XsegundoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
