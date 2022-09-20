import { Transaction } from './transaction';

describe('Transaction', () => {
  it('should create an instance', () => {

    expect(new Transaction(2, 2000, 'description', 'checking')).toBeTruthy();

  });
});
