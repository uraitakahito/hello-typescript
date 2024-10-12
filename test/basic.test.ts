import { assert, describe, expect, it, test } from 'vitest';
import mul from '../src/basic';

test('multiplies 2 and 3 to give 6', () => {
    expect(mul(2, 3)).toBe(6);
});

test('JSON', () => {
    const input = {
        foo: 'hello',
        bar: 'world',
    };

    const output = JSON.stringify(input);

    expect(output).eq('{"foo":"hello","bar":"world"}');
    assert.deepEqual(JSON.parse(output), input, 'matches original');
});

describe('suite name', () => {
    it('foo', () => {
        assert.equal(Math.sqrt(4), 2);
    });

    it('bar', () => {
        expect(1 + 1).eq(2);
    });

    it('snapshot', () => {
        expect({ foo: 'bar' }).toMatchSnapshot();
    });
});
