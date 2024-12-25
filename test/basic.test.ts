import * as assert from 'node:assert';

test('JSON', () => {
  const input = {
    foo: 'hello',
    bar: 'world',
  };

  const output = JSON.stringify(input);

  assert.deepEqual(JSON.parse(output), input, 'matches original');
});

describe('suite name', () => {
  it('foo', () => {
    assert.equal(Math.sqrt(4), 2);
  });

  it('snapshot', () => {
    expect({ foo: 'bar' }).toMatchSnapshot();
  });
});
