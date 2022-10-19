import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarterComponent } from './starter.component';
import { ConsolidatedAccountComponent } from './consolidated-account/consolidated-account.component';
import { AccountComponent } from './account/account.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  {
    path: 'starter',
    component: StarterComponent,
    children: [
      {
        path: 'home/:Documento',
        component: ContentComponent
      },
      {
        path: 'consolidate/:Documento',
        component: ConsolidatedAccountComponent
      },
      {
        path: 'update-account/:Documento',
        component: AccountComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarterRoutingModule { }
