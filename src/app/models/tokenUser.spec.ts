import { TokenUser } from './tokenUser';
import { User } from './user';

describe('TokenUser', () => {
  it('should create an instance', () => {
    expect(new TokenUser(0, '', new Date(), new User(0, '', '', false))).toBeTruthy();
  });
});
