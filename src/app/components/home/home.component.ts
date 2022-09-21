import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountExists: boolean = false;
  createFormOpen: boolean = false;
  updateFormOpen: boolean = false;
  userAccount!: Account;
  allUserAccounts: Account[] = [];
  currentAccountId: number = 0;

  accountMessage: string = '';

  accountId: FormControl = new FormControl(['']);
  accountName: FormControl = new FormControl(['']);
  balance: FormControl = new FormControl(['']);
  accountDescription: FormControl = new FormControl(['']);

  updateAccountName: FormControl = new FormControl(['']);
  updateBalance: FormControl = new FormControl(['']);
  updateAccountDescription: FormControl = new FormControl(['']);

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  changeCurrentAccountId(uniqueAccountId: number) {
    this.currentAccountId = uniqueAccountId;
    localStorage.setItem('current-account', '' + this.currentAccountId);
    console.log(this.currentAccountId);
  }


  updateForm() {
    this.updateFormOpen = true;
    this.createFormOpen = false;
    this.updateAccountName.setValue("");
    this.updateBalance.setValue(['']);
    this.updateAccountDescription.setValue(['']);
  }

  openCreateForm() {
    this.createFormOpen = true;
    this.updateFormOpen = false;
    this.updateAccountName.setValue("");
    this.updateBalance.setValue("");
    this.updateAccountDescription.setValue("");
  }

  getAllAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (response: Account[]) => {
        this.allUserAccounts = response;
      },
      error: () => {
        this.accountMessage = "No account was found, please create one!"
      },
      complete: () => {
        this.accountMessage = "Account was successfully retrieved from the database."
        this.accountExists = true;
      }
    });
  }

  //Need to add validation (broken up from upsert method)
  insertAccount(name: string, balance: number, description: string) {
    this.updateAccountName.setValue("");
    this.updateBalance.setValue("");
    this.updateAccountDescription.setValue("");
    this.userAccount = new Account(0, name, balance, description, null);
    this.accountService.insertAccount(this.userAccount).subscribe({
      next: (response) => {
        //this.accountService.getSingleAccount();
        this.createFormOpen = false;
      },
      complete: () => {
        this.getAllAccounts();
      }
    })
  }

  updateAccount(accountId: number, name: string, balance: number, description: string) {
    this.updateAccountName.setValue("");
    this.updateBalance.setValue("");
    this.updateAccountDescription.setValue("");
    this.userAccount = new Account(accountId, name, balance, description, null);
    this.accountService.updateAccount(this.userAccount).subscribe({
      next: (response) => {
        //this.accountService.getSingleAccount();
        this.updateFormOpen = false;
      },
      error: () => {
        this.accountMessage = 'Account was not successfully saved!';
      },
      complete: () => {
        this.getAllAccounts();

      }
    })
  }

  attemptUpsertAccount(name: string, balance: number, description: string) {
    if (!this.userAccount) {
      this.userAccount = new Account(0, name, balance, description, null);
    } else {
      this.userAccount.name = name;
      this.userAccount.balance = balance;
      this.userAccount.description = description;
    }

    this.accountService.insertAccount(this.userAccount,).subscribe({
      next: (response) => {
        this.userAccount.id = response.id;
        this.userAccount.creationDate = response.creationDate;
      },
      error: () => {
        this.accountMessage = 'Account was not successfully saved!';
      },
      complete: () => {
        this.accountExists = true;
        this.createFormOpen = false;
        this.accountMessage = 'Account was saved!';
        this.accountService.accountId = '' + this.userAccount.id;
        localStorage.setItem('current-account', '' + this.userAccount.id);
      }
    })
  }
}
