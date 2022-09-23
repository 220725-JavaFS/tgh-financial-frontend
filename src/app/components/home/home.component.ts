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
  accountMissing: boolean = false;
  createFormOpen: boolean = false;
  updateFormOpen: boolean = false;
  balanceIsNegative: boolean = false;
  selectedAccountError: boolean = false;
  balanceMessage: string = '';
  userAccount!: Account;
  allUserAccounts: Account[] = [];
  currentAccountId: number = 0;
  selectedAccountId: number = 0;

  accountMessage: string = '';
  accountIdMessage: string = '';

  accountId: FormControl = new FormControl(['']);
  accountName: FormControl = new FormControl(['']);
  balance: FormControl = new FormControl(['']);
  accountDescription: FormControl = new FormControl(['']);

  updateAccountName: FormControl = new FormControl(['']);
  updateAccountDescription: FormControl = new FormControl(['']);

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.getAllAccounts();
  }

  changeCurrentAccountId(uniqueAccountId: number) {
    this.currentAccountId = uniqueAccountId;
    localStorage.setItem('current-account', '' + this.currentAccountId);
    //This method is very important. Sets the account Id when clicking the "Account Details" button
  }


  updateForm() {
    this.updateFormOpen = true;
    this.createFormOpen = false;
    //These booleans act off each other. The first one opens the update form and the second one closes the create form.
    this.updateAccountDescription.reset();
    this.accountId.reset();
    this.accountName.reset();
    this.balance.reset();
    this.accountDescription.reset();
    this.updateAccountName.reset();


    // this.accountService.setActiveUser();
    // this.accountService.getAccount().subscribe({
    //   next: (response) => {
    //     this.userAccount = new Account(
    //       response.id,
    //       response.name,
    //       response.balance,
    //       response.description,
    //       response.creationDate
    //     );
    //   },
    //   error: () => {
    //     this.accountMessage = "No account was found, please create one!"
    //   },
    //   complete: () => {
    //     this.accountMessage = "Account was successfully retrieved from the database."
    //     this.accountExists = true;
    //     const num = this.userAccount.balance;
    //     this.userAccount.balance = +num.toFixed(2);
    //     this.accountName.setValue(this.userAccount.name);
    //     this.balance.setValue(this.userAccount.balance);
    //     this.accountDescription.setValue(this.userAccount.description);
    //     this.accountService.accountId = ''+this.userAccount.id;
    //     localStorage.setItem('current-account', ''+this.userAccount.id);
    //   }
    // });

  }

  openCreateForm() {
    this.createFormOpen = true;
    this.updateFormOpen = false;
    //These booleans act off each other. The first one opens the create form and the second one closes the update form.
    this.updateAccountDescription.reset();
    this.accountId.reset();
    this.accountName.reset();
    this.balance.reset();
    this.accountDescription.reset();
    this.updateAccountName.reset();
  }
  //This method is run onInit. Properly validating the amount of accounts.
  getAllAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (response: Account[]) => {
        this.allUserAccounts = response;

        if (response.length == 0) {
          this.accountMessage = "No account was found, please create one!"
          this.accountExists = false;
          this.accountMissing = true;
          //These booleans are similar to the ones before

        } else if (response.length === 1) {
          this.accountMessage = "Your account has successfully been retrieved from the database!"
          this.accountExists = true;
          this.accountMissing = false;
        } else {

          this.accountMessage = "Your accounts were successfully retrieved from the database!"
          this.accountExists = true;
          this.accountMissing = false;
        }

      },
      error: () => {
        this.accountMessage = "No account was found, please create one!"
      }
    });
  }

  //Validation added
  insertAccount(name: string, balance: number, description: string) {
    this.updateAccountName.setValue("");
    this.updateAccountDescription.setValue("");
    if (balance >= 1) {
      this.balanceIsNegative = false;
      this.userAccount = new Account(0, name, balance, description, null);
      this.accountService.insertAccount(this.userAccount).subscribe({
        next: (response) => {
          this.createFormOpen = false;
          
        },
        complete: () => {
          this.getAllAccounts();
        }
      })
    } else {
      this.balanceIsNegative = true;
      this.balanceMessage = "Your new account must at least have a balance of 1 dollar.";
    }
  }

  updateAccount(accountId: number, name: string, balance: number, description: string) {
    this.selectedAccountError = false;
    this.updateAccountName.setValue("");
    this.updateAccountDescription.setValue("");

    if(this.selectedAccountId == 0){
      this.selectedAccountError = true;
      this.accountIdMessage = "Please select an Account Id!";
      return;
      
    }

    this.balanceIsNegative = false;
    this.userAccount = new Account(this.selectedAccountId, name, 0, description, null);
    this.accountService.updateAccount(this.userAccount).subscribe({
      next: (response) => {
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

}
