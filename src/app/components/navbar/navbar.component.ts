import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;
  modeText: string = 'Dark Mode';
  @Output() modeChangeEvent = new EventEmitter<boolean>();
  
  darkMode: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
      this.darkMode = localStorage.getItem('darkMode') ? true : false;
      this.modeChangeEvent.emit(this.darkMode);
  }

  logout() {
    localStorage.removeItem('current-user');
    localStorage.removeItem('current-account');
    this.router.navigateByUrl('/login');
  }

  changeMode() {
    this.darkMode = !this.darkMode;
    this.modeText = this.darkMode ? 'Light Mode' : 'Dark Mode'
    localStorage.setItem('darkMode', this.darkMode ? 'true' : '');
    this.modeChangeEvent.emit(this.darkMode);
  }

}
