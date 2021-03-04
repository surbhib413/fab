import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LcFormComponent } from './components/lc-form/lc-form.component';


const routes: Routes = [
  {                                          
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: LoginComponent
  },
  // otherwise redirect to home
 // { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
