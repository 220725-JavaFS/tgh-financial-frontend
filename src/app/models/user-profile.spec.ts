import { UserProfile } from './user-profile';

describe('UserProfile', () => {
  it('should create an instance', () => {
    expect(new UserProfile(0, 'Bill', 'Withers', '123 Hampton Rd', 'Mt. Shasta', 'CA', '90210', '5551234567')).toBeTruthy();
  });
});
