import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async() => {
   await TestBed.configureTestingModule({
    imports:[HttpClientModule],
    providers: []
   }).compileComponents();
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
