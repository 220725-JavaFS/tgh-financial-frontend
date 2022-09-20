import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
// Imported the password-reset component
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetSendEmailComponent } from './components/password-reset-send-email/password-reset-send-email.component';
import { SendMoneyComponent } from './components/send-money/send-money.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'send-money', component: SendMoneyComponent },
  { path: 'home', component: HomeComponent },
  // Created a new path for the pass-word reset page

  { path: 'confirm-reset', component: PasswordResetComponent },
  { path: 'forgot', component: PasswordResetSendEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
