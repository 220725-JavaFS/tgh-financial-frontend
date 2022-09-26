import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  userId: string;
  accountUrl: string = environment.url+'account';
  accountId: string = localStorage.getItem('current-account') || '';

  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('current-user') || '';
    this.accountId = localStorage.getItem('current-account') || '';
  
   }
   
   // changing c to slash
   getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl+ `/user/${this.userId}`, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

   getAccount(accountId:string): Observable<Account> {
    return this.http.get<Account>(this.accountUrl+ `/${accountId}`, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

   getTransactions(accountId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.accountUrl+`/${accountId}/transaction`, 
    {headers: environment.headers, withCredentials: environment.withCredentials});
   }
   //new
   insertAccount(account: Account): Observable<Account> {
    environment.headers['Current-User'] = this.userId;
    return this.http.post<Account>(this.accountUrl +"/new", account, {headers: environment.headers, withCredentials: environment.withCredentials});
   }

  //new
   updateAccount(account: Account): Observable<Account> {
    environment.headers['Current-User'] = this.userId;
    return this.http.put<Account>(this.accountUrl, account, {headers: environment.headers, withCredentials: environment.withCredentials});
   }
   
   createTransaction(accountId: string, txn: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.accountUrl+`/${accountId}/transaction`, 
    txn, {headers: environment.headers, withCredentials: environment.withCredentials});
   }


   sendMoneyTransaction(accountId: string, accountReceiver: string, txn: Transaction): Observable<Transaction> {
    environment.headers['Current-User'] = this.userId;
    console.log("send Money transaction occuring at this time");
    return this.http.post<Transaction>(this.accountUrl+`/${accountId}/sendMoney${accountReceiver}`,
    txn, {headers: environment.headers, withCredentials: environment.withCredentials});
   }



   setActiveUser(){
    this.userId = localStorage.getItem('current-user') || '';
    this.accountId = localStorage.getItem('current-account') || '';
   }


}
