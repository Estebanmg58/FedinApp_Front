import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [HeaderComponent,FooterComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ],
  providers: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
