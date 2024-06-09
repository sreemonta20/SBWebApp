import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { UserComponent } from './user/user.component';

// const routes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: '',
//         pathMatch: 'full',
//         redirectTo: 'user',
//       },
//       {
//         path: 'user',
//         component: UserComponent,
//         canActivate: [AuthGuard]
//       }
//     ],
//   },
// ];

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
