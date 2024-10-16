import { primenumber } from '../src/prime';

describe('primenumber', () => {
    it('should return false when n is less than 1', () => {
        const result = primenumber(0);
        expect(result).toBe(false);
    });

    it('should return false when n is not a prime number', () => {
        const result = primenumber(4);
        expect(result).toBe(false);
    });

    it('should return true when n is a prime number', () => {
        const result = primenumber(7);
        expect(result).toBe(true);
    });

    it('should return true when n is a large prime number', () => {
        const result = primenumber(997);
        expect(result).toBe(true);
    });
});
