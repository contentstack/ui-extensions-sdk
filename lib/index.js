import Extension from './extension.js';
import postRobot from 'post-robot';
const version = '2.1.0';

postRobot.CONFIG.LOG_LEVEL = 'error';

/** Class to initialize the plugin on Contentstack UI. */
/**
   * @hideconstructor
   */

class ContentstackUIExtension {
  /**
    * You need to first include Contentstack UI Extensions SDK and
    * Contentstack UI Stylesheet in you HTML file and then call
    * ContentstackUIExtension.init in the script tag.
    * @example
    * HTML
    * <script src="https://www.contentstack.com/sdks/contentstack-ui-extensions/2.0.0/ui-extension-sdk.js"></script>
    * <link href="https://www.contentstack.com/sdks/contentstack-ui-extensions/2.0.0/ui-extension-sdk.css" rel="stylesheet" >
    * @example <caption>Custom Filed</caption>
    * // javascript
    * ContentstackUIExtension.init().then(function (extension) {
    *     var value = extension.field.getData()
    *     extension.field.setData("New Field Data")
    * })
    * @example <caption>Custom Widget</caption>
    * // javascript
    * ContentstackUIExtension.init().then(function (extension) {
    *     var entry = extension.entry.getData()
    * })
    * @example <caption>Dashboard Widget</caption>
    * // javascript
    * ContentstackUIExtension.init().then(function (extension) {
    *     var stack = extension.stack;
    *     var stackData = stack.getData();
    * })
    * @return {external:Promise}  A promise object which will be resolved with an instance of the {@link Extension} class which is instantiated using the data received from the Contentstack UI.
    */
  static init() {
    if (this._extension) { return Promise.resolve(this._extension); }
    return Extension.initialize(version).then((initializationData) => {
      this._extension = new Extension(initializationData);
      return Promise.resolve(this._extension);
    }).catch((e) => Promise.reject(e));
  }


  /**
    * Version of Contentstack UI extension.
    * @type {string}
    */
  static get SDK_VERSION() {
    return version;
  }
}

export default ContentstackUIExtension;
