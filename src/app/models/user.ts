export class User {
    id: number;
    email: string;
    password: string;
    darkmode: boolean;

    constructor(_id: number, _email: string, _password: string, _darkmode: boolean) {
        this.id = _id;
        this.email = _email;
        this.password = _password;
        this.darkmode =_darkmode;
    }
}
