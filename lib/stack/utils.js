export function transform(type) {
    return function() {
        this._query[type] = this._query[type] || {};
        switch (arguments.length) {
            case 1:
                if (Array.isArray(arguments[0]) || typeof arguments[0] === "string") {
                    let query = this._query[type]['BASE'] || [];
                    query = query.concat(arguments[0]);
                    this._query[type]['BASE'] = query;
                    return this;
                } else {
                    throw Error("Kindly provide valid parameters");
                }
            case 2:
                if (typeof arguments[0] === "string" && (Array.isArray(arguments[1]) || typeof arguments[1] === "string")) {
                    let query = this._query[type][arguments[0]] || [];
                    query = query.concat(arguments[1]);
                    this._query[type][arguments[0]] = query;
                    return this;
                } else {
                    throw Error("Kindly provide valid parameters");
                }
            default:
                throw Error("Kindly provide valid parameters");
        }
    };
}


// merge two objects
export function merge(target, source) {
    if (target && source) {
        for (let key in source) {
            target[key] = source[key];
        }
    }
    return target;
};

// merge two objects
export function mergeDeep(target, source) {
    let self = this;
    let _merge_recursive = function(target, source) {
        for (let key in source) {
            if (self._type(source[key]) == 'object' && self._type(target[key]) == self._type(source[key])) {
                _merge_recursive(target[key], source[key])
            } else if (self._type(source[key]) == 'array' && self._type(target[key]) == self._type(source[key])) {
                target[key] = target[key].concat(source[key]);
            } else {
                target[key] = source[key];
            }
        }
    };
    _merge_recursive(target, source);
    return target;
};


export function _type(val) {
    let _typeof,
        __typeof = typeof val;
    switch (__typeof) {
        case 'object':
            _typeof = __typeof;
            if (Array.isArray(val)) {
                __typeof = 'array';
            }
            break;
        default:
            _typeof = __typeof;
    }
    return __typeof;
};

