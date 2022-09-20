import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetSendEmailComponent } from './password-reset-send-email.component';
import { FormControl } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PasswordResetSendEmailComponent', () => {
  let component: PasswordResetSendEmailComponent;
  let fixture: ComponentFixture<PasswordResetSendEmailComponent>;
  let email: FormControl = new FormControl(['']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetSendEmailComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*
    This might change if input carries the email of user
  */
  it('should have a FormControl variable named email to be defined', () => {
    expect(component.email).toBeDefined(email);
  });

  it('error visibility false', () => {
    expect(component.newErrorVisibility.valueOf()).toEqual(false);
  });
});
