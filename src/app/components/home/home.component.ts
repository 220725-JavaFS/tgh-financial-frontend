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
  userAccount!: Account;

  accountMessage: string = '';

  accountName: FormControl = new FormControl(['']);
  balance: FormControl = new FormControl(['']);
  accountDescription: FormControl = new FormControl(['']);

  darkMode = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
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
        this.accountMessage = "Account was successfully retrieved from the database."
        this.accountExists = true;
        const num = this.userAccount.balance;
        this.userAccount.balance = +num.toFixed(2);
        this.accountName.setValue(this.userAccount.name);
        this.balance.setValue(this.userAccount.balance);
        this.accountDescription.setValue(this.userAccount.description);
        this.accountService.accountId = ''+this.userAccount.id;
        localStorage.setItem('current-account', ''+this.userAccount.id);
      }
    });
  }

  openCreateForm() {
    this.createFormOpen = true;
  }

  attemptUpsertAccount(name: string, balance: number, description: string) {
    if(!this.userAccount) {
      this.userAccount = new Account(0, name, balance, description, null);
    } else {
      this.userAccount.name = name;
      this.userAccount.balance = balance;
      this.userAccount.description = description;
    }

    this.accountService.upsertAccount(this.userAccount).subscribe({
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
        this.accountService.accountId = ''+this.userAccount.id;
        localStorage.setItem('current-account', ''+this.userAccount.id);
      }
    })
  }

}
