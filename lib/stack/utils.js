export function transform(type) {
  return function () {
    switch (arguments.length) {
      case 1:
        if (Array.isArray(arguments[0]) || typeof arguments[0] === 'string') {
          let query = this._query[`${type}[BASE]`] || [];
          query = query.concat(arguments[0]);
          this._query[`${type}[BASE]`] = query;
          return this;
        }
        throw Error('Kindly provide valid parameters');

      case 2:
        if (typeof arguments[0] === 'string' && (Array.isArray(arguments[1]) || typeof arguments[1] === 'string')) {
          let query = this._query[`${type}[${arguments[0]}]`] || [];
          query = query.concat(arguments[1]);
          this._query[`${type}[${arguments[0]}]`] = query;
          return this;
        }
        throw Error('Kindly provide valid parameters');

      default:
        throw Error('Kindly provide valid parameters');
    }
  };
}


// merge two objects
export function merge(target, source) {
  const newTraget = target;
  if (target && source) {
    Object.keys(source).forEach((key) => {
      newTraget[key] = source[key];
    });
  }
  return newTraget;
}

// merge two objects
export function mergeDeep(oldTarget, oldSource) {
  const newTarget = oldTarget;
  const self = this;
  const _mergeRecursive = (anotherTarget, source) => {
    const target = anotherTarget;
    Object.keys(source).forEach((key) => {
      if (self._type(source[key]) === 'object' && self._type(target[key]) === self._type(source[key])) {
        _mergeRecursive(target[key], source[key]);
      } else if (self._type(source[key]) === 'array' && self._type(target[key]) === self._type(source[key])) {
        target[key] = target[key].concat(source[key]);
      } else {
        target[key] = source[key];
      }
    });
  };
  _mergeRecursive(newTarget, oldSource);
  return newTarget;
}


export function _type(val) {
  let __typeof = typeof val;
  if (__typeof === 'object' && Array.isArray(val)) {
    __typeof = 'array';
  }
  return __typeof;
}

export function addParam(key, value) {
  if (key && typeof key === 'string' && value && typeof value === 'string') {
    this._query[key] = value;
    return this;
  }
  throw Error('Kindly provide valid parameters.');
}

export function addQuery(key, value) {
  if (key && value && typeof key === 'string') {
    this._query[key] = value;
    return this;
  }
  throw Error('First argument should be a String.');
}

export function language(languageCode) {
  if (languageCode && typeof languageCode === 'string') {
    this._query.locale = languageCode;
    return this;
  }
  throw Error('Argument should be a String.');
}

export function environment(environmentCode) {
  if (environmentCode && typeof environmentCode === 'string') {
    this._query.environment = environmentCode;
    return this;
  }
  throw Error('Argument should be a String.');
}

export function includeOwner() {
  this._query.include_owner = true;
  return this;
}

export function includeContentType() {
  this._query.include_content_type = true;
  return this;
}

export function includeSchema() {
  this._query.include_schema = true;
  return this;
}

export function includeReference(val) {
  if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i += 1) {
      this._query['include[]'] = this._query['include[]'] || [];
      this._query['include[]'] = this._query['include[]'].concat(val[i]);
    }
  } else if (typeof val === 'string') {
    for (let i = 0; i < arguments.length; i += 1) {
      this._query['include[]'] = this._query['include[]'] || [];
      this._query['include[]'] = this._query['include[]'].concat(arguments[i]);
    }
  } else {
    throw Error('Argument should be a String or an Array.');
  }
  return this;
}

export function getReferences() {
  return this.fetch(`get${this.constructor.module()}References`);
}
