import { name as PROJECT_NAME } from '../package.json';
import bundleLoader from '../src';

describe(PROJECT_NAME, () => {
  test('should export the loader', (done) => {
    expect(bundleLoader).toBeInstanceOf(Function);
    done();
  });
});
