import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetSendEmailComponent } from './password-reset-send-email.component';

describe('PasswordResetSendEmailComponent', () => {
  let component: PasswordResetSendEmailComponent;
  let fixture: ComponentFixture<PasswordResetSendEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetSendEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
