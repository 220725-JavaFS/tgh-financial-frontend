import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SendMoneyComponent } from './components/send-money/send-money.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
// Imported a password reset component
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetSendEmailComponent } from './components/password-reset-send-email/password-reset-send-email.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    HomeComponent,
    NavbarComponent,
    SendMoneyComponent,
    UserProfileComponent,
    PasswordResetComponent,
    PasswordResetSendEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
