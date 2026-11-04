import testData from './data/testData.json';
import ContentstackUIExtension from '../lib/index.js';
import Extension from '../lib/extension.js';
import pkg from '../package.json';
import helpers from './helpers';

// karma has no host to answer 'init', so Extension.initialize is stubbed with
// what the host returns.
describe('ContentstackUIExtension', () => {
  beforeEach(function () {
    ContentstackUIExtension._extension = undefined;
    helpers.resetExtensionEventListener();
  });

  it('init', function (done) {
    spyOn(Extension, 'initialize').and.returnValue(Promise.resolve({ data: helpers.clone(testData) }));

    ContentstackUIExtension.init().then((extension) => {
      expect(Extension.initialize).toHaveBeenCalledWith(pkg.version);
      expect(extension.config).toEqual(testData.config);
      expect(extension.currentUser).toEqual(testData.user);
      expect(extension.type).toEqual('FIELD');
      ContentstackUIExtension.init().then((newExtension) => { // must return same extension object once initialized
        expect(newExtension).toBe(extension);
        expect(Extension.initialize.calls.count()).toEqual(1);
        done();
      });
    });
  });

  it('init failure', function (done) {
    spyOn(Extension, 'initialize').and.returnValue(Promise.reject('Sample Error'));

    ContentstackUIExtension.init().catch((error) => {
      expect(error).toEqual('Sample Error');
      done();
    });
  });

  it('SDK_VERSION', function () {
    expect(ContentstackUIExtension.SDK_VERSION).toEqual(pkg.version);
  });
});
