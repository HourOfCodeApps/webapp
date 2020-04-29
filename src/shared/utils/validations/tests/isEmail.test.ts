import isEmail from '../isEmail';

describe('isEmail', () => {
  it('valid emails return `true`', () => {
    expect(isEmail('johndoe@gmail.com')).toEqual(true);
    expect(isEmail('j0hnd0e@gmail.com')).toEqual(true);
    expect(isEmail('john-doe@gmail.com')).toEqual(true);
    expect(isEmail('john.doe@gmail.com')).toEqual(true);
  });

  it('invalid emails return `false`', () => {
    expect(isEmail('john-doe@com')).toEqual(false);
    expect(isEmail('john-doe@.com')).toEqual(false);
    expect(isEmail('john-doe@gmail')).toEqual(false);
    expect(isEmail('john doe@gmail.com')).toEqual(false);
  });
});
