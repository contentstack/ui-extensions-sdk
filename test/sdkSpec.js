import testData from './data/testData.json'
import ContentstackUIExtension from '../lib/index.js';
import MainModule from 'inject-loader!../lib/index.js'
import ExtensionModule from 'inject-loader!../lib/extension.js'


describe("ContentstackUIExtension", () => {
  let newContentstackUIExtension;
  let sendToParent
  let on = function (event, cbf) {
    setTimeout(() => {
      cbf({ data: testData.entry })
    }, 300)
  };


  it("init", function (done) {
    sendToParent = function (channel) { return Promise.resolve({ data: testData }) };

    let newExtensionModule = ExtensionModule({
      'post-robot': { sendToParent, on }
    })
    newContentstackUIExtension = MainModule({
      'post-robot': { CONFIG: {} },
      './extension.js': newExtensionModule
    }).default


    newContentstackUIExtension.init().then((extension) => {
      expect(extension.config).toEqual(testData.config);
      expect(extension.currentUser).toEqual(testData.user);
      expect(extension.type).toEqual('FIELD');
      newContentstackUIExtension.init().then((newExtesnion) => { // must return same extension object once initialized
        expect(extension).toEqual(newExtesnion);
        done();
      })
    });
  });

  it("init failure", function (done) {
    sendToParent = function (channel) { return Promise.reject('Sample Error') };

    let newExtensionModule = ExtensionModule({
      'post-robot': { sendToParent, on }
    })
    newContentstackUIExtension = MainModule({
      'post-robot': { CONFIG: {} },
      './extension.js': newExtensionModule
    }).default


    newContentstackUIExtension.init().catch((error) => {
      expect(error).toEqual('Sample Error');
      done()
    });
  });

  it("SDK_VERSION", function () {
    expect(newContentstackUIExtension.SDK_VERSION).toEqual('2.1.1');
  });

});