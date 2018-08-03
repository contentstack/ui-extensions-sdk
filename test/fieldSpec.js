import Field from '../lib/field.js';
import testData from './data/testData.json'

describe("Field", () => {

  let connection;
  let emitter;
  let sendToParent;
  let field
  let sendToParentError = function () {
    return Promise.reject("sample error")
  }

  beforeEach(() => {

    sendToParent = function () {
      return Promise.resolve()
    }


    connection = { sendToParent: sendToParent }
    emitter = {
      on: (event, cbf) => {
        setTimeout(() => {
          cbf({ data: testData.entry })
        }, 300)
      }
    }
    spyOn(connection, 'sendToParent').and.callThrough();
    spyOn(emitter, 'on').and.callThrough();
    field = new Field({ data: testData }, connection, emitter)
  });

  it("init", (done) => {
    setTimeout(() => {
      expect(field.uid).toEqual(testData.uid);
      expect(field.data_type).toEqual(testData.schema.data_type);
      expect(field.schema).toEqual(testData.schema);
      expect(emitter.on).toHaveBeenCalled();
      done();
    }, 400);
  });

  it("getData", () => {
    expect(testData.value).toEqual(field.getData());
  });

  it("setData", (done) => {
    field.setData('sampleData').then((fieldObj) => {
      expect(fieldObj.uid).toEqual(testData.uid);
      expect(fieldObj.data_type).toEqual(testData.schema.data_type);
      expect(fieldObj.schema).toEqual(testData.schema);
      expect(connection.sendToParent).toHaveBeenCalledWith('setData', { data: 'sampleData', uid: field.uid });
      done();
    });
  });

  it("setData Error Case", (done) => {
    let newField = new Field({ data: testData }, { sendToParent: sendToParentError }, emitter)
    newField.setData().catch((e) => {
      expect(e).toEqual("sample error");
      done()
    })
  });

  it("setFocus", (done) => {
    field.setFocus().then(() => {
      expect(connection.sendToParent).toHaveBeenCalledWith('focus');
      done();
    });
  });
});