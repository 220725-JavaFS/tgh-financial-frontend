import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-reset-send-email',
  templateUrl: './password-reset-send-email.component.html',
  styleUrls: ['./password-reset-send-email.component.css']
})
export class PasswordResetSendEmailComponent implements OnInit {

  constructor(private isAuth: AuthService, private router: Router) { }

  email: FormControl = new FormControl(['']);

  NoticeMessage: string = "";
  ErrorMessage: string = "";

  ngOnInit(): void {
  }
  newForgotVisibility = false;
  newErrorVisibility = false;
  
  attemptForgot(email: string){
    this.newErrorVisibility = false;
    this.switchErrorVisibility();
    this.isAuth.forgot(email).subscribe({
      next: () => {
        console.log("Success");
        this.NoticeMessage = "Email Has Been Sent!!";
        this.switchForgotPasswordtVisibility();
      },
      error: (err) => {
        this.switchErrorVisibility();
        if(err.status == 400){
          this.ErrorMessage = "The Email Is Not In The System";
        } else {
          this.ErrorMessage = "Server Error";
        }
      },
      complete: () => { 
        if(this.NoticeMessage != "")
        setTimeout(() => {
          this.router.navigateByUrl('/login') 
        }, 2500)
      }
    })
  }

  switchForgotPasswordtVisibility():void {
    this.newForgotVisibility = !this.newForgotVisibility;  
  }
  switchErrorVisibility():void {
    this.newErrorVisibility = !this.newErrorVisibility;  
  }

}
