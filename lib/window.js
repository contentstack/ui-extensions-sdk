let config = { attributes: true, childList: true, subtree: true };
let observer
/** Class representing a iframe window from contentstack ui. */

class Window {
  constructor(connection) {
    this._connection = connection;
    this._height;
    this._autoResizingEnabled = false;
  }

  /**
   * This method updates the extension height on Contentstack UI. If argument height is not passed then it will calculate the scroll height and set the height of extension window accordingly.
   * @param {string|number} height Desired height of the window iframe window
   * @return {Object} A Promise object which will resolve on acknowledgement for height update.
   */
  updateHeight(height) {
    if (!height || isNaN(height)) {
      height = Math.ceil(document.documentElement.getBoundingClientRect().height);
    }

    if (this._height === height) {
      return Promise.resolve();
    }
    this._height = height;
    return this._connection.sendToParent('resize', height);
  }

  /**
   * This method enables auto resizing of the extension height.
   * @return {Object} Field object.
   */
  enableAutoResizing() {
    if (this._autoResizingEnabled) {
      return this;
    }
    this._autoResizingEnabled = true;
    observer = new MutationObserver(this.updateHeight.bind(this));
    observer.observe(window.document.body, config);
    return this;
  }

  /**
   * This method disables auto resizing of the extension height.
   * @return {Object} Field object.
   */
  disableAutoResizing() {
    if (!this._autoResizingEnabled) {
      return this;
    }
    this._autoResizingEnabled = false;
    observer.disconnect();
    return this;
  }
}

export default Window;