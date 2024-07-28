import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagersComponent } from './managers/managers.component';
import { EmployeesComponent } from './employees/employees.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'managers', component: ManagersComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
      { path: '', component: WelcomeComponent, pathMatch: 'full' } // Default to Welcome
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
