import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Transaction } from '../models/transaction';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let http: HttpTestingController;
  let accUrl: string = environment.url+'account/';
  //accs url need to change number at end and for transUrl 
  let accsUrl: string = environment.url + 'account/';
  let transUrl: string = environment.url + 'account/' + '' + '/transaction';
  let insUrl: string  = environment.url + 'account/' + 'new';
  let updateUrl: string = environment.url+'account';

  
 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  //Testing getAccount() service method
  it('should return a Account Object', (done) => {
    const expectedAccount: Account = new Account(0, '', 1, '', '');
    service.getAccount('').subscribe(data => {
      expect(data).toEqual(expectedAccount);
      done();
    })
    const testReq = http.expectOne(accUrl);
    testReq.flush(expectedAccount);
  })



  //Testing getAccounts() service method
  it('should return all accounts for the user', (done)=>{
    const expectedUserAccounts: Account[] = new Array;
    service.getAccounts().subscribe(data => {
      expect(data).toEqual(expectedUserAccounts);
      done();
    })
    
    const testReq = http.expectOne(accsUrl + '');
    testReq.flush(expectedUserAccounts);
  })
  
  
  
  //Testing getTransactions() service method 
  it('should return all transactions for a given account', (done) => {
    const expectedTransactions:Transaction[] = new Array;
    service.getTransactions('').subscribe(data => {
      expect(data).toEqual(expectedTransactions);
      done();
    })
    const testReq = http.expectOne(transUrl);
    testReq.flush(expectedTransactions);
  })

  
  //Testing insert Account service method 
  it('should insert an Account object', (done)=>{
    const expectedAccount: Account = new Account(0, '', 1, '', '');
    service.insertAccount(new Account(0, '', 1, '', '')).subscribe(data => {
      expect(data).toEqual(expectedAccount);
      done();
    })
    const testReq = http.expectOne(insUrl);
    testReq.flush(expectedAccount);
  })

  //Testing update Account service method 
  it('should update an Account object', (done)=>{
    const updateAccount: Account = new Account(0, '', 1, '', '');
    service.updateAccount(new Account(0, '', 1, '', '')).subscribe(data => {
      expect(data).toEqual(updateAccount);
      done();
    })
    const testReq = http.expectOne(updateUrl);
    testReq.flush(updateAccount); 
  })

  // Testing createTransaction service method 
  it('should create a new transaction', (done)=>{
    const newTrans: Transaction = new Transaction(0, 0, '', '');
    service.createTransaction('',new Transaction(0, 0, '', '')).subscribe(data => {
      expect(data).toEqual(newTrans);
      done();
    })
    const testReq = http.expectOne(transUrl);
    testReq.flush(newTrans); 
  })

});
