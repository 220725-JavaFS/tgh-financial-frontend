import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  private mode = new BehaviorSubject('false');
  currentMode = this.mode.asObservable();

  constructor(private http: HttpClient) { }

  changeMode(darkMode: string) {
    localStorage.setItem('dark-mode', darkMode);
    this.mode.next(localStorage.getItem('dark-mode')||'false');
    this.updateDarkMode().subscribe();
  }

  updateDarkMode(): Observable<any> {
    let url = environment.url+'darkmode';
    let user = new User(0,'','', false);
    let userId = localStorage.getItem('current-user')||'0';
    user.id = parseInt(userId);
    user.darkmode = localStorage.getItem('dark-mode') === "true" ? true : false;
    const payload = JSON.stringify(user);
    console.log(payload);
    console.log(url);
    return this.http.put<any>(url, payload, {headers: environment.headers});
  }
}
