import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AuthGuard } from '@app/core/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/resetpassword', component: ResetpasswordComponent,canActivate: [AuthGuard] },
]

// const routes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: 'login',
//         loadComponent: () => import('./login/login.component')
//       },
//       {
//         path: 'register',
//         loadComponent: () => import('./register/register.component')
//       }
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
