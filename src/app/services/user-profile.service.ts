import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  profileUrl: string = environment.url+'profile/'+localStorage.getItem('current-user');
  options = {headers: environment.headers, withCredentials: environment.withCredentials};

  constructor(private http: HttpClient) { };

  postUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    let profileObservable: Observable<UserProfile>;
    if (userProfile.id) {
      userProfile.id = undefined;
      profileObservable = this.http.put<UserProfile>(this.profileUrl, userProfile, this.options);
    } else {
      profileObservable = this.http.post<UserProfile>(this.profileUrl, userProfile, this.options);
    }
    return profileObservable;
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.profileUrl, this.options);
  }
}
