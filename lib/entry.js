import Field from "./field.js";

/** Class representing a entry from contentstack ui. */

class Entry {

  constructor(initializationData, connection, emitter) {

     /**
     * Gets contenttype of the current entry.
     * @type {Object}
     */
    this.content_type = initializationData.data.content_type;

    this._data = initializationData.data.entry;
     /**
     * Gets locale of the current entry.
     * @type {string}
     */
    this.locale = initializationData.data.locale;

    this._connection = connection;

    this._emitter = emitter;

    let thisEntry = this
    this._emitter.on('entryUpdate', function (event) {
      thisEntry._data = event.data;
    });
  }

  /**
 * Gets data of the current entry.
 * @return {Object} Returns entry data.
 */

  getData() {
    return this._data;
  }


    /**
   * Gets the field object which allows you to interact with the field. These object will have all the same methods and properties of extension.field except for field.setData().
   * @example
   * var field = entry.getField('field_uid');
   * var fieldSchema = field.schema;
   * var fieldUid = field.uid;
   * var fieldData = field.getData();
   * @param {string} uid of the field
   * @return {Object} Field Object
   */


  getField(uid) {
    if (this._data[uid]) {
      let schema = this.content_type.schema.find(x => x.uid === uid);
      let fieldIntilaizationDataObject = { data: { uid: uid, value: this._data[uid], schema: schema, data_type: schema.data_type } };
      let fieldObject = new Field(fieldIntilaizationDataObject, this._connection, this._emitter );
      fieldObject.setData = null;
      return fieldObject;
    }
    throw Error('Invalid uid, Field not found')
  }

  /**
   * Fires the callback function every time  entry data is updated.
   * @param {Function} cd Callback function
   */

  onChange(callback) {
    let entryObj = this;
    if (callback && typeof (callback) === "function") {
      entryObj._emitter.on('entryUpdate', function (event) {
        callback(event.data);
      });
    }else {
      throw Error('Callback must be a function')
    }
  }
}


export default Entry;