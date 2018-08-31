 import Extension from "./extension.js";
 import postRobot from "post-robot";
 const version = "1.1.0"

 postRobot.CONFIG.LOG_LEVEL = 'error';

 /**Class to intialize the plugin on Contentstack ui. */

 class ContentstackUIExtension {

   /**
    * You need to first include Contentstack UI Extensions SDK and Contentstack UI Stylesheet in you HTML file and then call ContentstackUIExtension.init in the script tag.
    * @example
    * HTML
    * <script src="https://sdklink"></script>
    * <link href="https://style sheet link" rel="stylesheet" >
    * @example
    * // javascript 
    * ContentstackUIExtension.init().then(function (extension) {
    *     var value = extension.field.getData()
    *     extension.field.setData("New Field Data")
    * })
    * @return {Extension} An Extension object, will contain all the data recived from the Contentstack UI.
    */
   static init() {
     if (this._extension)
       return Promise.resolve(this._extension)
     return Extension.initialize().then((initializationData) => {
       this._extension = new Extension(initializationData)
       return Promise.resolve(this._extension)
     }).catch((e) => Promise.reject(e))
   }


   /**
    * Version of Contentstack ui extension.
    * @type {string}
    */
   static get SDK_VERSION() {
     return version;
   }
 }

 export default ContentstackUIExtension;