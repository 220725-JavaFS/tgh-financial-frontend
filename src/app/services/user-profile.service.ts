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

  constructor(private http: HttpClient) { };

  postUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.profileUrl, userProfile, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.profileUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}
