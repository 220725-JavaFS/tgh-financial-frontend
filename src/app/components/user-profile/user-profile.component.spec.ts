import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Observable } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';
import { UserProfile } from 'src/app/models/user-profile';
import { User } from 'src/app/models/user';

let testProfile: UserProfile = new UserProfile(
  0, 'Bill', 'Withers', '123 Hampton Rd', 'Mt. Shasta', 'CA', '90210', '5551234567'
)

class MockProfileService {
  makeRequestObject() {
    return {
      firstName: testProfile.firstName,
      lastName: testProfile.lastName,
      address: testProfile.address,
      city: testProfile.city,
      state: testProfile.state,
      zipCode: testProfile.zipCode,
      phone: testProfile.phone
    }
  }

  postUserProfile(): Observable<UserProfile> {
    return new Observable((subscriber) => subscriber.next(testProfile));
  }

  getUserProfile(): Observable<UserProfile> {
    return new Observable((subscriber) => subscriber.next(testProfile)); 
  }
}

xdescribe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [
        UserProfileComponent,
        {provide: UserProfileService, useClass: MockProfileService}
      ]
    })
    .compileComponents();

    localStorage.setItem('current-user', '12345')
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correctly initialized properties', () => {
    expect(component.updateFeedback).toEqual('');
    expect(component.profileUrl).toEqual('http://localhost:8080/profile/12345');
    expect(component.visible).toBeTrue;
    expect(component.profile).toEqual(testProfile);
  });

  it('should persist a user profile and return the persisted object', () => {
    component.postUserProfile();
    expect(component.getUserProfile).toHaveBeenCalled;
    expect(component.profile).toEqual(testProfile);
    expect(component.updateFeedback).toEqual('Successfully created a new profile!');
  })

  it('should initialize an existing profile if one exists on the back end', () => {
    component.getUserProfile();
    expect(component.visible).toBeFalse;
    expect(component.profile).toEqual(testProfile);
  })

});
