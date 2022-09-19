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

  makeRequestObject(profile: UserProfile) {
    return {
        firstName: profile.firstName,
        lastName: profile.lastName,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        zipCode: profile.zipCode,
        phone: profile.phone
    }
}

  postUserProfile(url: string, userProfile: UserProfile): Observable<UserProfile> {
    if (userProfile.id) {
      console.log("making put request with");
      console.log(this.makeRequestObject(userProfile));
      return this.http.put<UserProfile>(url, this.makeRequestObject(userProfile), this.options);
    } else {
      console.log("making post request with new profile data");
      console.log(this.makeRequestObject(userProfile));
      return this.http.post<UserProfile>(url, this.makeRequestObject(userProfile), this.options);
    }
  }

  getUserProfile(url: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(url, this.options);
  }
}
