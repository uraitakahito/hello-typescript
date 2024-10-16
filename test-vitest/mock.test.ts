import { expect, test, vi } from 'vitest';

test('spy function no arguments and no returns', () => {
    // Define mock function
    const getApples = vi.fn();
    // call mock function
    getApples();
    // check if mock function is called
    expect(getApples).toHaveBeenCalled();
});

test('spy function returns a product', () => {
    const getProduct = vi.fn((product: string) => ({ product }));

    getProduct('apples');

    expect(getProduct).toHaveReturnedWith({ product: 'apples' });
});

const fn = vi.fn();

fn('hello', 1);

expect(vi.isMockFunction(fn)).toBe(true);
expect(fn.mock.calls[0]).toEqual(['hello', 1]);

fn.mockImplementation((arg: string) => arg);

fn('world', 2);

expect(fn.mock.results[1].value).toBe('world');

test('spy function returns a number', () => {
    const getApples = vi.fn(() => 0);
    getApples();
    expect(getApples).toHaveReturnedWith(0);

    getApples.mockReturnValueOnce(5);
    getApples();
    expect(getApples).toHaveNthReturnedWith(2, 5);
});

const cart1 = {
    getApples: () => 4,
};

test('spy method', () => {
    // Define mock method
    const spy = vi.spyOn(cart1, 'getApples');
    // call mock method
    cart1.getApples();
    // check if mock is called
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(4);
});

const cart2 = {
    getApples: () => 4,
};

test('overwrite spy method', () => {
    const spy = vi.spyOn(cart2, 'getApples').mockImplementation(() => 8);
    cart2.getApples();
    expect(spy).toHaveReturnedWith(8);
});
