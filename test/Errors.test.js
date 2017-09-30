import { pitch } from '../src';

describe('Errors', () => {
  test('Validation Error', () => {
    const err = () => pitch.call({ query: { name: 1 } });

    expect(err).toThrow();
    expect(err).toThrowErrorMatchingSnapshot();
  });
});
