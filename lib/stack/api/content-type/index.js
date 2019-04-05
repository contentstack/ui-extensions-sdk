import Entry from './entry.js';
import Base from '../base.js';

let connection = {};


class ContentType extends Base {
  constructor(uid) {
    super(uid);
    /**
     * @constructor
     * @hideconstructor
     * @name Stack#ContentType#Entry
     * @version 2.0.0
     * @desc An entry is the actual piece of content created using one of the defined content types
     * @see {@link https://www.contentstack.com/docs/apis/content-management-api/#entries| Entries}
     */


    this.Entry = Entry(this.constructor.connection, this.uid);
    return this;
  }

  // static module(plural = false) {
  //   return plural ? 'ContentTypes' : 'ContentType';
  // }
  static get connection() {
    return connection;
  }
}
export default (uiConnection) => {
  connection = uiConnection;
  return new Proxy(ContentType, {
    // target = Foo
    apply(Target, thisArg, argumentsList) {
      return new Target(...argumentsList);
    }
  });
};
