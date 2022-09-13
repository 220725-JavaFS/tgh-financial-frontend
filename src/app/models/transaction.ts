export class Transaction {
    id: number;
    amount: number;
    description: string;
    type: string;

    constructor(_id: number, _amount: number, _description: string, _type: string) {
        this.id = _id;
        this.amount = _amount;
        this.description = _description;
        this.type = _type;
    }
}
