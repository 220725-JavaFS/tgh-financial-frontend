import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DarkmodeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  darkMode: boolean = false;
  modeText: string = 'Light Mode';

  constructor(private router: Router, private as: AuthService, private darkmode: DarkmodeService) { }

  ngOnInit(): void {
    this.darkMode = localStorage.getItem('dark-mode') === "true" ? true : false;
    this.modeText = this.darkMode ? 'Dark Mode' : 'Light Mode'
  }

  logout() {
    this.router.navigateByUrl('/login');
    this.as.logout();
  }

  changeMode() {

    this.darkMode = localStorage.getItem('dark-mode') === "true" ? true : false;
    let dm = this.darkMode ? 'false' : 'true'
    this.modeText = this.darkMode ? 'Light Mode' : 'Dark Mode'
    this.darkmode.changeMode(dm);

  }

}
