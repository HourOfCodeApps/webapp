import isOdd from '../isOdd';

describe('isOdd', () => {
  test('empty value', () => {
    expect(isOdd()).toEqual(false);
  });

  test('true', () => {
    expect(isOdd(5)).toEqual(true);
  });
});
