/** Class representing the current stack from contentstack ui. */

class Stack {

  constructor(data, connection) {
    this._connection = connection;
    this._data = data;
  }


/**
 * This method returns data of the current stack.
 * @return {Object} Returns stack data.
 */

  getData() {
    return this._data;
  }

  /**
   * This API allows users to interact with a content type of a stack using the Content Type Content Delivery API requests. Method returns a Promise object.
   * @param {string} uid Uid of the desired content type
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with content type details.
   */
  getContentType(uid, params) {
    if (!uid){
      return Promise.reject('uid is required');
    }
    params = params || {};
    let options = { uid, params, action: "getContentType" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with the content types of a stack using the Content Type Content Delivery API requests. Method returns a Promise object.
   * @param {Object} query query for the get call
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with details of content type.
   */
  getContentTypes(query, params) {
    query = query || {};
    params = params || {};
    params.query = query;
    let options = { params, action: "getContentTypes" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with an entry of a stack using the Entries Content Delivery API requests. Method returns a Promise object.
   * @param {string} uid Uid of the desired entry
   * @param {string} content_type_uid  Uid of the desired content type
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with entry details.
   */
  getEntry(uid, content_type_uid, params) {
    if (!uid){
      return Promise.reject('uid is required');
    }
    if (!content_type_uid){
      return Promise.reject('content_type_uid is required');
    }
    params = params || {};
    let options = { uid, content_type_uid, params, action: "getEntry" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with the entries of a stack using the Entries Content Delivery API requests. Method returns a Promise object.
   * @param {string} content_type_uid  Uid of the desired content type
   * @param {Object} query query for the get call
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with details of entries.
   */
  getEntries(content_type_uid, query, params) {
    if (!content_type_uid){
      return Promise.reject('content_type_uid is required');
    }
    query = query || {};
    params = params || {};
    params.query = query;
    let options = { content_type_uid, params, action: "getEntries" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with an asset of a stack using the Assets Content Delivery API requests. Method returns a Promise object.
   * @param {string} uid Uid of the desired asset
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with asset details.
   */
  getAsset(uid, params) {
    if (!uid){
      return Promise.reject('uid is required');
    }
    params = params || {};
    let options = { uid, params, action: "getAsset" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with the assets of a stack using the Assets Content Delivery API requests. Method returns a Promise object.
   * @param {Object} query query for the get call
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with details of assets.
   */
  getAssets(query, params) {
    query = query || {};
    params = params || {};
    params.query = query;
    let options = { params, action: "getAssets" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with an environment of a stack using the Environment Content Delivery API requests. Method returns a Promise object.
   * @param {string} name Name of the desired environment
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with environment details.
   */
  getEnvironment(name, params) {
    if (!name){
      return Promise.reject('name is required');
    }
    params = params || {};
    let options = {name, params, action: "getEnvironment" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with the environments of a stack using the Environment Content Delivery API requests. Method returns a Promise object.   
   * @param {Object} query query for the get call
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with details of environments.
   */
  getEnvironments(query, params) {
    query = query || {};
    params = params || {};
    params.query = query;
    let options = { params, action: "getEnvironments" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with a locale of a stack using the Languages Content Delivery API Requests. Method returns a Promise object.
   * @param {string} code Code of the desired locale
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with locale details.
   */
  getLocale(code, params) {
    if (!code){
      return Promise.reject('code is required');
    }
    params = params || {};
    let options = { code, params, action: "getLocale" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }

  /**
   * This API allows users to interact with the locales of a stack using the Languages Content Delivery API Requests. Method returns a Promise object.
   * @param {Object} query query for the get call
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with details of locales.
   */
  getLocales(query, params) {
    query = query || {};
    params = params || {};
    params.query = query;
    let options = { params, action: "getLocales" };
    return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
  }
}

function onData(data){
  if(typeof(data.data) === "string")
    return Promise.reject(data.data)
  return Promise.resolve(data.data)
}

function onError(error){
  return Promise.reject(error)
}

export default Stack;