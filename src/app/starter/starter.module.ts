import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StarterRoutingModule } from './starter-routing.module';
import { StarterComponent } from './starter.component';
import { ContentComponent } from './content/content.component';
import { MainSideBarComponent } from './main-side-bar/main-side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ConsolidatedAccountComponent } from './consolidated-account/consolidated-account.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '@shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [StarterComponent,
    ContentComponent,
    MainSideBarComponent,
    NavBarComponent,
    ConsolidatedAccountComponent,
    PerfilComponent,
    AccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarterRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class StarterModule { }
