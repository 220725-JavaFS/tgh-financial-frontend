export class Account {
    id: number;
    name: string;
    balance: number;
    description: string;
    creationDate: any;

    constructor(_id: number, _name: string, _balance: number, _description: string, _creationDate: any) {
        this.id = _id;
        this.name = _name;
        this.balance = _balance;
        this.description = _description;
        this.creationDate = _creationDate;
    }
}
