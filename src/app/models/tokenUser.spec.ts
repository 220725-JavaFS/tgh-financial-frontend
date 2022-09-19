import { TokenUser } from './tokenUser';
import { User } from './user';

describe('TokenUser', () => {
  it('should create an instance', () => {
<<<<<<< HEAD
    expect(new TokenUser(0, '', new Date(), new User(0, '', ''))).toBeTruthy();
=======
    expect(new TokenUser(0, '', new Date, new User(0, '', ''))).toBeTruthy();
>>>>>>> 50573b2b86370c34d5778c20eceb1b8e0f77ef58
  });
});
