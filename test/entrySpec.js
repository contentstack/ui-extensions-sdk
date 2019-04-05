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
          cbf({ data: {data:testData.entry, name:"entrySave"} })
        }, 50)
      }
    }
    spyOn(emitter, 'on').and.callThrough();
    entry = new Entry({ data: testData }, connection, emitter)
  });

  it("init", function (done) {
    setTimeout(function () {
      expect(entry.content_type).toEqual(testData.content_type);
      expect(entry.locale).toEqual(testData.entry.locale);
      expect(emitter.on).toHaveBeenCalledWith('entrySave', jasmine.any(Function));
      expect(emitter.on.calls.count()).toEqual(1);
      done();
    }, 100);
  });

  it("getData", function () {
    expect(testData.entry).toEqual(entry.getData());
  });

  it("getField undefined", function () {
    let uid = 'group1.group'
    let schema = entry.content_type.schema[5].schema[0]
    let field = entry.getField(uid);

    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it("getField multiple group", function () {
    let uid = 'group.group.group.0.single_line'
    let schema = entry.content_type.schema[4].schema[0].schema[0].schema[0]
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it("getField group", function () {
    let uid = 'group.group.group'
    let schema = entry.content_type.schema[4].schema[0].schema[0]
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it("getField Invalid Uid Multiple", function () {
    let uid = 'group.group.group.0'
    try {
      entry.getField(uid);
    } catch(e) {
      expect(e.message).toEqual("Invalid uid, Field not found");
    }
  });


  it("getField Invalid Uid", function () {
    try {
     entry.getField('invaliduid');
    } catch(e) {
      expect(e.message).toEqual('Invalid uid, Field not found');
    }
  });

  it("onSave Callback must be a function", function () {
    try {
     entry.onSave();
    } catch(e) {
      expect(e.message).toEqual('Callback must be a function');
    }
  });

  it("onSave", function (done) {
    entry.onSave(function () {
        expect(emitter.on).toHaveBeenCalledWith('entrySave', jasmine.any(Function));
        expect(emitter.on).toHaveBeenCalledTimes(2);
        done();
    });
  });
});