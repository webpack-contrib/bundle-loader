import { name as PROJECT_NAME } from '../package.json';
import BundleLoader from '../src';

describe(PROJECT_NAME, () => {
  test('should export the loader', (done) => {
    expect(BundleLoader).toBeInstanceOf(Function);
    done();
  });
});
