import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { HttpClient } from '@angular/common/http';
import { Form, FormControl } from '@angular/forms';
import { map, Observable, reduce } from 'rxjs';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import {User} from 'src/app/models/user';


@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {

  txnAmount: FormControl = new FormControl(['']);
  txnDescription: FormControl = new FormControl(['']);
  accountId: string = '';
  txnType: FormControl = new FormControl(['']);
  userAccount!: Account;
  
  accountName: FormControl = new FormControl(['']);
  balance: FormControl = new FormControl(['']);
  accountDescription: FormControl = new FormControl(['']);
  balance2: number = 0;


  receiverEmail:string='';
  receiverUser!: User;
  receiverAccount!:Account;
  receiverName: FormControl = new FormControl(['']);
  receiverBalance: FormControl = new FormControl(['']);
  receiverDescription: FormControl = new FormControl(['']);
  receiverAccountId:  FormControl = new FormControl(['']);

  transactionsExists: boolean = false;
  createFormOpen: boolean = false;
  accountMessage: string = '';

  balanceStyle = {};

  transactions: Transaction[] = [];
  darkmode = false;

  constructor(private accountService: AccountService, private router: Router) { 
    this.accountId = accountService.accountId;
  }

  ngOnInit(): void {
    this.getAllTransactions();
    this.getAccount();
    this.openCreateForm();
  }

  addTransaction(amount: number, description: string, type: string) {
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
      }
    });
  }

  openCreateForm() {
    this.createFormOpen = true;
  }

  getAllTransactions() {
    this.accountService.getTransactions(this.accountId).subscribe({
      next: (resp) => {
        this.transactions = resp;
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
  
  sendReceiverMoney(amount:number, description:string, receiverId:string){
    localStorage.setItem('current-account', ''+this.userAccount.id);
    console.log(this.accountId);
    console.log(receiverId);
    const type: string ='Expense';
    const txn = new Transaction(0, amount, description, type);
    console.log(txn);
    //this.accountService.createTransaction(this.receiverEmail, txn)
    this.accountService.sendMoneyTransaction(this.accountId, receiverId, txn).subscribe({
      next:()=>{
        console.log("In send money");
        
      },
      complete: () => {
        this.getAccount();
        this.getAllTransactions();
        

      }
    });

  }
  getReceiver(){
    this.accountService.getAccount().subscribe({
      next: (data)=>{
        this.receiverAccount=new Account(
          data.id,
          data.name,
          data.balance,
          data.description,
          data.creationDate
        );
      },
      error: () => {
        this.accountMessage = "No matching user was found!"
      },
    });

  }

  getAccount() {
    this.accountService.getAccount().subscribe({
      next: (response) => {
        this.userAccount = new Account(
          response.id,
          response.name,
          response.balance,
          response.description,
          response.creationDate
        );
      },
      error: () => {
        this.accountMessage = "No account was found, please create one!"
      },
      complete: () => {
        this.accountMessage = "Account was successfully retrieved from the database.";
        const num = this.userAccount.balance;
        this.userAccount.balance = +num.toFixed(2);

        if(num < 0) {
          this.balanceStyle = {
            color: '#ff0000'
          }
        } else {
          this.balanceStyle = {
            color: '#5dff5d'
          }
        }

        this.accountName.setValue(this.userAccount.name);
        this.balance.setValue(this.userAccount.balance);
        this.accountDescription.setValue(this.userAccount.description);
      }
    });
  }

}
