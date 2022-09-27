import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';

xdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = jasmine.createSpyObj(
      'AuthService',
      ['login', 'logout', 'register']
    );

    service.login
    .withArgs('testuser@gmail.com', 'password')
    .and
    .returnValue(of(new User(1, 'testuser@gmail.com', 'password', false)));

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
