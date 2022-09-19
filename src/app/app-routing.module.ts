import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
// Imported the password-reset component
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'home', component: HomeComponent },
  // Created a new path for the pass-word reset page
<<<<<<< HEAD
  { path: 'confirm-reset', component: PasswordResetComponent }
=======
  { path: 'confirm-reset', component: PasswordResetComponent },
  { path: 'forgot', component: PasswordResetSendEmailComponent }
>>>>>>> 50573b2b86370c34d5778c20eceb1b8e0f77ef58
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
