import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  private mode = new BehaviorSubject('false');
  currentMode = this.mode.asObservable();

  constructor() { }

  changeMode(darkMode: string) {
    localStorage.setItem('dark-mode', darkMode);
    this.mode.next(localStorage.getItem('dark-mode')||'false');
  }
}
