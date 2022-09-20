import { Account } from './account';

describe('Account', () => {
  it('should create an instance', () => {

   expect(new Account(2, 'checking', 10000, 'description', '08-06-2022')).toBeTruthy();

  });
});
