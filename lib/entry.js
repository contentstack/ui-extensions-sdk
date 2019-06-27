import Field from './field.js';

/** Class representing an entry from Contentstack UI. Not available for Dashboard Widget extension.  */

class Entry {
  /**
   * @hideconstructor
   */
  constructor(initializationData, connection, emitter) {
    /**
     * Gets the content type of the current entry.
     * @type {Object}
     */
    this.content_type = initializationData.data.content_type;

    this._data = initializationData.data.entry;
    /**
     * Gets the locale of the current entry.
     * @type {string}
     */
    this.locale = initializationData.data.locale;

    this._connection = connection;

    this._emitter = emitter;

    const thisEntry = this;

    this._emitter.on('entrySave', (event) => {
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
   * Gets the field object which allows you to interact with the field.
   * This object will have all the same methods and properties of extension.field except for field.setData().
   * @example
   * var field = entry.getField('field_uid');
   * var fieldSchema = field.schema;
   * var fieldUid = field.uid;
   * var fieldData = field.getData();
   * @param {string} uid Unique ID of the field
   * @return {Object} Field object
  */


  getField(uid) {
    const path = uid.split('.');
    let value = this._data;
    let schema = this.content_type.schema;

    try {
      let skipNext = false;
      path.forEach((key, index) => {
        if (skipNext) {
          skipNext = false;
          return;
        }

        schema = schema.find(x => x.uid === key);
        if (!schema) { throw Error('schema not found'); }

        value = value[key];
        if (schema.data_type === 'group' && schema.multiple === false
          && path.length !== (index + 1)) {
          schema = schema.schema;
        } else if (schema.data_type === 'group' && schema.multiple === true
         && path.length !== (index + 1)) {
          schema = schema.schema;
          value = value[path[index + 1]];
          skipNext = true;
        }
      });
    } catch (e) {
      throw Error('Invalid uid, Field not found');
    }

    const fieldIntilaizationDataObject = {
      data: {
        uid, value, schema, data_type: schema.data_type
      }
    };
    const fieldObject = new Field(fieldIntilaizationDataObject, this._connection, this._emitter);
    return fieldObject;
  }

  /**
   * This function executes the callback function every time an entry is saved.
   * @param {function} callback The function to be called when an entry is saved.
   */


  onSave(callback) {
    const entryObj = this;
    if (callback && typeof (callback) === 'function') {
      entryObj._emitter.on('entrySave', (event) => {
        callback(event.data);
      });
    } else {
      throw Error('Callback must be a function');
    }
  }
}
export default Entry;
