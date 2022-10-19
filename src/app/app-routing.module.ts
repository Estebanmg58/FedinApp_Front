import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RememberPasswordComponent } from './remember-password/remember-password.component'
import { StarterRoutingModule } from './starter/starter-routing.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recuperarClave/:Num/:token', component: RememberPasswordComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),StarterRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
