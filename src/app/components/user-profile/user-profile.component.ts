import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user-profile';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  newUserProfile = new UserProfile(0, "", "", "", "", "", "", "");
  updateFeedback:string ="";


  constructor(private userProfileService:UserProfileService ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  postUserProfile(){
    this.userProfileService.postUserProfile(this.newUserProfile).subscribe({
      next: () => {
        this.updateFeedback = 'Profile Updated!';
      },
      error: () => {
        this.updateFeedback = 'An error occurred';
      },
      complete: () => {
        this.getUserProfile();
      }
    });
  }

  getUserProfile(){
    this.userProfileService.getUserProfile().subscribe({
      next: (response) => {
        this.newUserProfile = new UserProfile(
          response.id,
          response.firstName,
          response.lastName,
          response.streetAddress,
          response.city,
          response.state,
          response.postalCode,
          response.telephone
        );
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