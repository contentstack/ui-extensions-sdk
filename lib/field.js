/** Class representing a field from contentstack ui. */

class Field {

  constructor(fieldDataObject, connection, emitter) {

    /**
     * The uid of the current field is defined in the content type of the entry..
     * @type {string}
     */
    this.uid = fieldDataObject.data.uid;
    /**
     * The data type of the current field is set using this method.
     * @type {string}
     */
    this.data_type = fieldDataObject.data.schema.data_type;
    /**
     * The schema of the current field (schema of fields such as ‘Single Line Textbox’, ‘Number’, and so on) is set using this method.
     * @type {Object}
     */
    this.schema = fieldDataObject.data.schema;

    this._data = fieldDataObject.data.value;

    this._connection = connection;

    this._self = fieldDataObject.data.self || false;
    
    let fieldObj = this

    emitter.on('updateFields', function (event) {
      let path = fieldObj.uid.split('.');
      let value = event.data;

      path.forEach(key => {
        if(value)
          value = value[key]
      });

      if (fieldObj._data !== value) {
        fieldObj._data = value;
      }
    });
  }

  /**
   * Sets the data for the current field.
   * @param {Object|string|number} data Data to be set on the field
   * @return {Object} A Promise object which will return Field object.
   */

  setData(data) {
    let currentFieldObj = this;
    let dataObj = {data, uid:currentFieldObj.uid, self : currentFieldObj._self}
    return this._connection.sendToParent('setData', dataObj).then(() => {
      this._data = data;
      return Promise.resolve(currentFieldObj);
    }).catch((e) => Promise.reject(e));
  }

  /**
   * Gets data of the current field
   * @return {Object|string|number} Returns field data.
   */

  getData() {
    return this._data;
  }

  /**
   * Sets the focus for a field when an extension is being used. This method shows user presence and highlights field in Contentstack UI by returning a promise object.
   * @return {Object} A Promise object which will resolve on Contentstack UI acknowledgement of focused state.
   */
  setFocus() {
    return this._connection.sendToParent('focus')
  }

}


export default Field;