// https://pc.atsuhiro-me.net/entry/2022/02/28/163920
import * as assert from 'node:assert';

const sleep = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

beforeAll(async () => {
    await sleep(1000);
    console.log('beforeAll() complete.');
});
afterAll(async () => {
    await sleep(1000);
    console.log('afterAll() complete.');
});
beforeEach(async () => {
    await sleep(1000);
    console.log('beforeEach() complete.');
});
afterEach(async () => {
    await sleep(1000);
    console.log('afterEach() complete.');
});

describe('concurrent suite', () => {
    it.concurrent('a', async () => {
        await sleep(1000);
        assert.equal(1, 1);
        console.log('test a complete.');
    });
    it.concurrent('b', async () => {
        await sleep(1000);
        assert.equal(2, 2);
        console.log('test b complete.');
    });
    it.concurrent('c', async () => {
        await sleep(1000);
        assert.equal(3, 3);
        console.log('test c complete.');
    });
});
