import testData from './data/testData.json'
import Extension from '../lib/extension.js';
import ExtensionModule from 'inject-loader!../lib/extension.js'


describe("Extension", () => {
  let newExtension;
  let sendToParent = function (channel) { return Promise.resolve({ data: testData }) };
  let on = function (event, cbf) {
      setTimeout(() => {
        cbf({ data: {data:testData.entry, name:"entrySave"} });
        cbf({ data: { state:'full_width', name:"dashboardResize"} });

      }, 300)
    };

  beforeEach(function () {
    newExtension = ExtensionModule({
      'post-robot': { sendToParent, on },
    }).default
  });

  it("initialize", function (done) {
    newExtension.initialize().then((data) => {


      let extension = new newExtension(data)
      expect(extension.config).toEqual(testData.config);
      expect(extension.currentUser).toEqual(testData.user);
      expect(extension.type).toEqual('FIELD');

      testData.type = 'SIDEBAR'
      extension = new newExtension(data);
      expect(extension.type).toEqual(testData.type);
      expect(extension.window).toBeUndefined();
      expect(extension.field).toBeUndefined();

      testData.type = 'DASHBOARD'
      extension = new newExtension(data);
      expect(extension.type).toEqual(testData.type);
      expect(extension.entry).toBeUndefined();
      expect(extension.field).toBeUndefined();
      done();
    });
  });

  it("setReady", function (done) {
    let extension = new newExtension({ data: testData })
    extension.setReady().then(() => {
      done()
    });
  });

});