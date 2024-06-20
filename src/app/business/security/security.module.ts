import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { SecurityRoutingModule } from './security-routing.module';
import { AppUserRoleComponent } from './appuserrole/appuserrole.component';


@NgModule({
  declarations: [
    AppUserRoleComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SecurityModule { }
