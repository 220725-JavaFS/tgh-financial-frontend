import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router'; // I added this router for the constructor
import { AuthService } from 'src/app/services/auth.service'; // this is also for the router

// import { User } from '../models/user';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  id: string = "";
  token: string = "";
  password: FormControl = new FormControl(['']);
  noticeMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      this.id = params['id'];
      this.token = params['token'];
      console.log(this.id, +'\n' + this.token);
    });
  }

  //attempt to change password of person
  
  // this resets the password
  attemptResetPassword(password: string) {
    
    this.authService.resetPassword(password).subscribe({
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
