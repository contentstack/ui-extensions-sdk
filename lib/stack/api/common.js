import * as Utils from '../utils.js';

export default class Common {
  constructor() {
    this.only = Utils.transform('only');
    this.except = Utils.transform('except');
    return this;
  }

  language(languageCode) {
    if (languageCode && typeof languageCode === 'string') {
      this._query.locale = languageCode;
      return this;
    }
    throw Error('Argument should be a String.');
  }

  environment(environmentCode) {
    if (environmentCode && typeof environmentCode === 'string') {
      this._query.environment = environmentCode;
      return this;
    }
    throw Error('Argument should be a String.');
  }

  includeOwner() {
    this._query.include_owner = true;
    return this;
  }

  includeContentType() {
    this._query.include_content_type = true;
    return this;
  }

  includeSchema() {
    this._query.include_schema = true;
    return this;
  }

  includeReference(val) {
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i += 1) {
        this._query.include = this._query.include || [];
        this._query.include = this._query.include.concat(val[i]);
      }
    } else if (typeof val === 'string') {
      for (let i = 0; i < arguments.length; i += 1) {
        this._query.include = this._query.include || [];
        this._query.include = this._query.include.concat(arguments[i]);
      }
    } else {
      throw Error('Argument should be a String or an Array.');
    }
    return this;
  }
}
