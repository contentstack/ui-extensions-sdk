import Field from '../lib/field.js';
import testData from './data/testData.json'
import fileFieldData from './data/fileField.json'
import helpers from './helpers'

describe("Field", () => {

  let connection;
  let emitter;
  let sendToParent;
  let field
  let sendToParentError = function () {
    return Promise.reject("sample error")
  }

  describe("Generic", () => {

    beforeEach(() => {

      sendToParent = function () {
        return Promise.resolve()
      }


      connection = { sendToParent: sendToParent }
      emitter = {
        on: (event, cbf) => {
          setTimeout(() => {
            cbf({ data: testData.entry })
          }, 100)
        }
      }
      spyOn(connection, 'sendToParent').and.callThrough();
      spyOn(emitter, 'on').and.callThrough();
      testData.self = true;
      field = new Field({ data: testData }, connection, emitter)
    });

    it("init", (done) => {
      setTimeout(() => {
        expect(field.uid).toEqual(testData.uid);
        expect(field.data_type).toEqual(testData.schema.data_type);
        expect(field.schema).toEqual(testData.schema);
        expect(emitter.on).toHaveBeenCalled();
        done();
      }, 150);
    });

    it("getData", () => {
      expect(testData.value).toEqual(field.getData());
    });

    it("setData", (done) => {
      field.setData('sampleData').then((fieldObj) => {
        expect(fieldObj.uid).toEqual(testData.uid);
        expect(fieldObj.data_type).toEqual(testData.schema.data_type);
        expect(fieldObj.schema).toEqual(testData.schema);
        expect(connection.sendToParent).toHaveBeenCalledWith('setData', { data: 'sampleData', uid: field.uid , self:true});
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

  describe("File", () => {
      let singleFileField;
      let multipleFileField;

      beforeEach(() => {
        sendToParent = function () {
          return Promise.resolve()
        }


        connection = { sendToParent: sendToParent }
        emitter = {
          on: (event, cbf) => {
            setTimeout(() => {
              cbf({ data: testData.entry })
            }, 100)
          }
        }
        spyOn(connection, 'sendToParent').and.callThrough();
        spyOn(emitter, 'on').and.callThrough();
        singleFileField = new Field({ data: fileFieldData.single }, connection, emitter)
        multipleFileField = new Field({ data: fileFieldData.multiple }, connection, emitter)
      });

      it("blank initial value test", () => {
          let clonedfileField = helpers.clone(fileFieldData);
          delete clonedfileField.single.value;
          delete clonedfileField.multiple.value;
          let emptySingleFileField = new Field({ data: clonedfileField.single }, connection, emitter);
          let emptyMultipleFileField = new Field({ data: clonedfileField.multiple }, connection, emitter);
          expect(emptySingleFileField.getData()).toBe(undefined);
          expect(emptyMultipleFileField.getData().length).toBe(0);
      });

      it("getData default", () => {
          expect(fileFieldData.single.value.uid).toEqual(singleFileField.getData());
          expect(fileFieldData.multiple.value.map(file => file.uid)).toEqual(multipleFileField.getData());
      });

      it("getData resolved", () => {
          expect(fileFieldData.single.value).toEqual(singleFileField.getData({resolved : true}));
          expect(fileFieldData.multiple.value).toEqual(multipleFileField.getData({resolved : true}));
      });
  });
});