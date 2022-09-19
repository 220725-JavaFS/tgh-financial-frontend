import { Transaction } from './transaction';

describe('Transaction', () => {
  it('should create an instance', () => {
    expect(new Transaction(0, 0, '', '')).toBeTruthy();
  });
});
