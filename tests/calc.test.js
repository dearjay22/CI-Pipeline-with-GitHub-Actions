const calc = require('../src/calc');

describe('calc functions', () => {
  test('add should add two numbers', () => {
    expect(calc.add(2, 3)).toBe(5);
    expect(calc.add(-1, 1)).toBe(0);
  });

  test('sub should subtract correctly', () => {
    expect(calc.sub(5, 2)).toBe(3);
  });

  test('mul should multiply', () => {
    expect(calc.mul(4, 5)).toBe(20);
  });

  test('div should divide and throw on zero', () => {
    expect(calc.div(10, 2)).toBe(5);
    expect(() => calc.div(1, 0)).toThrow('division by zero');
  });

  test('isPrime works for primes and non-primes', () => {
    expect(calc.isPrime(2)).toBe(true);
    expect(calc.isPrime(3)).toBe(true);
    expect(calc.isPrime(4)).toBe(false);
    expect(calc.isPrime(1)).toBe(false);
    expect(calc.isPrime(17)).toBe(true);
  });

  test('type checking', () => {
    expect(() => calc.add('a', 1)).toThrow('add expects numbers');
    expect(() => calc.isPrime(2.5)).toThrow('isPrime expects integer');
  });
});
