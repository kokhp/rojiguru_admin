import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './modules/employee/employee/employee.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent, // it was employee component before here
},
{
  path: 'employee',
  component: EmployeeComponent
},
{
  path: 'user-detail/:id',
  component: UserDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
