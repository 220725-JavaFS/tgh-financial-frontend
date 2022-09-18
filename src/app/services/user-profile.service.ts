import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  options = {headers: environment.headers, withCredentials: environment.withCredentials};

  constructor(private http: HttpClient) { };

  postUserProfile(url: string, userProfile: UserProfile): Observable<UserProfile> {
    let profileObservable: Observable<UserProfile>;
    if (userProfile.id) {
      userProfile.id = undefined;
      profileObservable = this.http.put<UserProfile>(url, userProfile, this.options);
    } else {
      profileObservable = this.http.post<UserProfile>(url, userProfile, this.options);
    }
    return profileObservable;
  }

  getUserProfile(url: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(url, this.options);
  }
}
