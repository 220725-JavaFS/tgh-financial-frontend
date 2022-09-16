import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userId: string;
  profileUrl: string = environment.url+'profile';
  profileId: string = '';

  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('current-user') || '';
    this.profileId = localStorage.getItem('current-account') || '';
   }

   postUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    environment.headers['Current-User'] = this.userId;
    return this.http.post<UserProfile>(this.profileUrl, userProfile, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

   getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.profileUrl+`/${this.userId}`, {headers: environment.headers, withCredentials: environment.withCredentials});
   }
}
