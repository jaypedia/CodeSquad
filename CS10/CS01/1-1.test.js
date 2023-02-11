const { expect } = require('@jest/globals');
const { and, or, xor } = require('./1-1.js');

describe('Logic Gate', () => {
  test('AND', () => {
    expect(and(true, true)).toBe(true);
    expect(and(true, false)).toBe(false);
    expect(and(false, true)).toBe(false);
    expect(and(false, false)).toBe(false);
  });
});
