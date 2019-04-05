import Base from '../base.js';
import { getReferences, language, environment } from '../../utils.js';

let connection = {};

/**
 * @summary Creates an instance of `Asset`.
 * @description An initializer is responsible for creating an Asset object.
 * @param {String} uid - uid of the asset
 * @example
 * let Asset = extension.stack.Asset('bltsomething123');
 * @returns {Asset}
 * @ignore
 */
function onData(data) {
  if (typeof (data.data) === 'string') { return Promise.reject(data.data); }
  return Promise.resolve(data.data);
}

function onError(error) {
  return Promise.reject(error);
}

class Asset extends Base {
  constructor(uid) {
    super(uid);
    this.getReferences = getReferences;
    this.environment = environment;
    return this;
  }

  /**
   * @function
   * @name Stack#Asset.Query
   * @description This static method instantiates the query module for assets. To see the list of methods that can be used for querying assets, refer the {@link Query} module.
   * @example
   * let assetQuery = extension.stack.Asset.Query();
   * assetQuery.where("title": "main.js").limit(10).skip(10).find().then(...).catch(...);
   * @return {Query}
   */


  static Query() {
    const entryQuery = super.Query();
    Object.assign(entryQuery, {
      language, environment
    });
    return entryQuery;
  }

  static module(plural = false) {
    return plural ? 'Assets' : 'Asset';
  }

  static get connection() {
    return connection;
  }

  /**
   * @function
   * @name Stack#Asset.getRteAssets
   * @description This static method retrieves comprehensive information on all assets uploaded through the Rich Text Editor field.
   * @return {external:Promise}
   */

  static getRteAssets() {
    return this.connection.sendToParent('stackQuery', { action: 'getRteAssets' }).then(onData).catch(onError);
  }

  /**
   * @function
   * @name Stack#Asset.getAssetsOfSpecificTypes
   * @description This static method retrieves assets that are either image or video files, based on the request query.
   * @param  {String} assetType Type of asset to be received for e.g., ‘image/png’
   * @return {external:Promise}
   */
  static getAssetsOfSpecificTypes(assetType) {
    if (!assetType || typeof assetType !== 'string') {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    return this.connection.sendToParent('stackQuery', { action: 'getAssetsOfSpecificTypes', asset_type: assetType }).then(onData).catch(onError);
  }


  /**
   * @name Stack#Asset#only
   * @function
   * @description This method is used to show the selected fields of the assets in the result set.
   * @param {String} [key=BASE] - Single field of an asset
   * @param {Array} values - Array of fields to be shown in the result set
   * @example
   * <caption> Only with the field UID </caption>
   * extension.stack.Asset('bltsomething123').only('title').fetch();
   * @example
   * <caption> Only with the field UID </caption>
   * extension.stack.Asset('bltsomething123').only('BASE','title').fetch();
   * @example
   * <caption> Only with the field UIDs(array) </caption>
   * extension.stack.Asset('bltsomething123').only(['title','description']).fetch();
   * @returns {Stack#Asset}
   */

  /**
   * @name Stack#Asset#except
   * @function
   * @description This method is used to hide the selected fields of the assets in result set.
   * @param {String} [key=BASE] - Single field of an asset
   * @param {Array} values - Array of fields to be hidden in the result set
   * @example
   * <caption> .Except with the field UID </caption>
   * extension.stack.Asset('bltsomething123').except('title').fetch();
   * @example
   * <caption> .Except with the field UID </caption>
   * extension.stack.Asset('bltsomething123').except('BASE','title').fetch();
   * @example
   * <caption> .Except with the field UIDs(array) </caption>
   * extension.stack.Asset('bltsomething123').except(['title','description']).fetch();
   * @returns {Stack#Asset}
   */

  /**
   * @function
   * @name Stack#Asset#environment
   * @description This method is used to set the environment name of which you want to retrieve the data.
   * @param {String} environment_uid - UID/Name of environment
   * @example extension.stack.Asset('bltsomething123').environment('development').fetch()
   * @returns {Stack#Asset}
   */


  /**
   This method includes a query parameter in your query.
   @name Stack#Asset#addParam
   @function
   @example extension.stack.Asset('uid').addParam('key', 'value').fetch().then().catch();
   @param {string} key - Key of the parammeter
   @param {string} value - Value of the parammeter
   @return {Stack#Asset}
  */

  /**
   This method includes a query parameter in your query.
   @name Stack#Asset#addQuery
   @function
   @example extension.stack.Asset('uid').addQuery('key', 'value').fetch().then().catch();
   @param {string} key - Key of the parammeter
   @param {string} value - Value of the parammeter
   @return {Stack#Asset}
  */


  /**
   This method will fetch the details of the entries and the assets in which the specified asset is referenced.
   @see {@link
   https://www.contentstack.com/docs/apis/content-management-api/#get-all-references-of-asset|
   Asset References}
   @name Stack#Asset#getReferences
   @function
   @example extension.stack.Asset('uid').getReferences().then().catch();
   @return {external:Promise}
  */

  /**
   This method deletes an existing asset.
   @see {@link
   https://www.contentstack.com/docs/apis/content-management-api/#delete-an-asset|
   Delete Asset}
   @name Stack#Asset#delete
   @function
   @example extension.stack.Asset('uid').delete().then().catch();
   @return {external:Promise}
   */


  /**
   * @name Stack#Asset#publish
   * @function
   * @description This method allows you to publish the asset either immediately or schedule the publish for a later date/time.
   * @param {object} payload - Payload for the request.
   * @example extension.stack.Asset('bltsomething123')
   .publish(
     {
        "asset": {
          "locales": [
            "en-us"
          ],
          "environments": [
            "development"
          ]
        },
        "version": 1,
        "scheduled_at": "2019-02-08T18:30:00.000Z"
      });
     * @return {external:Promise}
     */
  publish(payload) {
    if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    return this.fetch('publishAsset', payload);
  }

  /**
   * @function
   * @name Stack#Asset#unpublish
   * @description This method will instantly unpublish the asset, and also give you the provision to automatically unpublish the asset at a later date/time.
   * @param {object} payload - Payload for the request.
   * @example extension.stack.Asset('bltsomething123')
    .unpublish({
    "asset": {
      "locales": [
        "en-us"
      ],
      "environments": [
        "development"
      ]
    },
    "version": 1,
    "scheduled_at": "2019-02-08T18:30:00.000Z"
  });
   * @return {external:Promise}
   */
  unpublish(payload) {
    if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    return this.fetch('unpublishAsset', payload);
  }
}

export default (uiConnection) => {
  connection = uiConnection;
  return new Proxy(Asset, {
    apply(Target, thisArg, argumentsList) {
      return new Target(...argumentsList);
    }
  });
};
