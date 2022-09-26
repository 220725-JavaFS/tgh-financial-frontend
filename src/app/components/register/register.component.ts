import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DarkmodeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: FormControl = new FormControl(['']);
  password: FormControl = new FormControl(['']);

  noticeMessage: string = '';

  constructor(private authService: AuthService, private darkmode: DarkmodeService, private router: Router) { }

  ngOnInit(): void {
    this.darkmode.changeMode('false');
  }

  attemptRegister(email: string, password: string) {
    this.authService.register(email, password).subscribe({
      next: (response) => {
        localStorage.setItem('current-user', ''+response.id);
      },
      error: (err) => {
        if(err.status == 400) {
          this.noticeMessage = 'Please Check Your Registration Info';
        } else {
          this.noticeMessage = 'Server Error';
        }
      },
      complete: () => {
        this.router.navigateByUrl('/login');
      }
    })
  }

}
