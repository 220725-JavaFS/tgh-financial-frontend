import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router'; // I added this router for the constructor
import { TokenUser } from 'src/app/models/tokenUser';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service'; // this is also for the router
import { DarkmodeService } from 'src/app/services/darkmode.service';

// import { User } from '../models/user';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  hidden: boolean = false;
  token: string = "";
  password: FormControl = new FormControl(['']);
  confirmPassword: FormControl = new FormControl(['']);
  noticeMessage: string = '';
  noticeMessage2: string = '';
  tokenUser: TokenUser = new TokenUser(0, '', new Date(), new User(0,'', '', false));
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private darkmode: DarkmodeService) { }
    

  ngOnInit(): void {

    this.darkmode.changeMode('false');
    // this.activatedRoute.params.forEach((params: Params) => {
    //   this.token = params['token'];
    //   console.log(this.token);
    // });
    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params); 
        this.token = params['token'];
        console.log(this.token);
      });

    this.attemptSendTokenBack();
    
  }

  /**
   * Sends the token back for verification
   */
  attemptSendTokenBack() {
    this.authService.sendTokenBack(this.token).subscribe({
      next: (response) => {
        localStorage.setItem('current-user', ''+response.id);
        this.tokenUser = response;
      },
      error: (err) => {
        if(err.status == 400) {
          this.noticeMessage = 'Token is not valid';
        } else {
          this.noticeMessage = 'Server Error';
        }
          this.router.navigateByUrl('/login');
        
      }
      
    })
  }

  // this resets the password
  attemptResetPassword(password: string, confirmPassword: string) {
    if(password !== confirmPassword) {
      this.noticeMessage = 'Error: passwords must match.';
      return;
    }
    let user = this.tokenUser["user"];
    console.log(user);

    user.password = confirmPassword;
    console.log(user);
    this.authService.resetPassword(user).subscribe({
      
      next: (response) => {
        localStorage.setItem('current-user', ''+response.id);
        this.noticeMessage2 = 'New password saved. Redirecting to login.'
        this.switchtVisibility();
      },
      error: (err) => {
        if(err.status == 404) {
          this.noticeMessage = 'Please Check Your Registration Info';
        } else {
          this.noticeMessage = 'Server Error';
        }
      },
      complete: () => {
        if(this.noticeMessage != "")
        setTimeout(() => {
          this.router.navigateByUrl('/login') 
        }, 2500)
      }
    })
  }

  switchtVisibility() {
    this.hidden = !this.hidden;
  }
 
}
