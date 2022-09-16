export class UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: any;
    telephone: any;

    constructor(_id: number, _firstName: string, _lastName: string, _streetAddress: string, _city: string,
        _state: string, _postalCode: any, _telephone: any) {
        this.id = _id;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.streetAddress = _streetAddress;
        this.city = _city;
        this.state = _state;
        this.postalCode = _postalCode;
        this.telephone = _telephone;
        
    }
    
}
