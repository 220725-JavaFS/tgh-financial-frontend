import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from '../models/user-profile';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let testUser = new UserProfile(1, 'Bill', 'Withers', '123 Hampton Rd.', 'Weed', 'CA', '90210', '5551234567');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserProfileService);

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

  it('should ')

});
