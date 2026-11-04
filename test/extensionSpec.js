import originalTestData from './data/testData.json';
import Extension from '../lib/extension.js';
import helpers from './helpers';

// Extension.initialize posts 'init' to the host and karma has no host to answer,
// so these specs build Extension from init data, as the host would return it.
describe('Extension', () => {
  let testData;

  beforeEach(function () {
    testData = helpers.clone(originalTestData);
    helpers.resetExtensionEventListener();
  });

  it('initialize', function () {
    let extension = new Extension({ data: testData });
    expect(extension.config).toEqual(testData.config);
    expect(extension.currentUser).toEqual(testData.user);
    expect(extension.type).toEqual('FIELD');
    expect(extension.field).toBeDefined();
    expect(extension.entry).toBeDefined();
    expect(extension.window).toBeDefined();

    helpers.resetExtensionEventListener();
    testData.type = 'SIDEBAR';
    extension = new Extension({ data: testData });
    expect(extension.type).toEqual(testData.type);
    expect(extension.window).toBeUndefined();
    expect(extension.field).toBeUndefined();

    helpers.resetExtensionEventListener();
    testData.type = 'DASHBOARD';
    extension = new Extension({ data: testData });
    expect(extension.type).toEqual(testData.type);
    expect(extension.entry).toBeUndefined();
    expect(extension.field).toBeUndefined();
  });

  it('setReady', function (done) {
    let extension = new Extension({ data: testData });
    extension.postRobot = { sendToParent: jasmine.createSpy('sendToParent').and.returnValue(Promise.resolve()) };
    extension.setReady().then(() => {
      expect(extension.postRobot.sendToParent).toHaveBeenCalledWith('ready');
      done();
    });
  });
});
