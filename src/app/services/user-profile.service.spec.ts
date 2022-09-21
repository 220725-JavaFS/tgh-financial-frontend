import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from '../models/user-profile';
import { environment } from 'src/environments/environment';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let testUser = new UserProfile(1, 'Bill', 'Withers', '123 Hampton Rd.', 'Weed', 'CA', '90210', '5551234567');
  let updatedUser = new UserProfile(1, 'Bill', 'Withers', '123 Hampton Dr.', 'Weed', 'CA', '90210', '5557654321');
  let url = environment.url + 'profile/1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();

    service = TestBed.inject(UserProfileService);
    localStorage.setItem('current-user', '1');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove the id when making a request object', () => {
    expect(service.makeRequestObject(testUser))
      .toEqual({
        firstName: 'Bill',
        lastName: 'Withers',
        address: '123 Hampton Rd.',
        city: 'Weed',
        state: 'CA',
        zipCode: '90210',
        phone: '5551234567'
      });
  });

  it("should create a new profile if one doesn't exist", () => {
    service.postUserProfile(url, testUser).subscribe(res => expect(res).toEqual(testUser));
  });

  it('should get the existing user profile once created', () => {
    service.getUserProfile(url).subscribe(res => expect(res).toEqual(testUser));
  })

  it('should update the user profile that already exists', () => {
    service.postUserProfile(url, updatedUser).subscribe(res => expect(res).toEqual(updatedUser));
  })

  it('should retrieve get the updated profile', () => {
    service.getUserProfile(url).subscribe(res => expect(res).toEqual(updatedUser));
  })

});
