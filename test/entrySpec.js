import Entry from '../lib/entry.js';
import testData from './data/testData.json';

describe('Entry', function () {
  let connection;
  let emitter;
  let entry;
  let sendToParent;

  beforeEach(function () {
    sendToParent = function () {};
    connection = { sendToParent: sendToParent };
    emitter = {
      on: (event, cbf) => {
        setTimeout(() => {
          cbf({ data: { data: testData.entry, name: 'entrySave' } });
          cbf({ data: { data: {}, name: 'entryPublish' } });
          cbf({ data: { data: testData.entry, name: 'entryChange' } });
        }, 50);
      }
    };
    spyOn(emitter, 'on').and.callThrough();
    entry = new Entry({ data: testData }, connection, emitter);
  });

  it('init', function (done) {
    setTimeout(function () {
      expect(entry.content_type).toEqual(testData.content_type);
      expect(entry.locale).toEqual(testData.entry.locale);
      expect(emitter.on).toHaveBeenCalledWith('entrySave', jasmine.any(Function));
      expect(emitter.on).toHaveBeenCalledWith('entryChange', jasmine.any(Function));
      expect(emitter.on.calls.count()).toEqual(2);
      done();
    }, 100);
  });

  it('getData', function () {
    expect(testData.entry).toEqual(entry.getData());
  });

  it('getField undefined', function () {
    let uid = 'group1.group';
    let schema = entry.content_type.schema[5].schema[0];
    let field = entry.getField(uid);

    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it('getField modular blocks, get complete block', function () {
    let uid = 'modular_blocks.0';
    let schema = entry.content_type.schema[6].blocks[2];
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it('getField modular blocks, get single block', function () {
    let uid = 'modular_blocks.0.banner';
    let schema = entry.content_type.schema[6].blocks[2].schema;
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it('getField modular blocks, get block field', function () {
    let uid = 'modular_blocks.0.banner.banner_image';
    let schema = entry.content_type.schema[6].blocks[2].schema[0];
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it('getField global field', function () {
    let uid = 'global_field.single_line';
    let schema = entry.content_type.schema[7].schema[0];
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it('getField multiple group', function () {
    let uid = 'group.group.group.0.single_line';
    let schema = entry.content_type.schema[4].schema[0].schema[0].schema[0];
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it('getField group', function () {
    let uid = 'group.group.group';
    let schema = entry.content_type.schema[4].schema[0].schema[0];
    let field = entry.getField(uid);
    expect(field.uid).toEqual(uid);
    expect(field.data_type).toEqual(schema.data_type);
    expect(field.schema).toEqual(schema);
  });

  it('set field data restriction', function () {
    let uid = 'group.group.group';
    let field = entry.getField(uid);
    try {
      field.setData({ d: 'dummy' });
    } catch (e) {
      console.log(e);
      expect(e.message).toEqual('Cannot call set data for current field type');
    }
  });

  it('set field data restriction for modular blocks, one complete block', function () {
    let uid = 'modular_blocks.0';
    let field = entry.getField(uid);
    try {
      field.setData({ d: 'dummy' });
    } catch (e) {
      console.log(e);
      expect(e.message).toEqual('Cannot call set data for current field type');
    }
  });

  it('getField Invalid Uid Multiple', function () {
    let uid = 'group.group.group.0';
    try {
      entry.getField(uid);
    } catch (e) {
      expect(e.message).toEqual('Invalid uid, Field not found');
    }
  });


  it('getField Invalid Uid', function () {
    try {
      entry.getField('invaliduid');
    } catch (e) {
      expect(e.message).toEqual('Invalid uid, Field not found');
    }
  });

  it('onSave Callback must be a function', function () {
    try {
      entry.onSave();
    } catch (e) {
      expect(e.message).toEqual('Callback must be a function');
    }
  });

  it('onSave', function (done) {
    entry.onSave(function () {
      expect(emitter.on).toHaveBeenCalledWith('entrySave', jasmine.any(Function));
      done();
    });
  });

  it('onChange Callback must be a function', function () {
    try {
      entry.onChange();
    } catch (e) {
      expect(e.message).toEqual('Callback must be a function');
    }
  });

  it('onChange', function (done) {
    entry.onChange(function () {
      expect(emitter.on).toHaveBeenCalledWith('entryChange', jasmine.any(Function));
      done();
    });
  });

  it('onPublish Callback must be a function', function () {
    try {
      entry.onPublish();
    } catch (e) {
      expect(e.message).toEqual('Callback must be a function');
    }
  });

  it('onPublish', function (done) {
    entry.onPublish(function () {
      expect(emitter.on).toHaveBeenCalledWith('entryPublish', jasmine.any(Function));
      done();
    });
  });

  it('onUnPublish Callback must be a function', function () {
    try {
      entry.onUnPublish();
    } catch (e) {
      expect(e.message).toEqual('Callback must be a function');
    }
  });

  it('getField within Create page', function () {
    const dataWithoutEntry = JSON.parse(JSON.stringify(testData));
    dataWithoutEntry.entry = {};
    // @ts-ignore
    entry = new Entry({ data: dataWithoutEntry }, connection, emitter);
    expect(() => entry.getField("invaliduid")).toThrowError(
      'getField cannot fetch data from unsaved entry'
    );
  });

  it('onUnPublish', function (done) {
    entry.onUnPublish(function () {
      expect(emitter.on).toHaveBeenCalledWith('entryUnPublish', jasmine.any(Function));
      done();
    });
  });
});
