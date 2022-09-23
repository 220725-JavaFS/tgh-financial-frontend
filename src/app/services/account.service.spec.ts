import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './account.service';
import { Transaction } from '../models/transaction';

describe('AccountService', () => {
  let service: AccountService;
  let expenseTransaction = new Transaction(1, 100.00, 'test send 1', 'Expense');
  let incomeTransaction = new Transaction(2, 100.00, 'test send 1', 'Income');

  beforeEach(async() => {
   await TestBed.configureTestingModule({
    imports:[HttpClientModule],
    providers: []
   }).compileComponents();
    service = TestBed.inject(AccountService);
  });

  it('should create expense', () =>{
    service.sendMoneyTransaction('1', '2', expenseTransaction).subscribe(data=>expect(data).toEqual(expenseTransaction));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
