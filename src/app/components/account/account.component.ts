import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChange } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, reduce } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  txnAmount: FormControl = new FormControl(['']);
  txnDescription: FormControl = new FormControl(['']);
  accountId: string = '';
  txnType: FormControl = new FormControl(['']);
  userAccount!: Account;

  accountName: FormControl = new FormControl(['']);
  balance: FormControl = new FormControl(['']);
  accountDescription: FormControl = new FormControl(['']);

  transactionsExists: boolean = false;
  createFormOpen: boolean = false;
  accountMessage: string = '';

  balanceStyle = {};
  txnStyle = {};

  transactions: Transaction[] = [];
  darkMode = false;

  constructor(private accountService: AccountService, private router: Router) {
    this.accountId = localStorage.getItem('current-account') || '';

  // constructor(private accountService: AccountService) { 
  //   this.accountId = accountService.accountId;

  }

  ngOnInit(): void {
    this.getAllTransactions();
    this.getAccount();
  }

  addTransaction(amount: number, description: string, type: string) {
    // made sure that the amount has to be greater than 0 and
    //
    if(amount <= 0) {
      this.accountMessage = 'Amount has to be greater than 0';
      return;
    }
    // made sure that the amount would be at most 2 digits after the decimal point
    amount = Number(amount.toFixed(2));
    

    const txn = new Transaction(0, amount, description, type);
    this.accountService.createTransaction(this.accountId, txn).subscribe({
      next: () => {
        this.accountMessage = 'New transaction was saved!';
      },
      error: () => {
        this.accountMessage = 'New transaction was not saved...';
      },
      complete: () => {
        this.getAccount();
        this.getAllTransactions();
        this.createFormOpen = false;
      }
    });
  }

  openCreateForm() {
    this.createFormOpen = true;
  }
//Unchanged
  getAllTransactions() {
    this.accountService.getTransactions(this.accountId).subscribe({
      next: (resp) => {
        this.transactions = resp;
        console.log(resp);
      },
      error: () => {
        this.accountMessage = 'No transactions were retrieved...';
      },
      complete: () => {
        this.transactions.forEach((txn) => {
          const num = txn.amount;
          txn.amount = +num.toFixed(2);
        });
        this.transactions.reverse();
      }
    }
    );
  }
 //Is used on Init when called on the account component. 
  getAccount() {
    this.accountService.getAccount(this.accountId).subscribe({
      next: (response) => {

        this.userAccount = response;

      },
      error: () => {
        this.accountMessage = "No account was found, please create one!"
      },
      complete: () => {
        // changed to this to be more user friendly
        this.accountMessage = "Account was successfully updated";
        const num = this.userAccount.balance;
        this.userAccount.balance = +num.toFixed(2);


         if (num < 0) {
           this.balanceStyle = {
            
             color: 'Crimson'
           }
         } else {
           this.balanceStyle = {
             color: 'SeaGreen'
           }
        }

        this.accountName.setValue(this.userAccount.name);
        this.balance.setValue(this.userAccount.balance);
        this.accountDescription.setValue(this.userAccount.description);

      }
    });
  }

}
