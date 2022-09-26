import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user-profile';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  updateFeedback = '';
  profileUrl = '';
  visible:boolean = true;
  profile: UserProfile = new UserProfile(0, '', '', '', '', '', '', '');
  telephone:string = '';

  constructor(private userProfileService:UserProfileService) { }

  ngOnInit(): void {
    this.profileUrl = environment.url + 'profile/' + localStorage.getItem('current-user');
    this.getUserProfile();
    console.log(this.profileUrl);
  }

  postUserProfile(): void {
    this.userProfileService.postUserProfile(this.profileUrl, this.profile).subscribe({
      next: (response) => {
        console.log(response);
        this.getUserProfile();
        this.updateFeedback = 'Successfully created a new profile!';
      },
      error: () => {
        this.updateFeedback = 'An error occurred';
      }
    });
  }

  getUserProfile():void {
    this.userProfileService.getUserProfile(this.profileUrl).subscribe({
      next: (response) => {
        if (response != null) { 
          this.profile = response;
          this.visible = false;
        } else {
          this.profile = new UserProfile(0, '', '', '', '', '', '', '');
          this.updateFeedback = "No profile detected, please create one"
        }
        console.log(response);
      },
      error: () => {
        this.profile = new UserProfile(0, '', '', '', '', '', '', '');
        this.updateFeedback = 'An error occurred'
      },
      complete: () => {
        this.telephone = `(${this.profile.phone.substring(0,3)}) ${this.profile.phone.substring(3,6)}-${this.profile.phone.substring(6,10)}`;
      }
    });
  }
  
  switchVisibility(){
    this.visible = !this.visible;
    this.updateFeedback = '';
  }

  submitForm(){
    let myForm = <HTMLFormElement>document.getElementById('myForm');
  
    if (myForm.checkValidity() && this.profile.zipCode.length ===5 && this.profile.phone.length ===10) {
      myForm.submit();
      this.postUserProfile();
    } else {
      this.updateFeedback='All fields required';
    }
  }



}