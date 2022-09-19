import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let authUrl: string = environment.url+'auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should return expected data', (done) => {
    const expectedData: User = new User(0, '', '');

    service.login('','').subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    })
    
    const testRequest = http.expectOne(authUrl+'/login');

    testRequest.flush(expectedData);
  });
});
