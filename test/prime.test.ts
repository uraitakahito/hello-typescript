import primenumber from '../src/prime';

describe('primenumber', () => {
  it('should return false when n is less than 1', () => {
    const isprime = primenumber(0);
    expect(isprime).toBe(false);
  });

  it('should return false when n is not a prime number', () => {
    const isprime = primenumber(4);
    expect(isprime).toBe(false);
  });

  it('should return true when n is a prime number', () => {
    const isprime = primenumber(7);
    expect(isprime).toBe(true);
  });

  it('should return true when n is a large prime number', () => {
    const isprime = primenumber(997);
    expect(isprime).toBe(true);
  });
});
