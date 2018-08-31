import * as Utils from "./utils.js";
/**
 * @summary Creates an instance of `Entry`.
 * @description An initializer is responsible for creating Entry object.
 * @param {String} uid - uid of the entry
 * @example
 * let Entry = stack.ContentType('example).Entry();
 * @returns {Entry}
 * @ignore
 */
export default class Entry {
    constructor(connection) {
        this._connection = connection;
        this._query = {};
        /**
         * @method only
         * @description This method is use to show the selected fields of the entries in resultset.
         * @param {String} [key=BASE] - reference field in the entry/single field in entry
         * @param {Array} values - array of fields to be show in resultset
         * @example
         * <caption> .only with field uid </caption>
         * blogEntry.only('title')
         * @example
         * <caption> .only with field uid </caption>
         * blogEntry.only('BASE','title')
         * @example
         * <caption> .only with field uids(array) </caption>
         * blogEntry.only(['title','description'])
         * @example
         * <caption> .only with reference_field_uid and field uid </caption>
         * blogEntry.includeReference('category').only('category','title')
         * @example
         * <caption> .only with reference_field_uid and field uids(array) </caption>
         * blogEntry.includeReference('category').only('category', ['title', 'description'])
         * @returns {Entry}
         */
        this.only = Utils.transform('only');
        /**
         * @method except
         * @description This method is use to hide the selected fields of the entries in resultset.
         * @param {String} [key=BASE] - reference field in the entry/single field in entry
         * @param {Array} values - array of fields to be show in resultset
         * @example
         * <caption> .except with field uid </caption>
         * blogEntry.except('title')
         * @example
         * <caption> .except with field uid </caption>
         * blogEntry.except('BASE','title')
         * @example
         * <caption> .except with field uids(array) </caption>
         * blogEntry.except(['title','description'])
         * @example
         * <caption> .except with reference_field_uid and field uid </caption>
         * blogEntry.includeReference('category').except('category','title')
         * @example
         * <caption> .except with reference_field_uid and field uids(array) </caption>
         * blogEntry.includeReference('category').except('category', ['title', 'description'])
         * @returns {Entry} */
        this.except = Utils.transform('except');
        return this;
    }

    /**
     * @method includeReference
     * @description This method is use to include referenced entries from the other Contenttype.
     * @example
     * <caption> .includeReference with reference_field_uids as array </caption>
     * blogEntry.includeReference(['category', 'author'])
     * @example
     * <caption> .includeReference with reference_field_uids </caption>
     * blogEntry.includeReference('category', 'author')
     * @returns {Entry}
     */
    includeReference(val) {
        if (Array.isArray(val)) {
            for (let i = 0; i < val.length; i++) {
                this._query['include'] = this._query['include'] || [];
                this._query['include'] = this._query['include'].concat(val[i]);
            }
        }else if (typeof val === "string") {
                for (let i = 0; i < arguments.length; i++) {
                    this._query['include'] = this._query['include'] || [];
                    this._query['include'] = this._query['include'].concat(arguments[i]);
                }
            
        } else {
            throw Error("Argument should be a String or an Array.");
        }
        return this;
    }

    /**
     * @method language
     * @description This method is used set language code, which language's data to be retrieve.
     * @param {String} language_code - language code. e.g. 'en-us', 'ja-jp', etc.
     * @example blogEntry.language('en-us')
     * @returns {Entry}
     */
    language(language_code) {
        if (language_code && typeof language_code === 'string') {
            this._query['locale'] = language_code;
            return this;
        } else {
            throw Error("Argument should be a String.");
        }
    }

    /**
     * @method addQuery
     * @description This method is used to add query to Entry object.
     * @param {String} key - key of the query
     * @param {String} value - value of the query
     * @example blogEntry.addQuery('include_schema',true)
     * @returns {Entry}
     */
    addQuery(key, value) {
        if (key && value && typeof key === 'string') {
            this._query[key] = value;
            return this;
        } else {
            throw Error("First argument should be a String.");
        }
    }

    /**
     * @method includeSchema
     * @description This method is used to include the schema of the current contenttype in result set along with the entry/entries.
     * @example blogEntry.includeSchema()
     * @returns {Entry}
     */
    includeSchema() {
        this._query['include_schema'] = true;
        return this;
    }

    /**
     * @method includeContentType
     * @description This method is used to include the current contenttype in result set along with the entry/entries.
     * @example blogEntry.includeContentType()
     * @returns {Entry}
     */
    includeContentType() {
        this._query['include_content_type'] = true;
        return this;
    }

    /**
     * @method includeOwner
     * @description This method is used to include the owner of the entry/entries in resultset.
     * @example blogEntry.includeOwner()
     * @returns {Entry}
     */
    includeOwner() {
        this._query['include_owner'] = true;
        return this;
    }

    /**
     * @method toJSON
     * @description This method is used to convert the result in to plain javascript object.
     * @example
     * blogEntry
     *      .toJSON()
     *      .then(function (result) {
     *          let value = result.get(field_uid)
     *       },function (error) {
     *          // error function
     *      })
     * @returns {Object}
     */
    // toJSON() {
    //     this.tojson = true;
    //     return this;
    // }

    /**
     * @method AddParam
     * @description This method includes query parameter in query.
     * @example blogQuery.addParam('include_count', 'true').fetch()
     */
    addParam(key, value) {
        if (key && value && typeof key === 'string' && typeof value === 'string') { 
                this._query[key] = value;
                return this;
        } else {
            throw Error("Kindly provide valid parameters.");
        }
    }


    /**
     * @method fetch
     * @description fetch entry of requested content_type of defined query if present.
     * @example
     * blogEntry.fetch()
     */
    fetch() {
        if (this.entry_uid) {
            let options = { uid : this.entry_uid , content_type_uid :this.content_type_uid , params:this._query, action: "getEntry" };
            return this._connection.sendToParent('stackQuery', options).then(onData).catch(onError);
        } else {
            return Promise.reject("Kindly provide an entry uid. e.g. .Entry('bltsomething123')");
        }
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