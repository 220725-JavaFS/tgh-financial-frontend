import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { DarkmodeService } from './darkmode.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = environment.url+'auth';
  loggedIn: boolean = false;

  constructor(private http: HttpClient, private darkmode: DarkmodeService) { }

  //Testing Example in corresponding spec.ts
  login(email: string, password: string): Observable<User> {
    const creds = {email: email, password: password};
    const payload = JSON.stringify(creds);
    return this.http.post<User>(this.authUrl+'/login', payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  forgotPassword(email: string): Observable<User> {
    const creds = {email: email};
    const payload = JSON.stringify(creds);
    return this.http.post<User>(this.authUrl+'/forgot', payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    localStorage.removeItem('current-user');
    localStorage.removeItem('current-account');
    this.darkmode.changeMode('false');
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(email: string, password: string): Observable<any> {
    const payload = {email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  resetPassword(user: User): Observable<any> {
    const payload = user;
    return this.http.put<any>(`${this.authUrl}/reset-password`, payload, {headers: environment.headers});
  }

  sendTokenBack(token: string): Observable<any> {
    const payload = {token: token};
    return this.http.post<any>(`${this.authUrl}/confirm-reset`, payload, {headers: environment.headers});
  }
  
}
