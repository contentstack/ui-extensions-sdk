

# Contentstack Extensions API Reference

This document describes the API requests that a custom extension can use to communicate with Contentstack.

## Inclusion in your project
You will need to include the `contentstack-extension-sdk` library in your HTML5 app:
```html
<script src="https://unpkg.com/@contentstack/ui-extensions-sdk@2.1.2/dist/ui-extension-sdk.js"></script>
```

## Classes

<dl>
<dt><a href="#ContentstackUIExtension">ContentstackUIExtension</a></dt>
<dd></dd>
<dt><a href="#Extension">Extension</a></dt>
<dd><p>Class representing an extension from Contentstack UI.</p>
</dd>
<dt><a href="#Entry">Entry</a></dt>
<dd><p>Class representing an entry from Contentstack UI. Not available for Dashboard Widget extension.</p>
</dd>
<dt><a href="#Field">Field</a></dt>
<dd><p>Class representing a field from Contentstack UI. Only available for Custom Field extension</p>
</dd>
<dt><a href="#Store">Store</a></dt>
<dd><p>Class used by an extension to store your data in <a href="#external_localStorage">localStorage</a>.</p>
</dd>
<dt><a href="#Window">Window</a></dt>
<dd><p>Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.</p>
</dd>
<dt><a href="#Stack">Stack</a></dt>
<dd><p>Class representing the current stack in Contentstack UI.</p>
</dd>
<dt><a href="#Query">Query</a></dt>
<dd><p>Creates an instance of the query</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_Promise">Promise</a></dt>
<dd><p>The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.</p>
</dd>
<dt><a href="#external_localStorage">localStorage</a></dt>
<dd><p>The read-only localStorage property allows you to access a Storage object for the Document&#39;s origin; the stored data is saved across browser sessions.</p>
</dd>
</dl>

<a name="ContentstackUIExtension"></a>

## ContentstackUIExtension
**Kind**: global class  

* [ContentstackUIExtension](#ContentstackUIExtension)
    * [.SDK_VERSION](#ContentstackUIExtension.SDK_VERSION) : <code>string</code>
    * [.init()](#ContentstackUIExtension.init) ⇒ [<code>Promise</code>](#external_Promise)

<a name="ContentstackUIExtension.SDK_VERSION"></a>

### ContentstackUIExtension.SDK\_VERSION : <code>string</code>
Version of Contentstack UI extension.

**Kind**: static property of [<code>ContentstackUIExtension</code>](#ContentstackUIExtension)  
<a name="ContentstackUIExtension.init"></a>

### ContentstackUIExtension.init() ⇒ [<code>Promise</code>](#external_Promise)
You need to first include Contentstack UI Extensions SDK and
Contentstack UI Stylesheet in you HTML file and then call
ContentstackUIExtension.init in the script tag.

**Kind**: static method of [<code>ContentstackUIExtension</code>](#ContentstackUIExtension)  
**Returns**: [<code>Promise</code>](#external_Promise) - A promise object which will be resolved with an instance of the [Extension](#Extension) class which is instantiated using the data received from the Contentstack UI.  
**Example**  
```js
HTML
<script src="https://unpkg.com/@contentstack/ui-extensions-sdk@2.1.2/dist/ui-extension-sdk.js"></script>
<link href="https://unpkg.com/@contentstack/ui-extensions-sdk@2.1.2/dist/ui-extension-sdk.css" rel="stylesheet" >
```
**Example** *(Custom Filed)*  
```js
// javascript
ContentstackUIExtension.init().then(function (extension) {
    var value = extension.field.getData()
    extension.field.setData("New Field Data")
})
```
**Example** *(Custom Widget)*  
```js
// javascript
ContentstackUIExtension.init().then(function (extension) {
    var entry = extension.entry.getData()
})
```
**Example** *(Dashboard Widget)*  
```js
// javascript
ContentstackUIExtension.init().then(function (extension) {
    var stack = extension.stack;
    var stackData = stack.getData();
})
```
<a name="Extension"></a>

## Extension
Class representing an extension from Contentstack UI.

**Kind**: global class  

* [Extension](#Extension)
    * [.config](#Extension+config) : <code>Object</code>
    * [.currentUser](#Extension+currentUser) : <code>Object</code>
    * [.type](#Extension+type) : <code>string</code>
    * [.fieldConfig](#Extension+fieldConfig) : <code>Object</code>
    * [.field](#Extension+field) : [<code>Field</code>](#Field)
    * [.store](#Extension+store) : [<code>Store</code>](#Store)
    * [.entry](#Extension+entry) : [<code>Entry</code>](#Entry)
    * [.window](#Extension+window) : [<code>Window</code>](#Window)
    * [.stack](#Extension+stack) : [<code>Stack</code>](#Stack)

<a name="Extension+config"></a>

### extension.config : <code>Object</code>
This method gives you the configuration parameters. Check out our [UI Extension documentation](https://www.contentstack.com/docs/guide/extensions) .

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Extension+currentUser"></a>

### extension.currentUser : <code>Object</code>
This object holds details of the current user.

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Extension+type"></a>

### extension.type : <code>string</code>
type of extension, 'FIELD' || 'WIDGET' || 'DASHBOARD'.

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Extension+fieldConfig"></a>

### extension.fieldConfig : <code>Object</code>
This method gives you the instance configuration parameters set from the content type builder page in the field settings. This is only available for the Custom Field extension.

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Extension+field"></a>

### extension.field : [<code>Field</code>](#Field)
Gives you the extension field object which allows you to interact with the field. Only available for the Custom Field extension.

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Extension+store"></a>

### extension.store : [<code>Store</code>](#Store)
Store to persist data for extension.
Note: Data is stored in the browser [localStorage](#external_localStorage) and will be lost if the [localStorage](#external_localStorage) is cleared in the browser.

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Extension+entry"></a>

### extension.entry : [<code>Entry</code>](#Entry)
This gives you the entry object which allows you to interact with the current entry. Not available in case of the Dashboard Widget extension.

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Extension+window"></a>

### extension.window : [<code>Window</code>](#Window)
The window object provides users with methods that allow them to adjust the size of the iframe that contains the extension. Not available in case of custom widgets.

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Extension+stack"></a>

### extension.stack : [<code>Stack</code>](#Stack)
This method returns stack object which allows users to read and manipulate a range of objects in a stack.

**Kind**: instance property of [<code>Extension</code>](#Extension)  
<a name="Entry"></a>

## Entry
Class representing an entry from Contentstack UI. Not available for Dashboard Widget extension.

**Kind**: global class  

* [Entry](#Entry)
    * [.content_type](#Entry+content_type) : <code>Object</code>
    * [.locale](#Entry+locale) : <code>string</code>
    * [.getData()](#Entry+getData) ⇒ <code>Object</code>
    * [.getField(uid)](#Entry+getField) ⇒ <code>Object</code>
    * [.onSave(callback)](#Entry+onSave)

<a name="Entry+content_type"></a>

### entry.content\_type : <code>Object</code>
Gets the content type of the current entry.

**Kind**: instance property of [<code>Entry</code>](#Entry)  
<a name="Entry+locale"></a>

### entry.locale : <code>string</code>
Gets the locale of the current entry.

**Kind**: instance property of [<code>Entry</code>](#Entry)  
<a name="Entry+getData"></a>

### entry.getData() ⇒ <code>Object</code>
Gets data of the current entry.

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Object</code> - Returns entry data.  
<a name="Entry+getField"></a>

### entry.getField(uid) ⇒ <code>Object</code>
Gets the field object which allows you to interact with the field.
This object will have all the same methods and properties of extension.field except for field.setData().

**Kind**: instance method of [<code>Entry</code>](#Entry)  
**Returns**: <code>Object</code> - Field object  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | Unique ID of the field |

**Example**  
```js
var field = entry.getField('field_uid');
var fieldSchema = field.schema;
var fieldUid = field.uid;
var fieldData = field.getData();
```
<a name="Entry+onSave"></a>

### entry.onSave(callback)
This function executes the callback function every time an entry is saved.

**Kind**: instance method of [<code>Entry</code>](#Entry)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The function to be called when an entry is saved. |

<a name="Field"></a>

## Field
Class representing a field from Contentstack UI. Only available for Custom Field extension

**Kind**: global class  

* [Field](#Field)
    * [.uid](#Field+uid) : <code>string</code>
    * [.data_type](#Field+data_type) : <code>string</code>
    * [.schema](#Field+schema) : <code>Object</code>
    * [.setData(data)](#Field+setData) ⇒ [<code>Promise</code>](#external_Promise)
    * [.getData()](#Field+getData) ⇒ <code>Object</code> \| <code>string</code> \| <code>number</code>
    * [.setFocus()](#Field+setFocus) ⇒ <code>Object</code>

<a name="Field+uid"></a>

### field.uid : <code>string</code>
The UID of the current field is defined in the content type of the entry.

**Kind**: instance property of [<code>Field</code>](#Field)  
<a name="Field+data_type"></a>

### field.data\_type : <code>string</code>
The data type of the current field is set using this method.

**Kind**: instance property of [<code>Field</code>](#Field)  
<a name="Field+schema"></a>

### field.schema : <code>Object</code>
The schema of the current field (schema of fields such as ‘Single Line Textbox’, ‘Number’,
 and so on) is set using this method.

**Kind**: instance property of [<code>Field</code>](#Field)  
<a name="Field+setData"></a>

### field.setData(data) ⇒ [<code>Promise</code>](#external_Promise)
Sets the data for the current field.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: [<code>Promise</code>](#external_Promise) - A promise object which is resolved when data is set for a field. Note: The data set by this function will only be saved when user saves the entry.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> \| <code>string</code> \| <code>number</code> | Data to be set on the field |

<a name="Field+getData"></a>

### field.getData() ⇒ <code>Object</code> \| <code>string</code> \| <code>number</code>
Gets the data of the current field

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: <code>Object</code> \| <code>string</code> \| <code>number</code> - Returns the field data.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object for get Data method. |
| options.resolved | <code>boolean</code> | If the resolved parameter is set to true for the File field, then the method will return a resolved asset object along with all the field metadata, e.g. 'field.getData({resolved:true})'. |

<a name="Field+setFocus"></a>

### field.setFocus() ⇒ <code>Object</code>
Sets the focus for a field when an extension is being used. This method shows user presence and highlights the extension field that the user is currently accessing in Contentstack UI.

**Kind**: instance method of [<code>Field</code>](#Field)  
**Returns**: <code>Object</code> - A promise object which is resolved when Contentstack UI returns an acknowledgement of the focused state.  
<a name="Store"></a>

## Store
Class used by an extension to store your data in [localStorage](#external_localStorage).

**Kind**: global class  

* [Store](#Store)
    * [.get(key)](#Store+get) ⇒ [<code>Promise</code>](#external_Promise)
    * [.getAll()](#Store+getAll) ⇒ [<code>Promise</code>](#external_Promise)
    * [.set(key, value)](#Store+set) ⇒ [<code>Promise</code>](#external_Promise)
    * [.remove(key)](#Store+remove) ⇒ [<code>Promise</code>](#external_Promise)
    * [.clear()](#Store+clear) ⇒ [<code>Promise</code>](#external_Promise)

<a name="Store+get"></a>

### store.get(key) ⇒ [<code>Promise</code>](#external_Promise)
Gets the value of key

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the stored data |

**Example**  
```js
extension.store.get('key').then((value) => console.log(value)) // will log value for the given key
```
<a name="Store+getAll"></a>

### store.getAll() ⇒ [<code>Promise</code>](#external_Promise)
Gets an object with all the stored key-value pairs.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Example**  
```js
extension.store.getAll().then((obj) => obj)
```
<a name="Store+set"></a>

### store.set(key, value) ⇒ [<code>Promise</code>](#external_Promise)
Sets the value of a key

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the stored data. |
| value | <code>\*</code> | Data to be stored. |

**Example**  
```js
extension.store.set('key', 'value').then((success) => console.log(success)) // will log ‘true’ when value is set
```
<a name="Store+remove"></a>

### store.remove(key) ⇒ [<code>Promise</code>](#external_Promise)
Removes the value of a key

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the data to be removed from the store |

**Example**  
```js
extension.store.remove('key').then((success) => console.log(success)) // will log ‘true’ when value is removed
```
<a name="Store+clear"></a>

### store.clear() ⇒ [<code>Promise</code>](#external_Promise)
Clears all the stored data of an extension

**Kind**: instance method of [<code>Store</code>](#Store)  
**Example**  
```js
extension.store.clear().then((success) => console.log(success)) // will log ‘true’ when values are cleared
```
<a name="Window"></a>

## Window
Class representing an iframe window from Contentstack UI. Not available for Custom Widgets.

**Kind**: global class  

* [Window](#Window)
    * [.enableResizing()](#Window+enableResizing) ⇒ [<code>Promise</code>](#external_Promise)
    * [.onDashboardResize(callback)](#Window+onDashboardResize) ⇒ <code>boolean</code>
    * [.updateHeight(height)](#Window+updateHeight) ⇒ [<code>Promise</code>](#external_Promise)
    * [.enableAutoResizing()](#Window+enableAutoResizing) ⇒ [<code>Window</code>](#Window)
    * [.disableAutoResizing()](#Window+disableAutoResizing) ⇒ [<code>Window</code>](#Window)

<a name="Window+enableResizing"></a>

### window.enableResizing() ⇒ [<code>Promise</code>](#external_Promise)
This method activates the resize button that gives you the provision to resize the window size of your Dashboard Widget.

**Kind**: instance method of [<code>Window</code>](#Window)  
**Returns**: [<code>Promise</code>](#external_Promise) - A promise object which will resolve when a resize button is visible on the Dashboard Widget.  
<a name="Window+onDashboardResize"></a>

### window.onDashboardResize(callback) ⇒ <code>boolean</code>
This function executes the callback function whenever a Dashboard Widget extension is maximized or minimized. Only applicable on Dashboard Widget extensions.

**Kind**: instance method of [<code>Window</code>](#Window)  
**Returns**: <code>boolean</code> - Will return true  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to be called when a Dashboard Widget extension is maximized or minimized |

<a name="Window+updateHeight"></a>

### window.updateHeight(height) ⇒ [<code>Promise</code>](#external_Promise)
This method updates the extension height on Contentstack UI.
If the ‘height’ argument is not passed, it will calculate the scroll height and set the height of extension window accordingly.

**Kind**: instance method of [<code>Window</code>](#Window)  
**Returns**: [<code>Promise</code>](#external_Promise) - A promise object which will be resolved when Contentstack UI sends an acknowledgement stating that the height has been updated.  

| Param | Type | Description |
| --- | --- | --- |
| height | <code>string</code> \| <code>number</code> | Desired height of the iframe window |

<a name="Window+enableAutoResizing"></a>

### window.enableAutoResizing() ⇒ [<code>Window</code>](#Window)
This method enables auto resizing of the extension height.

**Kind**: instance method of [<code>Window</code>](#Window)  
**Returns**: [<code>Window</code>](#Window) - .  
<a name="Window+disableAutoResizing"></a>

### window.disableAutoResizing() ⇒ [<code>Window</code>](#Window)
This method disables auto resizing of the extension height.

**Kind**: instance method of [<code>Window</code>](#Window)  
**Returns**: [<code>Window</code>](#Window) - .  
<a name="Stack"></a>

## Stack
Class representing the current stack in Contentstack UI.

**Kind**: global class  

* [Stack](#Stack)
    * [.ContentType](#Stack+ContentType)
        * [new this.ContentType(uid)](#new_Stack+ContentType_new)
        * [.Entry](#Stack+ContentType+Entry)
            * [new Entry()](#new_Stack+ContentType+Entry_new)
            * _instance_
                * [.only([key], values)](#Stack+ContentType+Entry+only) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.except([key], values)](#Stack+ContentType+Entry+except) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.addParam(key, value)](#Stack+ContentType+Entry+addParam) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.getReferences()](#Stack+ContentType+Entry+getReferences) ⇒ [<code>Promise</code>](#external_Promise)
                * [.delete()](#Stack+ContentType+Entry+delete) ⇒ [<code>Promise</code>](#external_Promise)
                * [.fetch()](#Stack+ContentType+Entry+fetch) ⇒ [<code>Promise</code>](#external_Promise)
                * [.includeReference()](#Stack+ContentType+Entry+includeReference) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.language(languageCode)](#Stack+ContentType+Entry+language) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.environment(environment_uid)](#Stack+ContentType+Entry+environment) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.addQuery(key, value)](#Stack+ContentType+Entry+addQuery) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.includeSchema()](#Stack+ContentType+Entry+includeSchema) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.includeContentType()](#Stack+ContentType+Entry+includeContentType) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.includeOwner()](#Stack+ContentType+Entry+includeOwner) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
                * [.getLanguages()](#Stack+ContentType+Entry+getLanguages) ⇒ [<code>Promise</code>](#external_Promise)
                * [.unlocalize(locale)](#Stack+ContentType+Entry+unlocalize) ⇒ [<code>Promise</code>](#external_Promise)
                * [.publish(payload)](#Stack+ContentType+Entry+publish) ⇒ [<code>Promise</code>](#external_Promise)
                * [.unpublish(payload)](#Stack+ContentType+Entry+unpublish) ⇒ [<code>Promise</code>](#external_Promise)
                * [.setWorkflowStage(payload)](#Stack+ContentType+Entry+setWorkflowStage) ⇒ [<code>Promise</code>](#external_Promise)
                * [.update(payload, [locale])](#Stack+ContentType+Entry+update) ⇒ [<code>Promise</code>](#external_Promise)
            * _static_
                * [.Query()](#Stack+ContentType+Entry.Query) ⇒ [<code>Query</code>](#Query)
                * [.create(payload)](#Stack+ContentType+Entry.create) ⇒ [<code>Promise</code>](#external_Promise)
    * [.Asset](#Stack+Asset)
        * [new this.Asset(uid)](#new_Stack+Asset_new)
        * _instance_
            * [.only([key], values)](#Stack+Asset+only) ⇒ [<code>Asset</code>](#Stack+Asset)
            * [.except([key], values)](#Stack+Asset+except) ⇒ [<code>Asset</code>](#Stack+Asset)
            * [.environment(environment_uid)](#Stack+Asset+environment) ⇒ [<code>Asset</code>](#Stack+Asset)
            * [.addParam(key, value)](#Stack+Asset+addParam) ⇒ [<code>Asset</code>](#Stack+Asset)
            * [.addQuery(key, value)](#Stack+Asset+addQuery) ⇒ [<code>Asset</code>](#Stack+Asset)
            * [.getReferences()](#Stack+Asset+getReferences) ⇒ [<code>Promise</code>](#external_Promise)
            * [.delete()](#Stack+Asset+delete) ⇒ [<code>Promise</code>](#external_Promise)
            * [.publish(payload)](#Stack+Asset+publish) ⇒ [<code>Promise</code>](#external_Promise)
            * [.unpublish(payload)](#Stack+Asset+unpublish) ⇒ [<code>Promise</code>](#external_Promise)
        * _static_
            * [.Query()](#Stack+Asset.Query) ⇒ [<code>Query</code>](#Query)
            * [.getRteAssets()](#Stack+Asset.getRteAssets) ⇒ [<code>Promise</code>](#external_Promise)
            * [.getAssetsOfSpecificTypes(assetType)](#Stack+Asset.getAssetsOfSpecificTypes) ⇒ [<code>Promise</code>](#external_Promise)
    * [.getData()](#Stack+getData) ⇒ <code>Object</code>
    * [.getContentType(uid, params)](#Stack+getContentType) ⇒ <code>Object</code>
    * [.getContentTypes(query, params)](#Stack+getContentTypes) ⇒ <code>Object</code>
    * [.getEnvironment(name, params)](#Stack+getEnvironment) ⇒ <code>Object</code>
    * [.getEnvironments(query, params)](#Stack+getEnvironments) ⇒ <code>Object</code>
    * [.getLocale(code, params)](#Stack+getLocale) ⇒ <code>Object</code>
    * [.getLocales(query, params)](#Stack+getLocales) ⇒ <code>Object</code>

<a name="Stack+ContentType"></a>

### stack.ContentType
**Kind**: instance class of [<code>Stack</code>](#Stack)  
**See**: [ ContentType](https://www.contentstack.com/docs/apis/content-management-api/#content-types)  
**Version**: 2.0.0  

* [.ContentType](#Stack+ContentType)
    * [new this.ContentType(uid)](#new_Stack+ContentType_new)
    * [.Entry](#Stack+ContentType+Entry)
        * [new Entry()](#new_Stack+ContentType+Entry_new)
        * _instance_
            * [.only([key], values)](#Stack+ContentType+Entry+only) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.except([key], values)](#Stack+ContentType+Entry+except) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.addParam(key, value)](#Stack+ContentType+Entry+addParam) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.getReferences()](#Stack+ContentType+Entry+getReferences) ⇒ [<code>Promise</code>](#external_Promise)
            * [.delete()](#Stack+ContentType+Entry+delete) ⇒ [<code>Promise</code>](#external_Promise)
            * [.fetch()](#Stack+ContentType+Entry+fetch) ⇒ [<code>Promise</code>](#external_Promise)
            * [.includeReference()](#Stack+ContentType+Entry+includeReference) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.language(languageCode)](#Stack+ContentType+Entry+language) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.environment(environment_uid)](#Stack+ContentType+Entry+environment) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.addQuery(key, value)](#Stack+ContentType+Entry+addQuery) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.includeSchema()](#Stack+ContentType+Entry+includeSchema) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.includeContentType()](#Stack+ContentType+Entry+includeContentType) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.includeOwner()](#Stack+ContentType+Entry+includeOwner) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
            * [.getLanguages()](#Stack+ContentType+Entry+getLanguages) ⇒ [<code>Promise</code>](#external_Promise)
            * [.unlocalize(locale)](#Stack+ContentType+Entry+unlocalize) ⇒ [<code>Promise</code>](#external_Promise)
            * [.publish(payload)](#Stack+ContentType+Entry+publish) ⇒ [<code>Promise</code>](#external_Promise)
            * [.unpublish(payload)](#Stack+ContentType+Entry+unpublish) ⇒ [<code>Promise</code>](#external_Promise)
            * [.setWorkflowStage(payload)](#Stack+ContentType+Entry+setWorkflowStage) ⇒ [<code>Promise</code>](#external_Promise)
            * [.update(payload, [locale])](#Stack+ContentType+Entry+update) ⇒ [<code>Promise</code>](#external_Promise)
        * _static_
            * [.Query()](#Stack+ContentType+Entry.Query) ⇒ [<code>Query</code>](#Query)
            * [.create(payload)](#Stack+ContentType+Entry.create) ⇒ [<code>Promise</code>](#external_Promise)

<a name="new_Stack+ContentType_new"></a>

#### new this.ContentType(uid)
Content type defines the structure or schema of a page or a section of your web or mobile property


| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | Uid of contenttype. |

**Example**  
```js
extension.stack.ContentType('content_type_uid')
```
<a name="Stack+ContentType+Entry"></a>

#### contentType.Entry
**Kind**: instance class of [<code>ContentType</code>](#Stack+ContentType)  
**See**: [ Entries](https://www.contentstack.com/docs/apis/content-management-api/#entries)  
**Version**: 2.0.0  

* [.Entry](#Stack+ContentType+Entry)
    * [new Entry()](#new_Stack+ContentType+Entry_new)
    * _instance_
        * [.only([key], values)](#Stack+ContentType+Entry+only) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.except([key], values)](#Stack+ContentType+Entry+except) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.addParam(key, value)](#Stack+ContentType+Entry+addParam) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.getReferences()](#Stack+ContentType+Entry+getReferences) ⇒ [<code>Promise</code>](#external_Promise)
        * [.delete()](#Stack+ContentType+Entry+delete) ⇒ [<code>Promise</code>](#external_Promise)
        * [.fetch()](#Stack+ContentType+Entry+fetch) ⇒ [<code>Promise</code>](#external_Promise)
        * [.includeReference()](#Stack+ContentType+Entry+includeReference) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.language(languageCode)](#Stack+ContentType+Entry+language) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.environment(environment_uid)](#Stack+ContentType+Entry+environment) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.addQuery(key, value)](#Stack+ContentType+Entry+addQuery) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.includeSchema()](#Stack+ContentType+Entry+includeSchema) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.includeContentType()](#Stack+ContentType+Entry+includeContentType) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.includeOwner()](#Stack+ContentType+Entry+includeOwner) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
        * [.getLanguages()](#Stack+ContentType+Entry+getLanguages) ⇒ [<code>Promise</code>](#external_Promise)
        * [.unlocalize(locale)](#Stack+ContentType+Entry+unlocalize) ⇒ [<code>Promise</code>](#external_Promise)
        * [.publish(payload)](#Stack+ContentType+Entry+publish) ⇒ [<code>Promise</code>](#external_Promise)
        * [.unpublish(payload)](#Stack+ContentType+Entry+unpublish) ⇒ [<code>Promise</code>](#external_Promise)
        * [.setWorkflowStage(payload)](#Stack+ContentType+Entry+setWorkflowStage) ⇒ [<code>Promise</code>](#external_Promise)
        * [.update(payload, [locale])](#Stack+ContentType+Entry+update) ⇒ [<code>Promise</code>](#external_Promise)
    * _static_
        * [.Query()](#Stack+ContentType+Entry.Query) ⇒ [<code>Query</code>](#Query)
        * [.create(payload)](#Stack+ContentType+Entry.create) ⇒ [<code>Promise</code>](#external_Promise)

<a name="new_Stack+ContentType+Entry_new"></a>

##### new Entry()
An entry is the actual piece of content created using one of the defined content types

<a name="Stack+ContentType+Entry+only"></a>

##### entry.only([key], values) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to show the selected fields of an entry in the result set.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [key] | <code>String</code> | <code>BASE</code> | Single field of an entry |
| values | <code>Array</code> |  | Array of fields to be shown in the result set |

**Example** *( Only with field UID )*  
```js
extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only('title').fetch();
```
**Example** *( Only with field UID )*  
```js
extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only('BASE','title').fetch();
```
**Example** *( Only with field UIDs(array) )*  
```js
extension.stack.ContentType('content_type_uid').Entry('bltsomething123').only(['title','description']).fetch();
```
<a name="Stack+ContentType+Entry+except"></a>

##### entry.except([key], values) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to hide the selected fields of an entry in the result set.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [key] | <code>String</code> | <code>BASE</code> | Single field of an entry |
| values | <code>Array</code> |  | Array of fields to be hidden in the result set |

**Example** *( Except with field uid )*  
```js
extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except('title').fetch();
```
**Example** *( Except with field uid )*  
```js
extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except('BASE','title').fetch();
```
**Example** *( Except with field uids(array) )*  
```js
extension.stack.ContentType('content_type_uid').Entry('bltsomething123').except(['title','description']).fetch();
```
<a name="Stack+ContentType+Entry+addParam"></a>

##### entry.addParam(key, value) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method includes a query parameter in your query.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Returns**: [<code>Entry</code>](#Stack+ContentType+Entry) - Returns  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the parameter |
| value | <code>string</code> | Value of the parameter |

**Example**  
```js
extension.stack.ContentType('content_type_uid').Entry('uid').addParam('include_count', 'true').fetch().then().catch();
```
<a name="Stack+ContentType+Entry+getReferences"></a>

##### entry.getReferences() ⇒ [<code>Promise</code>](#external_Promise)
This method will fetch all the entries in which the current entry is referenced.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Returns**: [<code>Promise</code>](#external_Promise) - Required data if resolved successfully  
**See**: {@link
  https://www.contentstack.com/docs/apis/content-management-api/#get-all-references-of-an-entry|
  Entry References}  
**Example**  
```js
extension.stack.ContentType('content_type_uid').Entry('uid').getReferences().then().catch();
  
```
<a name="Stack+ContentType+Entry+delete"></a>

##### entry.delete() ⇒ [<code>Promise</code>](#external_Promise)
This method deletes an existing entry.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Returns**: [<code>Promise</code>](#external_Promise) - Required data if resolved successfully  
**See**: {@link
  https://www.contentstack.com/docs/apis/content-management-api/#delete-an-entry|
  Delete Entry}  
**Example**  
```js
extension.stack.ContentType('content_type_uid').Entry('uid').delete().then().catch();
  
```
<a name="Stack+ContentType+Entry+fetch"></a>

##### entry.fetch() ⇒ [<code>Promise</code>](#external_Promise)
This method fetches information of a specific entry.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Returns**: [<code>Promise</code>](#external_Promise) - Required data if resolved successfully  
**See**: {@link
  https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-an-entry|
  Get A Single Entry}  
**Example**  
```js
extension.stack.ContentType('content_type_uid').Entry('uid').fetch().then().catch();
  
```
<a name="Stack+ContentType+Entry+includeReference"></a>

##### entry.includeReference() ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to include referenced entries from other content types.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Example** *( .includeReference with reference_field_uids as array )*  
```js
stack.ContentType('contenttype_uid').Entry('bltsomething123').includeReference(['category', 'author']).fetch()
```
**Example** *( .includeReference with reference_field_uids )*  
```js
stack.ContentType('contenttype_uid').Entry('bltsomething123').includeReference('category', 'author').fetch()
```
<a name="Stack+ContentType+Entry+language"></a>

##### entry.language(languageCode) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to set the language code of which you want to retrieve the data.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Description |
| --- | --- | --- |
| languageCode | <code>String</code> | Language code, for e.g. 'en-us', 'ja-jp', and so on |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').language('en-us').fetch()
```
<a name="Stack+ContentType+Entry+environment"></a>

##### entry.environment(environment_uid) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to set the environment name of which you want to retrieve the data.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Description |
| --- | --- | --- |
| environment_uid | <code>String</code> | UID/Name of environment |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').environment('development').fetch()
```
<a name="Stack+ContentType+Entry+addQuery"></a>

##### entry.addQuery(key, value) ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to add a query to an entry object.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Key of the query |
| value | <code>String</code> | Value of the query |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').addQuery('include_schema',true).fetch()
```
<a name="Stack+ContentType+Entry+includeSchema"></a>

##### entry.includeSchema() ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to include the schema of the current contenttype in result set along with the entry/entries.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeSchema().fetch()
```
<a name="Stack+ContentType+Entry+includeContentType"></a>

##### entry.includeContentType() ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to include the current content type in the result set along with the entry(ies).

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeContentType().fetch()
```
<a name="Stack+ContentType+Entry+includeOwner"></a>

##### entry.includeOwner() ⇒ [<code>Entry</code>](#Stack+ContentType+Entry)
This method is used to include the owner of the entry(ies) in the result set.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').includeOwner().fetch()
```
<a name="Stack+ContentType+Entry+getLanguages"></a>

##### entry.getLanguages() ⇒ [<code>Promise</code>](#external_Promise)
This method returns the details of all the languages that an entry is localized in.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').getLanguages()
```
<a name="Stack+ContentType+Entry+unlocalize"></a>

##### entry.unlocalize(locale) ⇒ [<code>Promise</code>](#external_Promise)
This method is used to unlocalize an entry

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Description |
| --- | --- | --- |
| locale | <code>string</code> | Locale in which the entry has to be unlocalized |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').unlocalize('fr-fr').then(...).catch(...);
```
<a name="Stack+ContentType+Entry+publish"></a>

##### entry.publish(payload) ⇒ [<code>Promise</code>](#external_Promise)
This method lets you publish an entry either immediately or schedule it to be published automatically at a later date/time.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>object</code> | Payload for the request |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').publish({
      "entry": {
          "environments": ["development"],
          "locales": ["en-us"]
      },
      "locale": "en-us",
      "version": 1,
      "scheduled_at": "2019-02-14T18:30:00.000Z"
  }).then(...).catch(...);
```
<a name="Stack+ContentType+Entry+unpublish"></a>

##### entry.unpublish(payload) ⇒ [<code>Promise</code>](#external_Promise)
This method lets you publish an entry either immediately or schedule it to be published automatically at a later date/time.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>object</code> | Payload for the request |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').unpublish({
      "entry": {
          "environments": ["development"],
          "locales": ["en-us"]
      },
      "locale": "en-us",
      "version": 1,
      "scheduled_at": "2019-02-14T18:30:00.000Z"
  }).then(...).catch(...);
```
<a name="Stack+ContentType+Entry+setWorkflowStage"></a>

##### entry.setWorkflowStage(payload) ⇒ [<code>Promise</code>](#external_Promise)
This method allows you to either set a particular workflow stage or update the workflow stage details of an entry.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>object</code> | Payload for the request |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').setWorkflowStage({
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
```
<a name="Stack+ContentType+Entry+update"></a>

##### entry.update(payload, [locale]) ⇒ [<code>Promise</code>](#external_Promise)
This call allows you to update entry content.

**Kind**: instance method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**See**: [ Update Entry](https://www.contentstack.com/docs/apis/content-management-api/#update-an-entry)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>object</code> | Payload for the request |
| [locale] | <code>string</code> | Passing the ‘locale’ parameter will localize the entry in the specified locale  to be localized in the specified locale. |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry('bltsomething123').update(
      {
      "entry": {
          "title": "example",
          "url": "/example"
      }
  }).then(...).catch(...);
```
<a name="Stack+ContentType+Entry.Query"></a>

##### Entry.Query() ⇒ [<code>Query</code>](#Query)
This static method instantiates the query module for entries. To see the list of methods that can be used for querying entries, refer the [Query](#Query) module.

**Kind**: static method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Example**  
```js
let entryQuery = extension.stack.ContentType('content_type_uid').Entry.Query();
entryQuery.where("field_uid": "10").limit(10).skip(10).find().then(...).catch(...);
```
<a name="Stack+ContentType+Entry.create"></a>

##### Entry.create(payload) ⇒ [<code>Promise</code>](#external_Promise)
This method creates a new entry.

**Kind**: static method of [<code>Entry</code>](#Stack+ContentType+Entry)  
**Returns**: [<code>Promise</code>](#external_Promise) - Required data if resolved successfully  
**See**: {@link
  https://www.contentstack.com/docs/apis/content-management-api/#create-a-an-entry|
  Create Entry}  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | Data to create an entry |

**Example**  
```js
extension.stack.ContentType('content_type_uid').Entry.create({
    "entry": {
      "title": "example",
      "url": "/example"
    }
  }).then(...).catch(...);
  
```
<a name="Stack+Asset"></a>

### stack.Asset
**Kind**: instance class of [<code>Stack</code>](#Stack)  
**See**: [ Asset](https://www.contentstack.com/docs/apis/content-management-api/#assets)  
**Version**: 2.0.0  

* [.Asset](#Stack+Asset)
    * [new this.Asset(uid)](#new_Stack+Asset_new)
    * _instance_
        * [.only([key], values)](#Stack+Asset+only) ⇒ [<code>Asset</code>](#Stack+Asset)
        * [.except([key], values)](#Stack+Asset+except) ⇒ [<code>Asset</code>](#Stack+Asset)
        * [.environment(environment_uid)](#Stack+Asset+environment) ⇒ [<code>Asset</code>](#Stack+Asset)
        * [.addParam(key, value)](#Stack+Asset+addParam) ⇒ [<code>Asset</code>](#Stack+Asset)
        * [.addQuery(key, value)](#Stack+Asset+addQuery) ⇒ [<code>Asset</code>](#Stack+Asset)
        * [.getReferences()](#Stack+Asset+getReferences) ⇒ [<code>Promise</code>](#external_Promise)
        * [.delete()](#Stack+Asset+delete) ⇒ [<code>Promise</code>](#external_Promise)
        * [.publish(payload)](#Stack+Asset+publish) ⇒ [<code>Promise</code>](#external_Promise)
        * [.unpublish(payload)](#Stack+Asset+unpublish) ⇒ [<code>Promise</code>](#external_Promise)
    * _static_
        * [.Query()](#Stack+Asset.Query) ⇒ [<code>Query</code>](#Query)
        * [.getRteAssets()](#Stack+Asset.getRteAssets) ⇒ [<code>Promise</code>](#external_Promise)
        * [.getAssetsOfSpecificTypes(assetType)](#Stack+Asset.getAssetsOfSpecificTypes) ⇒ [<code>Promise</code>](#external_Promise)

<a name="new_Stack+Asset_new"></a>

#### new this.Asset(uid)
An initializer is responsible for creating an Asset object.


| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | UID of the asset. |

**Example**  
```js
extension.stack.Asset('asset_uid')
```
<a name="Stack+Asset+only"></a>

#### asset.only([key], values) ⇒ [<code>Asset</code>](#Stack+Asset)
This method is used to show the selected fields of the assets in the result set.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [key] | <code>String</code> | <code>BASE</code> | Single field of an asset |
| values | <code>Array</code> |  | Array of fields to be shown in the result set |

**Example** *( Only with the field UID )*  
```js
extension.stack.Asset('bltsomething123').only('title').fetch();
```
**Example** *( Only with the field UID )*  
```js
extension.stack.Asset('bltsomething123').only('BASE','title').fetch();
```
**Example** *( Only with the field UIDs(array) )*  
```js
extension.stack.Asset('bltsomething123').only(['title','description']).fetch();
```
<a name="Stack+Asset+except"></a>

#### asset.except([key], values) ⇒ [<code>Asset</code>](#Stack+Asset)
This method is used to hide the selected fields of the assets in result set.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [key] | <code>String</code> | <code>BASE</code> | Single field of an asset |
| values | <code>Array</code> |  | Array of fields to be hidden in the result set |

**Example** *( .Except with the field UID )*  
```js
extension.stack.Asset('bltsomething123').except('title').fetch();
```
**Example** *( .Except with the field UID )*  
```js
extension.stack.Asset('bltsomething123').except('BASE','title').fetch();
```
**Example** *( .Except with the field UIDs(array) )*  
```js
extension.stack.Asset('bltsomething123').except(['title','description']).fetch();
```
<a name="Stack+Asset+environment"></a>

#### asset.environment(environment_uid) ⇒ [<code>Asset</code>](#Stack+Asset)
This method is used to set the environment name of which you want to retrieve the data.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  

| Param | Type | Description |
| --- | --- | --- |
| environment_uid | <code>String</code> | UID/Name of environment |

**Example**  
```js
extension.stack.Asset('bltsomething123').environment('development').fetch()
```
<a name="Stack+Asset+addParam"></a>

#### asset.addParam(key, value) ⇒ [<code>Asset</code>](#Stack+Asset)
This method includes a query parameter in your query.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the parammeter |
| value | <code>string</code> | Value of the parammeter |

**Example**  
```js
extension.stack.Asset('uid').addParam('key', 'value').fetch().then().catch();
   
```
<a name="Stack+Asset+addQuery"></a>

#### asset.addQuery(key, value) ⇒ [<code>Asset</code>](#Stack+Asset)
This method includes a query parameter in your query.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the parammeter |
| value | <code>string</code> | Value of the parammeter |

**Example**  
```js
extension.stack.Asset('uid').addQuery('key', 'value').fetch().then().catch();
   
```
<a name="Stack+Asset+getReferences"></a>

#### asset.getReferences() ⇒ [<code>Promise</code>](#external_Promise)
This method will fetch the details of the entries and the assets in which the specified asset is referenced.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  
**See**: {@link
   https://www.contentstack.com/docs/apis/content-management-api/#get-all-references-of-asset|
   Asset References}  
**Example**  
```js
extension.stack.Asset('uid').getReferences().then().catch();
   
```
<a name="Stack+Asset+delete"></a>

#### asset.delete() ⇒ [<code>Promise</code>](#external_Promise)
This method deletes an existing asset.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  
**See**: {@link
   https://www.contentstack.com/docs/apis/content-management-api/#delete-an-asset|
   Delete Asset}  
**Example**  
```js
extension.stack.Asset('uid').delete().then().catch();
   
```
<a name="Stack+Asset+publish"></a>

#### asset.publish(payload) ⇒ [<code>Promise</code>](#external_Promise)
This method allows you to publish the asset either immediately or schedule the publish for a later date/time.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>object</code> | Payload for the request. |

**Example**  
```js
extension.stack.Asset('bltsomething123')
   .publish(
     {
        "asset": {
          "locales": [
            "en-us"
          ],
          "environments": [
            "development"
          ]
        },
        "version": 1,
        "scheduled_at": "2019-02-08T18:30:00.000Z"
      });
```
<a name="Stack+Asset+unpublish"></a>

#### asset.unpublish(payload) ⇒ [<code>Promise</code>](#external_Promise)
This method will instantly unpublish the asset, and also give you the provision to automatically unpublish the asset at a later date/time.

**Kind**: instance method of [<code>Asset</code>](#Stack+Asset)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>object</code> | Payload for the request. |

**Example**  
```js
extension.stack.Asset('bltsomething123')
    .unpublish({
    "asset": {
      "locales": [
        "en-us"
      ],
      "environments": [
        "development"
      ]
    },
    "version": 1,
    "scheduled_at": "2019-02-08T18:30:00.000Z"
  });
```
<a name="Stack+Asset.Query"></a>

#### Asset.Query() ⇒ [<code>Query</code>](#Query)
This static method instantiates the query module for assets. To see the list of methods that can be used for querying assets, refer the [Query](#Query) module.

**Kind**: static method of [<code>Asset</code>](#Stack+Asset)  
**Example**  
```js
let assetQuery = extension.stack.Asset.Query();
assetQuery.where("title": "main.js").limit(10).skip(10).find().then(...).catch(...);
```
<a name="Stack+Asset.getRteAssets"></a>

#### Asset.getRteAssets() ⇒ [<code>Promise</code>](#external_Promise)
This static method retrieves comprehensive information on all assets uploaded through the Rich Text Editor field.

**Kind**: static method of [<code>Asset</code>](#Stack+Asset)  
<a name="Stack+Asset.getAssetsOfSpecificTypes"></a>

#### Asset.getAssetsOfSpecificTypes(assetType) ⇒ [<code>Promise</code>](#external_Promise)
This static method retrieves assets that are either image or video files, based on the request query.

**Kind**: static method of [<code>Asset</code>](#Stack+Asset)  

| Param | Type | Description |
| --- | --- | --- |
| assetType | <code>String</code> | Type of asset to be received for e.g., ‘image/png’ |

<a name="Stack+getData"></a>

### stack.getData() ⇒ <code>Object</code>
This method returns the data of the current stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>Object</code> - Returns stack data.  
<a name="Stack+getContentType"></a>

### stack.getContentType(uid, params) ⇒ <code>Object</code>
This API allows you to retrieve data of a content type of a stack using the [ Content Type API](https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-content-type) requests. This method returns a Promise object.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>Object</code> - A promise object which will be resolved with content type details.  

| Param | Type | Description |
| --- | --- | --- |
| uid | <code>string</code> | Uid of the desired content type |
| params | <code>Object</code> | Optional parameters for the GET call |

<a name="Stack+getContentTypes"></a>

### stack.getContentTypes(query, params) ⇒ <code>Object</code>
This API allows you to retrieve data of a content types of a stack using the [ Content Types API](https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types) requests. This method returns a Promise object.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>Object</code> - A promise object which will be resolved with details of the content type.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | Query for the GET call |
| params | <code>Object</code> | Optional parameters for the GET call |

<a name="Stack+getEnvironment"></a>

### stack.getEnvironment(name, params) ⇒ <code>Object</code>
This API allows you to retrieve environment details of a stack using the [ Environment API](https://www.contentstack.com/docs/apis/content-management-api/#get-a-single-environment) requests. This method returns a Promise object.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>Object</code> - A promise object which will be resolved with environment details.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the desired environment |
| params | <code>Object</code> | Optional parameters for the GET call |

<a name="Stack+getEnvironments"></a>

### stack.getEnvironments(query, params) ⇒ <code>Object</code>
This API allows you to retrieve details of environments of a stack using the [ Environments API](https://www.contentstack.com/docs/apis/content-management-api/#get-all-environments) requests. This method returns a Promise object.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>Object</code> - A Promise object which will be resolved with details of the environments.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | Query for the GET call |
| params | <code>Object</code> | Optional parameters for the GET call |

<a name="Stack+getLocale"></a>

### stack.getLocale(code, params) ⇒ <code>Object</code>
This API allows you to retrive a locale of a stack using the [ Language API](https://www.contentstack.com/docs/apis/content-management-api/#get-a-language) requests. Method returns a Promise object.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>Object</code> - A promise object which will be resolved with locale details.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Code of the desired locale |
| params | <code>Object</code> | Optional parameters for the GET call |

<a name="Stack+getLocales"></a>

### stack.getLocales(query, params) ⇒ <code>Object</code>
This API allows you to retrive the locales of a stack using the [ Languages API](https://www.contentstack.com/docs/apis/content-management-api/#get-all-content-types) requests. Method returns a Promise object.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>Object</code> - A Promise object which will be resolved with details of the locales.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>Object</code> | Query for the GET call |
| params | <code>Object</code> | Optional parameters for the GET call |

<a name="Query"></a>

## Query
Creates an instance of the query

**Kind**: global class  
**Version**: 2.0.0  

* [Query](#Query)
    * [.lessThan](#Query+lessThan) ⇒ [<code>Query</code>](#Query)
    * [.lessThanOrEqualTo](#Query+lessThanOrEqualTo) ⇒ [<code>Query</code>](#Query)
    * [.only([key], values)](#Query+only) ⇒ [<code>Query</code>](#Query)
    * [.except([key], values)](#Query+except) ⇒ [<code>Query</code>](#Query)
    * [.addQuery(key, value)](#Query+addQuery) ⇒ [<code>Query</code>](#Query)
    * [.greaterThan(key, value)](#Query+greaterThan) ⇒ [<code>Query</code>](#Query)
    * [.greaterThanOrEqualTo(key, value)](#Query+greaterThanOrEqualTo) ⇒ [<code>Query</code>](#Query)
    * [.notEqualTo(key, value)](#Query+notEqualTo) ⇒ [<code>Query</code>](#Query)
    * [.containedIn(key, value)](#Query+containedIn) ⇒ [<code>Query</code>](#Query)
    * [.notContainedIn(key, value)](#Query+notContainedIn) ⇒ [<code>Query</code>](#Query)
    * [.exists(key)](#Query+exists) ⇒ [<code>Query</code>](#Query)
    * [.notExists(key)](#Query+notExists) ⇒ [<code>Query</code>](#Query)
    * [.ascending(key)](#Query+ascending) ⇒ [<code>Query</code>](#Query)
    * [.descending(key)](#Query+descending) ⇒ [<code>Query</code>](#Query)
    * [.skip(skip)](#Query+skip) ⇒ [<code>Query</code>](#Query)
    * [.limit(limit)](#Query+limit) ⇒ [<code>Query</code>](#Query)
    * [.or(Array)](#Query+or) ⇒ [<code>Query</code>](#Query)
    * [.and(Array)](#Query+and) ⇒ [<code>Query</code>](#Query)
    * [.addParam(key, value)](#Query+addParam) ⇒ [<code>Query</code>](#Query)
    * [.includeReference()](#Query+includeReference) ⇒ [<code>Query</code>](#Query)
    * [.includeSchema()](#Query+includeSchema) ⇒ [<code>Query</code>](#Query)
    * [.language(languageCode)](#Query+language) ⇒ [<code>Query</code>](#Query)
    * [.includeContentType()](#Query+includeContentType) ⇒ [<code>Query</code>](#Query)
    * [.includeOwner()](#Query+includeOwner) ⇒ [<code>Query</code>](#Query)
    * [.environment(environment_uid)](#Query+environment) ⇒ [<code>Query</code>](#Query)
    * [.equalTo(key, value)](#Query+equalTo) ⇒ [<code>Query</code>](#Query)
    * [.count()](#Query+count) ⇒ [<code>Query</code>](#Query)
    * [.query(query)](#Query+query) ⇒ [<code>Query</code>](#Query)
    * [.tags(values)](#Query+tags) ⇒ [<code>Query</code>](#Query)
    * [.includeCount()](#Query+includeCount) ⇒ [<code>Query</code>](#Query)
    * [.getQuery()](#Query+getQuery) ⇒ [<code>Query</code>](#Query)
    * [.regex(key, value, [options])](#Query+regex) ⇒ [<code>Query</code>](#Query)
    * [.search(value)](#Query+search) ⇒ [<code>Query</code>](#Query)
    * [.find()](#Query+find)
    * [.findOne()](#Query+findOne)

<a name="Query+lessThan"></a>

### query.lessThan ⇒ [<code>Query</code>](#Query)
This method provides only the entries with values less than the specified value for a field.

**Kind**: instance property of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>\*</code> | The value used to match or compare |

**Example**  
```js
extension.stack.ContentType('blog').lessThan('created_at','2015-06-22')
```
<a name="Query+lessThanOrEqualTo"></a>

### query.lessThanOrEqualTo ⇒ [<code>Query</code>](#Query)
This method provides only the entries with values less than or equal to the specified value for a field.

**Kind**: instance property of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>\*</code> | The value used to match or compare |

**Example**  
```js
extension.stack.ContentType('blog').lessThanOrEqualTo('created_at','2015-03-12')
```
<a name="Query+only"></a>

### query.only([key], values) ⇒ [<code>Query</code>](#Query)
This method is used to show the selected fields of an entry in the result set.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [key] | <code>String</code> | <code>BASE</code> | Single field of an entry |
| values | <code>Array</code> |  | Array of fields to be shown in the result set |

**Example** *( Only with field UID )*  
```js
extension.stack.ContentType('content_type_uid').Entry.Query().only('title').find();
```
**Example** *( Only with field UID )*  
```js
extension.stack.ContentType('content_type_uid').Entry.Query().only('BASE','title').find();
```
**Example** *( Only with field UIDs(array) )*  
```js
extension.stack.ContentType('content_type_uid').Entry.Query().only(['title','description']).find();
```
<a name="Query+except"></a>

### query.except([key], values) ⇒ [<code>Query</code>](#Query)
This method is used to hide the selected fields of an entry in the result set.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [key] | <code>String</code> | <code>BASE</code> | Single field of an entry |
| values | <code>Array</code> |  | Array of fields to be hidden in the result set |

**Example** *( Except with field uid )*  
```js
extension.stack.ContentType('content_type_uid').Entry.Query().except('title').find();
```
**Example** *( Except with field uid )*  
```js
extension.stack.ContentType('content_type_uid').Entry.Query().except('BASE','title').find();
```
**Example** *( Except with field uids(array) )*  
```js
extension.stack.ContentType('content_type_uid').Entry.Query().except(['title','description']).find();
```
<a name="Query+addQuery"></a>

### query.addQuery(key, value) ⇒ [<code>Query</code>](#Query)
This method includes a query parameter in your query.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the parammeter |
| value | <code>string</code> | Value of the parammeter |

**Example**  
```js
extension.stack.ContentType('content_type_uid').Entry.Query().addQuery('key', 'value').find().then().catch();
       
```
<a name="Query+greaterThan"></a>

### query.greaterThan(key, value) ⇒ [<code>Query</code>](#Query)
This method provides only the entrieswith values
 greater than the specified value for a field.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>\*</code> | The value used to match or compare |

**Example**  
```js
extension.stack.ContentType('blog').greaterThan('created_at','2015-03-12')
```
<a name="Query+greaterThanOrEqualTo"></a>

### query.greaterThanOrEqualTo(key, value) ⇒ [<code>Query</code>](#Query)
This method provides only the entries with values greater than or equal to the specified value for a field.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>\*</code> | The value used to match or compare |

**Example**  
```js
extension.stack.ContentType('blog').greaterThanOrEqualTo('created_at', '2015-06-22')
```
<a name="Query+notEqualTo"></a>

### query.notEqualTo(key, value) ⇒ [<code>Query</code>](#Query)
This method provides only the entries with values not equal to the specified value for a field.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>\*</code> | The value used to match or compare |

**Example**  
```js
extension.stack.ContentType('blog').notEqualTo('title','Demo')
```
<a name="Query+containedIn"></a>

### query.containedIn(key, value) ⇒ [<code>Query</code>](#Query)
This method provides only the entries with values matching the specified values for a field.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>\*</code> | An array of values that are to be used to match or compare |

**Example**  
```js
extension.stack.ContentType('blog').containedIn('title', ['Demo', 'Welcome'])
```
<a name="Query+notContainedIn"></a>

### query.notContainedIn(key, value) ⇒ [<code>Query</code>](#Query)
This method provides only the entries that do not contain values matching the specified values for a field.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>Array</code> | An array of values that are to be used to match or compare |

**Example**  
```js
extension.stack.ContentType('blog').notContainedIn('title', ['Demo', 'Welcome'])
```
<a name="Query+exists"></a>

### query.exists(key) ⇒ [<code>Query</code>](#Query)
This method provides only the entries that contains the field matching the specified field UID.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |

**Example**  
```js
extension.stack.ContentType('blog').exists('featured')
```
<a name="Query+notExists"></a>

### query.notExists(key) ⇒ [<code>Query</code>](#Query)
This method provides only the entries that do not contain the field matching the specified field UID.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |

**Example**  
```js
extension.stack.ContentType('blog').notExists('featured')
```
<a name="Query+ascending"></a>

### query.ascending(key) ⇒ [<code>Query</code>](#Query)
This parameter sorts the entries in ascending order on the basis of the value of the specified field.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Field UID to be used for sorting. |

**Example**  
```js
extension.stack.ContentType('blog').ascending('created_at')
```
<a name="Query+descending"></a>

### query.descending(key) ⇒ [<code>Query</code>](#Query)
This method sorts the entries in descending order on the basis of the specified field.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Field UID to be used for sorting |

**Example**  
```js
extension.stack.ContentType('blog').descending('created_at')
```
<a name="Query+skip"></a>

### query.skip(skip) ⇒ [<code>Query</code>](#Query)
This method skips the specified number of entries.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| skip | <code>Number</code> | Number of entries to be skipped |

**Example**  
```js
extension.stack.ContentType('blog').skip(5)
```
<a name="Query+limit"></a>

### query.limit(limit) ⇒ [<code>Query</code>](#Query)
This method limits the response by providing only the specified number of entries.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>Number</code> | Maximum number of entries to be returned in the result. |

**Example**  
```js
extension.stack.ContentType('blog').limit(10)
```
<a name="Query+or"></a>

### query.or(Array) ⇒ [<code>Query</code>](#Query)
This method performs the OR operation on the specified query objects and provides only the matching entries.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| Array | <code>object</code> | of query objects/raw queries  to be taken into consideration |

**Example** *( OR with query instances)*  
```js
let Query1 = extension.stack.ContentType('blog').Entry.Query().where('title', 'Demo')
let Query2 = extension.stack.ContentType('blog').Entry.Query().lessThan('comments', 10)
let blogQuery = extension.stack.ContentType('blog').or(Query1, Query2)
```
**Example** *( OR with query instances)*  
```js
let Query1 = extension.stack.ContentType('blog').Entry.Query().where('title', 'Demo').getQuery()
let Query2 = extension.stack.ContentType('blog').Entry.Query().lessThan('comments', 10).getQuery()
let blogQuery = extension.stack.ContentType('blog').or(Query1, Query2)
```
<a name="Query+and"></a>

### query.and(Array) ⇒ [<code>Query</code>](#Query)
This method performs the AND operation on the specified query objects and provides only the matching entries.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| Array | <code>object</code> | of query objects/raw queries to be taken into consideration |

**Example** *( AND with raw queries)*  
```js
let Query1 = extension.stack.ContentType('blog').Entry.Query().where('title', 'Demo');
let Query2 = extension.stack.ContentType('blog').Entry.Query().lessThan('comments', 10);
let blogQuery = extension.stack.ContentType('blog').and(Query1, Query2)
```
**Example** *( .and with raw queries)*  
```js
let Query1 = extension.stack.ContentType('blog').Entry.Query().where('title', 'Demo').getQuery();
let Query2 = extension.stack.ContentType('blog').Entry.Query().lessThan('comments', 10).getQuery();
let blogQuery = extension.stack.ContentType('blog').and(Query1, Query2)
```
<a name="Query+addParam"></a>

### query.addParam(key, value) ⇒ [<code>Query</code>](#Query)
This method includes a query parameter in your query.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Key of the parammeter |
| value | <code>string</code> | Value of the parammeter |

**Example**  
```js
extension.stack.ContentType('content_type_uid').Entry.Query().addParam('key', 'value').find().then().catch();
       
```
<a name="Query+includeReference"></a>

### query.includeReference() ⇒ [<code>Query</code>](#Query)
This method is used to include referenced entries from other content types. Note: This method is only valid for querying [Entry](#Stack+ContentType+Entry).

**Kind**: instance method of [<code>Query</code>](#Query)  
**Example** *( .includeReference with reference_field_uids as array )*  
```js
stack.ContentType('contenttype_uid').Entry.Query().includeReference(['category', 'author']).find()
```
**Example** *( .includeReference with reference_field_uids )*  
```js
stack.ContentType('contenttype_uid').Entry.Query().includeReference('category', 'author').find()
```
<a name="Query+includeSchema"></a>

### query.includeSchema() ⇒ [<code>Query</code>](#Query)
This method is used to include the schema of the current contenttype in result set along with the entry/entries. Note: This method is only valid for querying [Entry](#Stack+ContentType+Entry).

**Kind**: instance method of [<code>Query</code>](#Query)  
**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry.Query().includeSchema().find()
```
<a name="Query+language"></a>

### query.language(languageCode) ⇒ [<code>Query</code>](#Query)
This method is used to set the language code of which you want to retrieve the data. Note: This method is only valid for querying [Entry](#Stack+ContentType+Entry).

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| languageCode | <code>String</code> | Language code, for e.g. 'en-us', 'ja-jp', and so on |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry.Query().language('en-us').find()
```
<a name="Query+includeContentType"></a>

### query.includeContentType() ⇒ [<code>Query</code>](#Query)
This method is used to include the current content type in the result set along with the entry(ies). Note: This method is only valid for querying [Entry](#Stack+ContentType+Entry).

**Kind**: instance method of [<code>Query</code>](#Query)  
**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry.Query().includeContentType().find()
```
<a name="Query+includeOwner"></a>

### query.includeOwner() ⇒ [<code>Query</code>](#Query)
This method is used to include the owner of the entry(ies) in the result set. Note: This method is only valid for querying [Entry](#Stack+ContentType+Entry).

**Kind**: instance method of [<code>Query</code>](#Query)  
**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry.Query().includeOwner().find()
```
<a name="Query+environment"></a>

### query.environment(environment_uid) ⇒ [<code>Query</code>](#Query)
This method is used to set the environment name of which you want to retrieve the data.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| environment_uid | <code>String</code> | UID/Name of environment |

**Example**  
```js
extension.stack.ContentType('contenttype_uid').Entry.Query().environment('development').find()
```
<a name="Query+equalTo"></a>

### query.equalTo(key, value) ⇒ [<code>Query</code>](#Query)
This method provides only the entries containing field values matching the specified condition.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>\*</code> | The value used to match or compare |

**Example**  
```js
extension.stack.ContentType('blog').where('title','Demo')
```
<a name="Query+count"></a>

### query.count() ⇒ [<code>Query</code>](#Query)
This method provides only the number of entries matching the specified filters.

**Kind**: instance method of [<code>Query</code>](#Query)  
**Example**  
```js
extension.stack.ContentType('blog').count()
```
<a name="Query+query"></a>

### query.query(query) ⇒ [<code>Query</code>](#Query)
This method is used to set raw queries on the Query instance.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | Raw{json} queries to filter the entries in the result set. |

<a name="Query+tags"></a>

### query.tags(values) ⇒ [<code>Query</code>](#Query)
The ’tags’ parameter allows you to specify an array of tags to search for objects.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | Tags |

**Example**  
```js
extension.stack.ContentType('blog').tags(['technology', 'business'])
```
<a name="Query+includeCount"></a>

### query.includeCount() ⇒ [<code>Query</code>](#Query)
This method also includes the total number of entries returned in the response.

**Kind**: instance method of [<code>Query</code>](#Query)  
**Example**  
```js
extension.stack.ContentType('blog').includeCount()
```
<a name="Query+getQuery"></a>

### query.getQuery() ⇒ [<code>Query</code>](#Query)
This method provides raw{json} queries based on the filters applied on the Query object.

**Kind**: instance method of [<code>Query</code>](#Query)  
**Summary**: returns Returns the raw query which can be used for further calls (.and/.or).  
**Example**  
```js
extension.stack.ContentType('blog').where('title','Demo').getQuery()
```
<a name="Query+regex"></a>

### query.regex(key, value, [options]) ⇒ [<code>Query</code>](#Query)
This method provides only the entries matching the regular expression for the specified field.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | UID of the field |
| value | <code>\*</code> | The value used to match or compare |
| [options] | <code>String</code> | Match or compare a value in the entry |

**Example** *( .regex without options)*  
```js
let blogQuery = extension.stack.ContentType('blog').regex('title','^Demo')
```
**Example** *( .regex with options)*  
```js
let blogQuery = extension.stack.ContentType('blog').regex('title','^Demo', 'i')
```
<a name="Query+search"></a>

### query.search(value) ⇒ [<code>Query</code>](#Query)
This method is used to search data in entries.

**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | Value to search in the entries. |

**Example**  
```js
extension.stack.ContentType('blog').search('Welcome to demo')
```
<a name="Query+find"></a>

### query.find()
This method provides all the entries which satisfy the specified query.

**Kind**: instance method of [<code>Query</code>](#Query)  
**Example**  
```js
let blogQuery = extension.stack.ContentType('blog').find()
```
<a name="Query+findOne"></a>

### query.findOne()
This method provides a single entry from the result set.

**Kind**: instance method of [<code>Query</code>](#Query)  
**Example**  
```js
let blogQuery = extension.stack.ContentType('blog').findOne()
```
<a name="external_Promise"></a>

## Promise
The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

**Kind**: global external  
**See**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise  
<a name="external_localStorage"></a>

## localStorage
The read-only localStorage property allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions.

**Kind**: global external  
**See**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
