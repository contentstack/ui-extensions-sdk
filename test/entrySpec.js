import Entry from '../lib/entry.js'
import testData from './data/testData.json'

describe("Entry", function () {
  let connection;
  let emitter;
  let entry;
  let sendToParent;

  beforeEach(function () {
    sendToParent = function () {}
    connection = { sendToParent: sendToParent }
    emitter = {
      on: (event, cbf) => {
        setTimeout(() => {
          cbf({ data: testData.entry })
        }, 300)
      }
    }
    spyOn(emitter, 'on').and.callThrough();
    entry = new Entry({ data: testData }, connection, emitter)
  });

  it("init", function (done) {
    setTimeout(function () {
      expect(entry.content_type).toEqual(testData.content_type);
      expect(entry.locale).toEqual(testData.entry.locale);
      expect(emitter.on).toHaveBeenCalled();
      done();
    }, 400);
  });

  it("getData", function () {
    expect(testData.entry).toEqual(entry.getData());
  });

  it("getField", function () {
    let uid = 'title'
    let schema = entry.content_type.schema.find(x => x.uid === uid);
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it("getField Invalid Uid", function () {
    try {
     let field = entry.getField('invaliduid');
    } catch(e) {
      expect(e.message).toEqual('Invalid uid, Field not found');
    }
  });

  it("onChange", function (done) {
    entry.onChange(function () {
      expect(emitter.on).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it("onChange Callback must be a function", function () {
    try {
     entry.onChange();
    } catch(e) {
      expect(e.message).toEqual('Callback must be a function');
    }
  });
});