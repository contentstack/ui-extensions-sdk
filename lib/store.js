function onError(error) {
  return Promise.reject(error);
}
/**
 * Class used by an extension to store your data in {@link external:localStorage}.
 */
class Store {
  /**
   * @hideconstructor
   */
  constructor(connection) {
    this._connection = connection;
  }
  /**
     * Gets the value of key
     * @param  {string} key Key of the stored data
     * @example extension.store.get('key').then((value) => console.log(value)) // will log value for the given key
     * @return {external:Promise}
     */
  get(key) {
    if (!key || typeof key !== 'string') { throw new Error('Kindly provide valid parameters'); }
    return this._connection.sendToParent('store', { action: 'get', key })
      .then(event => Promise.resolve(event.data)).catch(onError);
  }

  /**
     * Gets an object with all the stored key-value pairs.
     * @example extension.store.getAll().then((obj) => obj)
     * @return {external:Promise}
     */
  getAll() {
    return this._connection.sendToParent('store', { action: 'getAll' })
      .then(({ data = {} }) => Promise.resolve(data)).catch(onError);
  }

  /**
     * Sets the value of a key
     * @param  {string} key Key of the stored data.
     * @param {*} value Data to be stored.
     * @example extension.store.set('key', 'value').then((success) => console.log(success)) // will log ‘true’ when value is set
     * @return {external:Promise}
     */

  set(key, value) {
    if (!key || !value || typeof key !== 'string') {
      throw new Error('Kindly provide valid parameters');
    }
    return this._connection.sendToParent('store', { action: 'set', key, value })
      .then(() => Promise.resolve(true)).catch(onError);
  }

  /**
     * Removes the value of a key
     * @param  {string} key  Key of the data to be removed from the store
     * @example extension.store.remove('key').then((success) => console.log(success)) // will log ‘true’ when value is removed
     * @return {external:Promise}
     */

  remove(key) {
    if (!key || typeof key !== 'string') { throw new Error('Kindly provide valid parameters'); }
    return this._connection.sendToParent('store', { action: 'remove', key })
      .then(() => Promise.resolve(true)).catch(onError);
  }

  /**
     * Clears all the stored data of an extension
     * @example extension.store.clear().then((success) => console.log(success)) // will log ‘true’ when values are cleared
     * @return {external:Promise}
     */

  clear() {
    return this._connection.sendToParent('store', { action: 'clear' })
      .then(() => Promise.resolve(true)).catch(onError);
  }
}

export default Store;
