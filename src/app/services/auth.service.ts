import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = environment.url+'auth';
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    const creds = {email: email, password: password};
    const payload = JSON.stringify(creds);
    return this.http.post<User>(this.authUrl+'/login', payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  forgot(email: string): Observable<User> {
    const creds = {email: email};
    const payload = JSON.stringify(creds);
    return this.http.post<User>(this.authUrl+'/forgot', payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(email: string, password: string): Observable<any> {
    const payload = {email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }
}
