import postRobot from "post-robot";
import Field from "./field.js";
import Window from "./window.js";
import Stack from "./stack";
import Entry from "./entry.js";
import EventEmitter from 'wolfy87-eventemitter';

const emitter = new EventEmitter();

/** Class representing a extension from contentstack ui. */

class Extension {

  constructor(initializationData) {
    /**
     * This method gives you the configuration parameters. Check out our [UI eEtension config documentation](https://www.contentstack.com/docs/apis/content-delivery-api/).
     * @type {Object}
     */

    this.config = initializationData.data.config;
    /**
     * This object holds details of the current user. The details include roles assigned to users.
     * @type {Object}
     */
    this.currentUser = initializationData.data.user;
    /**
     * type of extension, 'FIELD' || 'WIDGET'.
     * @type {string}
     */
    this.type = initializationData.data.type || 'FIELD';
    /**
     * This gives you the entry object which allows you to interact with the current entry.
     * @type {Entry}
     */
    this.entry = new Entry(initializationData, postRobot, emitter);
    if (this.type === 'FIELD') {
      initializationData.data.self = true
      /**
       * Gives you the extension field object which allows you to interact with the field.
       * @type {Field}
       */
      this.field = new Field(initializationData, postRobot, emitter);
    }

    /**
     * The window object provides users with methods that allow them to adjust the size of the iframe that contains the extension.
     * @type {Window}
     */
    this.window = new Window(postRobot);

    /**
     * This method returns stack object which allows users to interact with the stack.
     * @type {Stack}
     */
    this.stack = new Stack(initializationData.data.stack, postRobot);

    postRobot.on('extensionEvent', function (event) {
      if(event.data.name === 'entrySave'){
        emitter.emitEvent('entrySave', [{data:event.data.data}]);
        emitter.emitEvent('updateFields', [{data:event.data.data}]);
      }
    });
  }

  static initialize() {
    return postRobot.sendToParent('init', {})
  }

  setReady() {
    return postRobot.sendToParent('ready')
  }
  
}


export default Extension;