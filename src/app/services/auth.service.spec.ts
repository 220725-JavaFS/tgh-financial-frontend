import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let authUrl: string = environment.url+'auth';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: []
    }).compileComponents();
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
