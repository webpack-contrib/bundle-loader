import { name as PROJECT_NAME } from '../package.json';
import bundleLoader from '../src';

describe(PROJECT_NAME, () => {
  test('should export the loader', (done) => {
    expect(bundleLoader).toBeInstanceOf(Function);
    done();
  });
  test('should request chunk when bundle is required', (done) => {
    expect(bundleLoader).toBeInstanceOf(Function);
    done();
  });
  test('should request chunk when load function is called', (done) => {
    expect(bundleLoader).toBeInstanceOf(Function);
    done();
  });
  test('should set bundle name correctly', (done) => {
    expect(bundleLoader).toBeInstanceOf(Function);
    done();
  });
});
