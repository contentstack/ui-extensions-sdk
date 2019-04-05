/** Class representing a field from Contentstack UI. Only available for Custom Field extension */

class Field {
  /**
   * @hideconstructor
   */
  constructor(fieldDataObject, connection, emitter) {
    /**
     * The UID of the current field is defined in the content type of the entry.
     * @type {string}
     */
    this.uid = fieldDataObject.data.uid;
    /**
     * The data type of the current field is set using this method.
     * @type {string}
     */
    this.data_type = fieldDataObject.data.schema.data_type;
    /**
     * The schema of the current field (schema of fields such as ‘Single Line Textbox’, ‘Number’,
     *  and so on) is set using this method.
     * @type {Object}
     */
    this.schema = fieldDataObject.data.schema;

    this._data = fieldDataObject.data.value;

    this._connection = connection;

    this._self = fieldDataObject.data.self || false;

    const fieldObj = this;

    emitter.on('updateFields', (event) => {
      const path = fieldObj.uid.split('.');
      let value = event.data;

      path.forEach((key) => {
        if (value) { value = value[key]; }
      });

      if (fieldObj._data !== value) {
        fieldObj._data = value;
      }
    });
  }

  /**
   * Sets the data for the current field.
   * @param {Object|string|number} data Data to be set on the field
   * @return {external:Promise} A promise object which is resolved when data is set for a field. Note: The data set by this function will only be saved when user saves the entry.
   */

  setData(data) {
    const currentFieldObj = this;
    const dataObj = { data, uid: currentFieldObj.uid, self: currentFieldObj._self };
    return this._connection.sendToParent('setData', dataObj).then(() => {
      this._data = data;
      return Promise.resolve(currentFieldObj);
    }).catch(e => Promise.reject(e));
  }

  /**
   * Gets the data of the current field
   * @return {Object|string|number} Returns the field data.
   */

  getData() {
    return this._data;
  }

  /**
   * Sets the focus for a field when an extension is being used. This method shows user presence and highlights the extension field that the user is currently accessing in Contentstack UI.
   * @return {Object} A promise object which is resolved when Contentstack UI returns an acknowledgement of the focused state.
   */
  setFocus() {
    return this._connection.sendToParent('focus');
  }
}


export default Field;
