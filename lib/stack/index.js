import Asset from './api/asset/index.js';
import ContentType from './api/content-type/index.js';

function onData(data) {
  if (typeof (data.data) === 'string') { return Promise.reject(data.data); }
  return Promise.resolve(data.data);
}

function onError(error) {
  return Promise.reject(error);
}

/**
 * Class representing the current stack in Contentstack UI.
 */

class Stack {
  /**
   * @hideconstructor
   */
  constructor(data, connection) {
    this._connection = connection;
    this._data = data;
    /**
     * @constructor
     * @hideconstructor
     * @version 2.2.0
     * @desc Content type defines the structure or schema of a page or a section of your web or mobile property
     * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#content-types| ContentType}
     * @param {string} uid - Uid of contenttype.
     * @example extension.stack.ContentType('content_type_uid')
     * */
    this.ContentType = ContentType(connection);
    /**
     * @constructor
     * @version 2.2.0
     * @hideconstructor
     * @desc An initializer is responsible for creating an Asset object.
     * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#assets| Asset}
     * @param {string} uid - UID of the asset.
     * @example extension.stack.Asset('asset_uid')
     * */
    this.Asset = Asset(connection);
  }

  /**
   * This method returns the data of the current stack.
   * @return {Object} Returns stack data.
   */

  getData() {
    return this._data;
  }

  /**
   * This API allows you to retrieve data of a content type of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-content-type| Content Type API} requests. This method returns a Promise object.
   * @param {string} uid Uid of the desired content type
   * @param {Object} params Optional parameters for the GET call
   * @return {Object} A promise object which will be resolved with content type details.
   */
  getContentType(uid, params = {}) {
    if (!uid) {
      return Promise.reject(new Error('uid is required'));
    }
    const options = { uid, params, action: 'getContentType' };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows you to retrieve data of a content types of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types| Content Types API} requests. This method returns a Promise object.
   * @param {Object} query Query for the GET call
   * @param {Object} params Optional parameters for the GET call
   * @return {Object} A promise object which will be resolved with details of the content type.
   */
  getContentTypes(query = {}, params = {}) {
    const optionParams = params;
    optionParams.query = query;
    const options = { params: optionParams, action: 'getContentTypes' };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows you to retrieve environment details of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-environment| Environment API} requests. This method returns a Promise object.
   * @param {string} name Name of the desired environment
   * @param {Object} params Optional parameters for the GET call
   * @return {Object} A promise object which will be resolved with environment details.
   */
  getEnvironment(name, params = {}) {
    if (!name) {
      return Promise.reject(new Error('name is required'));
    }
    const options = { name, params, action: 'getEnvironment' };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows you to retrieve details of environments of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-environments| Environments API} requests. This method returns a Promise object.
   * @param {Object} query Query for the GET call
   * @param {Object} params Optional parameters for the GET call
   * @return {Object} A Promise object which will be resolved with details of the environments.
   */
  getEnvironments(query = {}, params = {}) {
    const optionParams = params;
    optionParams.query = query;
    const options = { params: optionParams, action: 'getEnvironments' };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows you to retrive a locale of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-a-language| Language API} requests. Method returns a Promise object.
   * @param {string} code Code of the desired locale
   * @param {Object} params Optional parameters for the GET call
   * @return {Object} A promise object which will be resolved with locale details.
   */
  getLocale(code, params = {}) {
    if (!code) {
      return Promise.reject(new Error('code is required'));
    }
    const options = { code, params, action: 'getLocale' };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows you to retrive the locales of a stack using the {@link https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types| Languages API} requests. Method returns a Promise object.
   * @param {Object} query Query for the GET call
   * @param {Object} params Optional parameters for the GET call
   * @return {Object} A Promise object which will be resolved with details of the locales.
   */
  getLocales(query = {}, params = {}) {
    const optionParams = params;
    optionParams.query = query;
    const options = { params: optionParams, action: 'getLocales' };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }
}

export default Stack;
