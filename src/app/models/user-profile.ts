export class UserProfile {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public address: string,
        public city: string,
        public state: string,
        public zipCode: string,
        public phone: string
    ) { };
}
