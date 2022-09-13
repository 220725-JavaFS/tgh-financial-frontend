export class User {
    id: number;
    email: string;
    password: string;

    constructor(_id: number, _email: string, _password: string) {
        this.id = _id;
        this.email = _email;
        this.password = _password;
    }
}
