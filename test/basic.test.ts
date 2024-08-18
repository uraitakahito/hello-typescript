import { expect, test } from 'vitest';
import mul from "../src/basic";

test("multiplies 2 and 3 to give 6", () => {
  expect(mul(2, 3)).toBe(6);
});
