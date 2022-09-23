import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(2, 'testuser@gmail.com', 'password', false)).toBeTruthy();
    expect(new User(0, '', '', false)).toBeTruthy();
  });
});
