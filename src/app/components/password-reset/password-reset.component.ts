import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'; // I added this router for the constructor
import { AuthService } from 'src/app/services/auth.service'; // this is also for the router

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  // email: FormControl = new FormControl(['']);
  password: FormControl = new FormControl(['']);
  noticeMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

 
  // this resets the password
  attemptResetPassword(password: string) {
    // this.authService.reset-password(email, password).subscribe({
    //   next: (response) => {
    //     localStorage.setItem('current-user', ''+response.id);
    //   },
    //   error: (err) => {
    //     if(err.status == 400) {
    //       this.noticeMessage = 'Please Check Your Registration Info';
    //     } else {
    //       this.noticeMessage = 'Server Error';
    //     }
    //   },
    //   complete: () => {
    //     this.router.navigateByUrl('/login');
    //   }
    // })
  }
  

}
