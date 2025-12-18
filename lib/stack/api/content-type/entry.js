import Base from '../base.js';
import {
  getReferences, addQuery, language, environment, includeOwner, includeContentType, includeSchema, includeReference
} from '../../utils.js';

let connection = {};
let contentTypeUid = '';

class Entry extends Base {
  constructor(uid) {
    super(uid);
    this._query = {};
  }

  /**
   * @function
   * @name Stack#ContentType#Entry.Query
   * @description This static method instantiates the query module for entries. To see the list of methods that can be used for querying entries, refer the {@link Query} module.
   * @example
   * let entryQuery = extension.stack.ContentType('content_type_uid').Entry.Query();
   * entryQuery.where("field_uid": "10").limit(10).skip(10).find().then(...).catch(...);
   * @return {Query}
   */

  static Query() {
    const entryQuery = super.Query();
    Object.assign(entryQuery, {
      language, environment, includeOwner, includeContentType, includeSchema, includeReference
    });
    return entryQuery;
  }

  static get connection() {
    return connection;
  }

  static get contentTypeUid() {
    return contentTypeUid;
  }

  static module(plural = false) {
    return plural ? 'Entries' : 'Entry';
  }
  /**
  This method creates a new entry.
  @see {@link
  https://www.contentstack.com/docs/apis/content-management-api/#create-a-an-entry|
  Create Entry}
  @name Stack#ContentType#Entry.create
  @function
  @example extension.stack.ContentType('content_type_uid').Entry.create({
    "entry": {
      "title": "example",
      "url": "/example"
    }
  }).then(...).catch(...);
  @param {Object} payload Data to create an entry
  @return {external:Promise}
  Required data if resolved successfully
  */

  /**
  * @name Stack#ContentType#Entry#only
  * @function
  * @description This method is used to show the selected fields of an entry in the result set.
  * @param {String} [key=BASE] - Single field of an entry
  * @param {Array} values - Array of fields to be shown in the result set
  * @example
  * <caption> Only with field UID </caption>
  * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only('title').fetch();
  * @example
  * <caption> Only with field UID </caption>
  * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only('BASE','title').fetch();
  * @example
  * <caption> Only with field UIDs(array) </caption>
  * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only(['title','description']).fetch();
  * @returns {Stack#ContentType#Entry}
  */

  /**
  * @name Stack#ContentType#Entry#except
  * @function
  * @description This method is used to hide the selected fields of an entry in the result set.
  * @param {String} [key=BASE] - Single field of an entry
  * @param {Array} values - Array of fields to be hidden in the result set
  * @example
  * <caption> Except with field uid </caption>
  * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except('title').fetch();
  * @example
  * <caption> Except with field uid </caption>
  * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except('BASE','title').fetch();
  * @example
  * <caption> Except with field uids(array) </caption>
  * extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except(['title','description']).fetch();
  * @returns {Stack#ContentType#Entry}
  */

  /**
  * This method includes a query parameter in your query.
  * @name Stack#ContentType#Entry#addParam
  * @function
  * @example extension.stack.ContentType('content_type_uid').Entry('uid').addParam('include_count', 'true').fetch().then().catch();
  * @param {string} key - Key of the parameter
  * @param {string} value - Value of the parameter
  * @return {Stack#ContentType#Entry} Returns
  */

  /**
  This method will fetch all the entries in which the current entry is referenced.
  @see {@link
  https://www.contentstack.com/docs/apis/content-management-api/#get-all-references-of-an-entry|
  Entry References}
  @name Stack#ContentType#Entry#getReferences
  @function
  @example extension.stack.ContentType('content_type_uid').Entry('uid').getReferences().then().catch();
  @return {external:Promise}
  Required data if resolved successfully
  */

  /**
  @example extension.stack.ContentType('content_type_uid').Entry('uid').update({"entry" : {...}}).then().catch();
  @param {Object} payload Data to be update exsisting entry
  @return {external:Promise}
  Required data if resolved successfully
  */

  /**
  This method deletes an existing entry.
  @see {@link
  https://www.contentstack.com/docs/apis/content-management-api/#delete-an-entry|
  Delete Entry}
  @name Stack#ContentType#Entry#delete
  @function
  @example extension.stack.ContentType('content_type_uid').Entry('uid').delete().then().catch();
  @return {external:Promise}
  Required data if resolved successfully
  */

  /**
  This method fetches information of a specific entry.
  @see {@link
  https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-an-entry|
  Get A Single Entry}
  @name Stack#ContentType#Entry#fetch
  @function
  @example extension.stack.ContentType('content_type_uid').Entry('uid').fetch().then().catch();
  @return {external:Promise}
  Required data if resolved successfully
  */

  /**
   * @function
   * @name Stack#ContentType#Entry#includeReference
   * @description This method is used to include referenced entries from other content types.
   * @example
   * <caption> .includeReference with reference_field_uids as array </caption>
   * stack.ContentType('contenttype_uid').Entry('bltsomething123').includeReference(['category', 'author']).fetch()
   * @example
   * <caption> .includeReference with reference_field_uids </caption>
   * stack.ContentType('contenttype_uid').Entry('bltsomething123').includeReference('category', 'author').fetch()
   * @returns {Stack#ContentType#Entry}
   */

  /**
   * @function
   * @name Stack#ContentType#Entry#language
   * @description This method is used to set the language code of which you want to retrieve the data.
   * @param {String} languageCode - Language code, for e.g. 'en-us', 'ja-jp', and so on
   * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').language('en-us').fetch()
   * @returns {Stack#ContentType#Entry}
   */

  /**
   * @function
   * @name Stack#ContentType#Entry#environment
   * @description This method is used to set the environment name of which you want to retrieve the data.
   * @param {String} environment_uid - UID/Name of environment
   * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').environment('development').fetch()
   * @returns {Stack#ContentType#Entry}
   */

  /**
   * @function
   * @name Stack#ContentType#Entry#addQuery
   * @description This method is used to add a query to an entry object.
   * @param {String} key - Key of the query
   * @param {String} value - Value of the query
   * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').addQuery('include_schema',true).fetch()
   * @returns {Stack#ContentType#Entry}
   */

  /**
   * @function
   * @name Stack#ContentType#Entry#includeSchema
   * @description This method is used to include the schema of the current contenttype in result set along with the entry/entries.
   * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeSchema().fetch()
   * @returns {Stack#ContentType#Entry}
   */

  /**
   * @function
   * @name Stack#ContentType#Entry#includeContentType
   * @description This method is used to include the current content type in the result set along with the entry(ies).
   * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeContentType().fetch()
   * @returns {Stack#ContentType#Entry}
   */

  /**
   * @function
   * @name Stack#ContentType#Entry#includeOwner
   * @description This method is used to include the owner of the entry(ies) in the result set.
   * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeOwner().fetch()
   * @returns {Stack#ContentType#Entry}
   */

  /**
  * @function
  * @name Stack#ContentType#Entry#getLanguages
  * @description This method returns the details of all the languages that an entry is localized in.
  * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').getLanguages()
  * @return {external:Promise}
  */
  getLanguages() {
    return this.fetch('getEntryLanguages');
  }

  /**
  * @function
  * @name Stack#ContentType#Entry#unlocalize
  * @description This method is used to unlocalize an entry
  * @param  {string} locale Locale in which the entry has to be unlocalized
  * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').unlocalize('fr-fr').then(...).catch(...);
  * @return {external:Promise}
  */
  unlocalize(locale) {
    if (!locale || typeof locale !== 'string') {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    this._query.locale = locale;
    return this.fetch('unlocalizeEntry');
  }

  /**
  * @function
  * @name Stack#ContentType#Entry#publish
  * @description This method lets you publish an entry either immediately or schedule it to be published automatically at a later date/time.
  * @param {object} payload - Payload for the request
  * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').publish({
      "entry": {
          "environments": ["development"],
          "locales": ["en-us"]
      },
      "locale": "en-us",
      "version": 1,
      "scheduled_at": "2019-02-14T18:30:00.000Z"
  }).then(...).catch(...);
  * @return {external:Promise}
  */
  publish(payload) {
    if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    this._query = {};
    return this.fetch('publishEntry', payload);
  }

  /**
  * @function
  * @name Stack#ContentType#Entry#unpublish
  * @description This method lets you publish an entry either immediately or schedule it to be published automatically at a later date/time.
  * @param {object} payload - Payload for the request
  * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').unpublish({
      "entry": {
          "environments": ["development"],
          "locales": ["en-us"]
      },
      "locale": "en-us",
      "version": 1,
      "scheduled_at": "2019-02-14T18:30:00.000Z"
  }).then(...).catch(...);
  * @return {external:Promise}
  */
  unpublish(payload) {
    if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    this._query = {};
    return this.fetch('unpublishEntry', payload);
  }

  /**
  * @function
  * @name Stack#ContentType#Entry#setWorkflowStage
  * @description This method allows you to either set a particular workflow stage or update the workflow stage details of an entry.
  * @param {object} payload - Payload for the request
  * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').setWorkflowStage({
     "workflow": {
         "workflow_stage": {
             "comment": "Test Comment",
             "due_date": "Thu Dec 01 2018",
             "notify": false,
             "uid": "blt9f52a2cd5e0014fb",
             "assigned_to": [{
                 "uid": "blt296a22e28cc0c63c",
                 "name": "John Doe",
                 "email": "john.doe@contentstack.com"
             }],
             "assigned_by_roles": [{
                 "uid": "blt5b74c24c7ae25d94",
                 "name": "Content Manager"
             }]
         }
     }
  }).then(...).catch(...);
  * @return {external:Promise}
  */
  setWorkflowStage(payload) {
    if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    return this.fetch('setWorkflowStageEntry', payload);
  }

  /**
  * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#update-an-entry| Update Entry}
  * @name Stack#ContentType#Entry#update
  * @function
  * @description This call allows you to update entry content.
  * @param {object} payload - Payload for the request
  * @param {string} [locale] - Passing the ‘locale’ parameter will localize the entry in the specified locale
  *  to be localized in the specified locale.
  * @example extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').update(
      {
      "entry": {
          "title": "example",
          "url": "/example"
      }
  }).then(...).catch(...);
  * @return {external:Promise}
  */
  update(payload, locale) {
    if (!payload || (typeof payload !== 'object') || (payload instanceof Array)) {
      return Promise.reject(new Error('Kindly provide valid parameters'));
    }
    this._query.locale = locale;
    return this.fetch('updateEntry', payload);
  }
}

export default (uiConnection, contentType) => {
  connection = uiConnection;
  contentTypeUid = contentType;
  return new Proxy(Entry, {
    apply(Target, thisArg, argumentsList) {
      const entryTarget = new Target(...argumentsList);
      Object.assign(entryTarget, {
        getReferences, addQuery, language, environment, includeOwner, includeContentType, includeSchema, includeReference
      });
      return entryTarget;
    }
  });
};
