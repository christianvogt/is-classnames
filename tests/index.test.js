import cx, { create, prefix } from '../index';

describe('is-classnames', () => {

  it('does not prefix names containing hyphens', () => {
    expect(cx('a-b')).toBe('a-b');
    expect(cx(['a-b', 'c-d'])).toBe('a-b c-d');
    expect(cx({ 'a-b': true, 'c-d': true })).toBe('a-b c-d');
  });

  it('prefix names without hyphens', () => {
    expect(cx('a')).toBe('is-a');
    expect(cx({ a: true, b: true })).toBe('is-a is-b');
    expect(cx(['a', 'b'])).toBe('is-a is-b');
  });

  it('handles empty names', () => {
    expect(cx(undefined)).toBe('');
    expect(cx(null)).toBe('');
    expect(cx()).toBe('');
    expect(cx('')).toBe('');
    expect(cx(0)).toBe('');
    expect(cx([undefined, null, '', 0])).toBe('');
    expect(cx({ '': true })).toBe('');
  });

  it('always apply prefix', () => {
    expect(prefix('a-a', 'a')).toBe('is-a-a is-a');
  });

  it('custom prefix must contain a hyphen', () => {
    expect(() => create('a')).toThrow();
  });

  it('create custom prefix', () => {
    const ccx = create('test-');
    expect(ccx('a')).toBe('test-a');
    expect(ccx('a-a', 'a')).toBe('a-a test-a');
    expect(ccx.prefix('a-a', 'a')).toBe('test-a-a test-a');
  });

});
