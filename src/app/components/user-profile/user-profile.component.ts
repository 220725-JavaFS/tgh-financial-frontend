import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/models/user-profile';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  updateFeedback = '';
  profileUrl = '';

  profile: UserProfile = new UserProfile();

  constructor(private userProfileService:UserProfileService) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.profileUrl = environment.url + 'profile/' + localStorage.getItem('current-user');
  }

  postUserProfile() {
    this.userProfileService.postUserProfile(this.profileUrl, this.profile).subscribe({
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

  getUserProfile() {
    this.userProfileService.getUserProfile(this.profileUrl).subscribe({
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