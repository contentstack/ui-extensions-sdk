import postRobot from 'post-robot';
import Field from './field.js';
import Window from './window.js';
import Stack from './stack';
import Entry from './entry.js';
import Store from './store.js';
import EventEmitter from 'wolfy87-eventemitter';

const emitter = new EventEmitter();

/** Class representing an extension from Contentstack UI. */

class Extension {
  /**
   * @hideconstructor
   */
  constructor(initData) {
    const initializationData = initData;

    this.postRobot = postRobot;
    /**
     * This method gives you the configuration parameters. Check out our {@link https://www.contentstack.com/docs/guide/extensions|UI Extension documentation} .
     * @type {Object}
     */

    this.config = initializationData.data.config;
    /**
     * This object holds details of the current user.
     * @type {Object}
     */
    this.currentUser = initializationData.data.user;
    /**
     * type of extension, 'FIELD' || 'WIDGET' || 'DASHBOARD'.
     * @type {string}
     */
    this.type = initializationData.data.type || 'FIELD';

    if (this.type === 'FIELD') {
      /**
     * This method gives you the instance configuration parameters set from the content type builder page in the field settings. This is only available for the Custom Field extension.
     * @type {Object}
     */
      this.fieldConfig = initializationData.data.field_config;

      initializationData.data.self = true;
      /**
       * Gives you the extension field object which allows you to interact with the field. Only available for the Custom Field extension.
       * @type {Field}
       */
      this.field = new Field(initializationData, postRobot, emitter);
    }

    /**
     * Store to persist data for extension.
     * Note: Data is stored in the browser {@link external:localStorage} and will be lost if the {@link external:localStorage} is cleared in the browser.
     * @type {Store}
     */
    this.store = new Store(postRobot);

    if (this.type !== 'DASHBOARD') {
      /**
     * This gives you the entry object which allows you to interact with the current entry. Not available in case of the Dashboard Widget extension.
     * @type {Entry}
     */
      this.entry = new Entry(initializationData, postRobot, emitter);
    }

    if (this.type === 'FIELD' || this.type === 'DASHBOARD') {
      /**
     * The window object provides users with methods that allow them to adjust the size of the iframe that contains the extension. Not available in case of custom widgets.
     * @type {Window}
     */
      this.window = new Window(postRobot, this.type, emitter, initializationData.data.dashboard_width);
    }

    /**
     * This method returns stack object which allows users to read and manipulate a range of objects in a stack.
     * @type {Stack}
     */
    this.stack = new Stack(initializationData.data.stack, postRobot);

    postRobot.on('extensionEvent', (event) => {
      if (event.data.name === 'entrySave') {
        emitter.emitEvent('entrySave', [{ data: event.data.data }]);
        emitter.emitEvent('updateFields', [{ data: event.data.data }]);
      }

      if (event.data.name === 'entryChange') {
        emitter.emitEvent('entryChange', [{ data: event.data.data }]);
      }

      if (event.data.name === 'entryPublish') {
        emitter.emitEvent('entryPublish', [{ data: event.data.data }]);
      }

      if (event.data.name === 'entryUnPublish') {
        emitter.emitEvent('entryUnPublish', [{ data: event.data.data }]);
      }

      if (event.data.name === 'dashboardResize') {
        emitter.emitEvent('dashboardResize', [{ state: event.data.state }]);
      }

      if (event.data.name === 'extensionFieldChange') {
        emitter.emitEvent('extensionFieldChange', [{ data: event.data.data }]);
      }
    });
  }

  static initialize(version) {
    return postRobot.sendToParent('init', { version });
  }

  setReady() {
    return this.postRobot.sendToParent('ready');
  }
}

export default Extension;
