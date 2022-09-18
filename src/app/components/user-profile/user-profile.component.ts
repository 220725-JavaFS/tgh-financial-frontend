import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user-profile';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  updateFeedback = '';

  profile: UserProfile = new UserProfile();

  constructor(private userProfileService:UserProfileService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  postUserProfile(){
    this.userProfileService.postUserProfile(this.profile).subscribe({
      next: (response) => {
        console.log(response);
        this.profile = response;
        this.updateFeedback = 'Profile Updated!';
      },
      error: () => {
        this.updateFeedback = 'An error occurred';
      }
    });
  }

  getUserProfile(){
    this.userProfileService.getUserProfile().subscribe({
      next: (response) => { 
        this.profile = response;
        console.log(response);
      },
      error: () => {
        this.updateFeedback = "No profile was found, please create one!"
      },
      complete: () => {
        this.updateFeedback = "Profile was successfully retrieved";
      }
    });
  }



  






}