import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  loggedIn: boolean = false;
  isDark: boolean = false;
  modeText: string = 'Dark Mode';

  @Output() changeThemeEvent = new EventEmitter<boolean>();

  darkMode(): void {
    if (!this.isDark)  {
      this.isDark = true;
      this.modeText = 'Light Mode';
    } else  {
      this.isDark = false;
      this.modeText = 'Dark Mode';
    }
    this.changeThemeEvent.emit(this.isDark);
  }

  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('current-user');
    localStorage.removeItem('current-account');
    this.router.navigateByUrl('/login');
  }

}
