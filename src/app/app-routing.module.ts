import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './modules/employee/employee/employee.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent, // it was employee component before here
},
{
  path: 'employee',
  component: EmployeeComponent,
  canActivate: [AuthGuardGuard],
},
{
  path: 'user-detail/:id',
  component: UserDetailComponent,
  canActivate: [AuthGuardGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
