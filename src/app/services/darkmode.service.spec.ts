import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DarkmodeService } from './darkmode.service';
import { environment } from 'src/environments/environment';

describe('DarkmodeService', () => {
  let service: DarkmodeService;
  let http: HttpTestingController;
  let authUrl: string = environment.url;
  let dmUrl: string = environment.url + "darkmode";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DarkmodeService]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DarkmodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#changeMode should return expected data', (done) => {
    
    service.changeMode('true');
    const data: any = localStorage.getItem('dark-mode');
      expect(data).toEqual('true');
      done();
    
  
    // const testRequest  = http.expectOne(authUrl + 'darkmode');

    // testRequest.flush(data);
  })
});
