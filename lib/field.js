const excludedDataTypesForSetField = ['file', 'reference', 'blocks', 'group', 'global_field'];

function separateResolvedData(field, value) {
  let resolvedData = value;
  let unResolvedData = value;
  if (field.data_type === 'file') {
    if (value) {
      resolvedData = value;
      unResolvedData = field.schema.multiple === true
        ? value.map(file => file.uid)
        : value.uid;
    } else if (field.schema.multiple === true) {
      resolvedData = [];
      unResolvedData = [];
    }
  }
  return { resolvedData, unResolvedData };
}

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
    this._emitter = emitter;

    let separatedData = separateResolvedData(this, fieldDataObject.data.value);

    this._data = separatedData.unResolvedData;

    this._resolvedData = separatedData.resolvedData;

    this._connection = connection;

    this._self = fieldDataObject.data.self || false;

    const fieldObj = this;

    emitter.on('updateFields', (event) => {
      const schemaPath = this._self && '$uid' in fieldObj.schema ? fieldObj.schema.$uid : fieldObj.uid;
      const path = schemaPath.split('.');

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

    if (!currentFieldObj._self
        && ((excludedDataTypesForSetField.indexOf(currentFieldObj.data_type) !== -1)
            || !currentFieldObj.data_type)) { return Promise.reject(new Error('Cannot call set data for current field type')); }

    return this._connection.sendToParent('setData', dataObj).then(() => {
      this._data = data;
      return Promise.resolve(currentFieldObj);
    }).catch(e => Promise.reject(e));
  }

  /**
    * Gets the data of the current field
    * @param  {Object} options Options object for get Data method.
    * @param  {boolean} options.resolved If the resolved parameter is set to true for the File field, then the method will return a resolved asset object along with all the field metadata, e.g. 'field.getData({resolved:true})'.
    * @return {Object|string|number} Returns the field data.
    */
  getData({ resolved = false } = {}) {
    return resolved ? this._resolvedData : this._data;
  }

  /**
   * Sets the focus for a field when an extension is being used. This method shows user presence and highlights the extension field that the user is currently accessing in Contentstack UI.
   * @return {Object} A promise object which is resolved when Contentstack UI returns an acknowledgement of the focused state.
   */
  setFocus() {
    return this._connection.sendToParent('focus');
  }

  /**
   * This function is called when another extension programmatically changes data of this field using field.setData() function, only available for extension field, only support extensions of data type text, number, boolean or date.
   * @param {function} callback The function to be called when an entry is published.
   */
  onChange(callback) {
    const fieldObj = this;
    if (callback && typeof (callback) === 'function') {
      fieldObj._emitter.on('extensionFieldChange', (event) => {
        this._data = event.data;
        this._resolvedData = event.data;
        callback(event.data);
      });
    } else {
      throw Error('Callback must be a function');
    }
  }
}

export default Field;
