import { Account } from './account';

describe('Account', () => {
  it('should create an instance', () => {
    expect(new Account(0, 'testaccount', 20000, 'checking', 'today')).toBeTruthy();
  });
});
