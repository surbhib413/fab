import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { LcFormComponent } from './components/lc-form/lc-form.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AccountServiceLandingComponent } from './components/account-service-landing/account-service-landing.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'lcForm/:uuid',
        component: LcFormComponent,
      },
      {
        path: 'lcForm',
        component: LcFormComponent,
      }
    ]
  },
  {
    path: 'accountService',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AccountServiceLandingComponent
      },
      // {
      //   path: 'accountDetails',
      //   component: AccountDetailsComponent,
      // },
      {
        path: 'accountDetails/transaction',
        component: TransactionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }