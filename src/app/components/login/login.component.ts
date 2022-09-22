import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DarkmodeService } from 'src/app/services/darkmode.service';
import { DarkmodeComponent } from '../darkmode/darkmode.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: FormControl = new FormControl(['']);
  password: FormControl = new FormControl(['']);

  noticeMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private darkmode: DarkmodeService) { 
  }

  ngOnInit(): void {
  }

  attemptLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        localStorage.setItem('current-user', ''+response.id);
        let dm = ''+response.darkmode; 
        this.darkmode.changeMode(dm);
        console.log(dm)
       
      },
      error: (err) => {
        if(err.status == 400) {
          this.noticeMessage = 'Please Check Your Credentials';
        } else {
          this.noticeMessage = 'Server Error';
        }
      },
      complete: () => {
        this.authService.loggedIn = true;
        
        this.router.navigateByUrl('/home');
        
      }
    })
  }

}
