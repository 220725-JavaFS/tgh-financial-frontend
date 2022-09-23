import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './account.service';
import { Transaction } from '../models/transaction';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AccountService', () => {
  let service: AccountService;
  let expenseTransaction = new Transaction(1, 100.00, 'test send 1', 'Expense');
  let incomeTransaction = new Transaction(2, 100.00, 'test send 1', 'Income');
  let http: HttpTestingController;
  let accountUrl: string = environment.url+'account';

  beforeEach(async() => {
   await TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers: [AccountService]
   }).compileComponents();
    http = TestBed.inject(HttpTestingController)
    service = TestBed.inject(AccountService);
  });

  it('#sendMoneyTransaction should create expense', (done) =>{
    const expectedData: Transaction= new Transaction(1, 100, 'test send 1', 'Expense');
    service.sendMoneyTransaction('1', '2', expenseTransaction).subscribe(data=>{
      expect(data).toEqual(expectedData);
      done();
    });
      const testRequest = http.expectOne(accountUrl+'/1'+'/sendMoney'+'2');
      testRequest.flush(expectedData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
