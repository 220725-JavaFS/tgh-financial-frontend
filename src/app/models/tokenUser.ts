import { User } from "./user";

export class TokenUser {
    tokenid: number;
    token: string;
    createdDate: Date;
    user: User;

    constructor(tokenid: number, token: string, createdDate: Date, user: User) {
        this.tokenid = tokenid;
        this.token = token;
        this.createdDate = createdDate;
        this.user = user;
    }
}
