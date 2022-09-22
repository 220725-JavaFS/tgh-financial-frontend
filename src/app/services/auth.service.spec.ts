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

  /**
   * tests the forgot service method
   */
  it('#forgot should return expected data', (done) => {
    const expectedData: User = new User(0, '', '', false);
    
    service.forgotPassword('').subscribe( data => {
      expect(data).toEqual(expectedData);
      done();
    }) 
  
    const testRequest  = http.expectOne(authUrl + '/forgot');

    testRequest.flush(expectedData);
  })

  /**
   * tests the reset-password service method
   */
  it('#reset-password should return expected data', (done) => {
    const expectedData: any = new User(0, '', '', false);
    
    service.resetPassword(new User(0, '', '', false)).subscribe( data => {
      expect(data).toEqual(expectedData);
      done();
    }) 
  
    const testRequest  = http.expectOne(authUrl + '/reset-password');

    testRequest.flush(expectedData);
  })

  /**
   * tests the sendToken service method
   */
   it('#sendTokenBack should return expected data', (done) => {
    const expectedData: any = new User(0, '', '', false);
    
    service.sendTokenBack('').subscribe( data => {
      expect(data).toEqual(expectedData);
      done();
    }) 
  
    const testRequest  = http.expectOne(authUrl + '/confirm-reset');

    testRequest.flush(expectedData);
  })

  it('#login should return expected data', (done) => {
    const expectedData: User = new User(0, '', '', false);

    service.login('','').subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    })
    
    const testRequest = http.expectOne(authUrl+'/login');

    testRequest.flush(expectedData);
  });

  it('#register should return expected data', (done) => {
    const expectedData: any = new User(0, '', '', false);

    service.register('','').subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    })
    
    const testRequest = http.expectOne(authUrl+'/register');

    testRequest.flush(expectedData);
  });

  it('#logout should return nothing', () => {
    service.logout();
    http.expectNone(authUrl+'/logout');
  });

});
