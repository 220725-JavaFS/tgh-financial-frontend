import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'banking-frontend-angular';
  // Testing only! Erase line 13 when a database exists with users.
  //loggedIn: boolean = this.authService.loggedIn;
  loggedIn = true;
  isDark: boolean = false;

  constructor(private authService: AuthService) {
  }
}
