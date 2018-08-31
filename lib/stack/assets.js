import * as Utils from "./utils.js";
/**
 * @summary Creates an instance of `Assets`.
 * @description An initializer is responsible for creating Asset object.
 * @param {String} uid - uid of the asset
 * @example
 * let Assets = stack.Assets('bltsomething123');
 * @returns {Assets}
 * @ignore
 */
export default class Assets {
    constructor(connection) {
        this._connection = connection;
        this._query = {};
        /**
         * @method only
         * @description This method is use to show the selected fields of the assets in resultset.
         * @param {String} [key=BASE] - single field in asset
         * @param {Array} values - array of fields to be show in resultset
         * @example
         * <caption> .only with field uid </caption>
         * Assets().only('title')
         * @example
         * <caption> .only with field uid </caption>
         * Assets().only('BASE','title')
         * @example
         * <caption> .only with field uids(array) </caption>
         * Assets().only(['title','description'])
         * @returns {Asset}
         */
        this.only = Utils.transform('only');
        return this;
    }

     /**
     * @method AddParam
     * @description This method includes query parameter in query.
     * @example stack.Assets('bltsomething123').addParam('include_dimension', 'true').fetch()
     */
    addParam(key, value) {
        if (key && typeof key === 'string' && value && typeof value === 'string') {        
            this._query[key] = value;
            return this;
        } else {
            throw Error("Kindly provide valid parameters.");
        }
    }

    /**
     * @method fetch
     * @description fetch asset obhect of requested Asset uid of defined query if present.
     * @example
     * stack.Assets('bltsomething123').fetch()
     */
    fetch() {
        let options = { uid : this.asset_uid, params:this._query, action: "getAsset" };
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