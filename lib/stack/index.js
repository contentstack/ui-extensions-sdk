import * as Utils from "./utils.js";
import Entry from './entry.js';
import Assets from './assets.js';
import Query from './query.js';

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
   * @description Set "ContentType" from the Stack from where you want to retrive the entries.
   * @param {String} [content_type_uid] - uid of the existing contenttype
   * @returns {Stack}
   */
  ContentType(uid) {
    if (uid && typeof uid === 'string') {
      this.content_type_uid = uid;
      this.type = "contentType";
    }
    return this;
  }
  /**
   * @description Set the Entry Uid which you want to retrive from the Contenttype specified.
   * @param {String} uid - entry_uid
   * @example ContentType('blog').Entry('blt1234567890abcef')
   * @returns {Object}
   */
  Entry(uid) {
    let entry = new Entry(this._connection);
    if (uid && typeof uid === "string") {
      entry.entry_uid = uid;
    }
    return Utils.merge(entry, this);
  }

  /**
   * @description Set the Asset Uid which you want to retrive the Asset.
   * @param {String} uid - asset_uid
   * @example stack.Assets('blt1234567890abcef').fetch()
   * @returns {Object}
   */
  Assets(uid) {
    this.type = 'asset';
    if (uid && typeof uid === "string") {
        let asset = new Assets();
        asset.asset_uid = uid;
        return Utils.merge(asset, this);
    }
    return this;
  }

  /**
   * @description Query instance to provide support for all search queries.
   * @example ContentType('blog').Query()
   * @returns {Object}
   */
  Query() {
    let query = new Query(this._connection);
    return Utils.merge(query, this);
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
   * This API allows users to interact with an environment of a stack using the Environment Content Delivery API requests. Method returns a Promise object.
   * @param {string} name Name of the desired environment
   * @param {Object} params optional params for the get call
   * @return {Object} A Promise object which will resolve with environment details.
   */
  getEnvironment(name, params) {
    if (!name) {
      return Promise.reject('name is required');
    }
    params = params || {};
    let options = { name, params, action: "getEnvironment" };
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
    if (!code) {
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

function onData(data) {
  if (typeof (data.data) === "string")
    return Promise.reject(data.data)
  return Promise.resolve(data.data)
}

function onError(error) {
  return Promise.reject(error)
}

export default Stack;