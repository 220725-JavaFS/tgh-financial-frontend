import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { Transaction } from 'src/app/models/transaction';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  receiverId: FormControl = new FormControl(['']);
  senderId: FormControl = new FormControl(['']);

  
  receiverAccountId: FormControl = new FormControl(['']);
  transferMoneyOpen: boolean = false;
  txnAmount: FormControl = new FormControl(['']);
  txnDescription: FormControl = new FormControl(['']);
  accountExists: boolean = false;
  accountMissing: boolean = false;
  createFormOpen: boolean = false;
  updateFormOpen: boolean = false;
  balanceIsNegative: boolean = false;
  selectedAccountError: boolean = false;
  selectedSameAccountError: boolean = false;
  selectedHighError:boolean = false;
  selectedAmountError = false;
  goodMessage: boolean = false;
  balanceMessage: string = '';
  userAccount!: Account;
  allUserAccounts: Account[] = [];
  allSenderAccounts: Account[] = [];
  allReceiverAccounts: Account[] = [];
  currentAccountId: number = 0;
  selectedAccountId: number = 0;
  selectedSenderId: number = 0;
  selectedReceiverId: number = 0;

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
    this.transferMoneyOpen = false;
    this.selectedAmountError = false;
    this.selectedHighError = false; 
    this.selectedSameAccountError = false;
    this.selectedAccountError = false;
    this.balanceIsNegative = false;
    //These booleans act off each other. The first one opens the update form and the second one closes the create form.
    this.updateAccountDescription.reset();
    this.accountId.reset();
    this.accountName.reset();
    this.balance.reset();
    this.accountDescription.reset();
    this.updateAccountName.reset();
  }
    transferMoney() {
      this.transferMoneyOpen = true;
        this.updateFormOpen = false;
        this.createFormOpen = false;
        this.selectedAmountError = false;
        this.selectedHighError = false; 
        this.selectedSameAccountError = false;
        this.selectedAccountError = false;
        this.balanceIsNegative = false;
        //These booleans act off each other. The first one opens the update form and the second one closes the create form.
        this.updateAccountDescription.reset();
        this.accountId.reset();
        this.senderId.reset();
        this.receiverId.reset();
        this.accountName.reset();
        this.balance.reset();
        this.accountDescription.reset();
        this.updateAccountName.reset();
    }

    
   

  

  openCreateForm() {
    this.createFormOpen = true;
    this.updateFormOpen = false;
    this.transferMoneyOpen = false;
    this.selectedAmountError = false;
    this.selectedHighError = false; 
    this.selectedSameAccountError = false; 
    this.selectedAccountError = false;
    this.balanceIsNegative = false;
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
        this.allSenderAccounts = response;
        this.allReceiverAccounts = response;

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

    if(name === null && description === null){
      this.selectedAccountError = true;
      this.accountIdMessage = "Your account must have a name and description!";
      return;
    }
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
    if(name === null && description === null){
      this.selectedAccountError = true;
      this.accountIdMessage = "Your account must have a name and description!";
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

  sendTransferMoney(amount: number, description: string, receiverId: number, senderId:number) {
    this.selectedSameAccountError = false;
    this.selectedAmountError = false;
    this.selectedHighError = false;
    this.goodMessage = false;
    let senderIdString: string = `${this.selectedSenderId}`;
    let receiverIdString: string = `${this.selectedReceiverId}`;
    console.log(this.selectedSenderId);
    console.log(this.selectedReceiverId);
    if(this.selectedSenderId==this.selectedReceiverId){
      this.selectedSameAccountError = true;
      this.accountIdMessage = "Can not send to same account!";
      return;
    }else if(amount <=1){
      this.selectedAmountError = true;
      this.accountIdMessage = "Can not send less than $1!";
      return;
    } 
    const type: string = 'Expense';
    const txn = new Transaction(0, amount, description, type);
    console.log(txn);
    //this.accountService.createTransaction(this.receiverEmail, txn)
    this.accountService.sendMoneyTransaction(senderIdString, receiverIdString, txn).subscribe({
      next: () => {
        console.log("In transer money");
        this.goodMessage = true;
        this.accountIdMessage = "Transfer was sucessful!"
      },
      error:()=>{
        this.selectedHighError = true;
        this.accountIdMessage = "Can not transfer more money than balance!"

      },
      complete: () => {
        this.getAllAccounts();


      }
    });

  }

}
