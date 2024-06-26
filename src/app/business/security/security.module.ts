import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgxSpinnerModule } from 'ngx-spinner';
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
    FormsModule,
    NgxSpinnerModule,
  ]
})
export class SecurityModule { }
