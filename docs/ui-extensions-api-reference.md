
# Contentstack Extensions API Reference

This document describes the API requests that a custom extension can use to communicate with Contentstack.
## Table of Contents

- [Inclusion in your project](#inclusion-in-your-project)
- [Initialization](#initialization)
- [`extension.config`](#extensionconfig)
- [`extension.field`](#extensionfield)
- [`extension.entry`](#extensionentry)
  - [`entry.getField(uid)`](#entrygetfielduid)
- [`extension.stack`](#extensionstack)
- [`extension.currentUser`](#extensioncurrentuser)
- [`extension.window`](#extensionwindow)

## Inclusion in your project
You will need to include the `contentstack-extension-sdk` library in your HTML5 app:
```html
<script src="https://www.contentstack.com/sdks/contentstack-ui-extensions/dist/latest/ui-extension-sdk.js"></script>
```

## Initialization
You need to first include Contentstack Extensions SDK and Contentstack Extensions Stylesheet in you HTML file. Then, call the `ContentstackUIExtension.init` method, exposed by the SDK, in the `<script>` tag.

This is the main entry point for all extension-related code.

```html
<script src="https://www.contentstack.com/sdks/contentstack-ui-extensions/dist/latest/ui-extension-sdk.js"></script>
<link href="https://www.contentstack.com/sdks/contentstack-ui-extensions/dist/latest/ui-extension-sdk.css" rel="stylesheet" >
```
```javascript
ContentstackUIExtension.init(function (extension) {
  var value = extension.field.getData()
  extension.field.setData("New Field Data")
})
```
## `extension.config`

This method gives you the configuration parameters.

## `extension.type`

This returns the type of extension, i.e., WIDGET or FIELD._Since v1.1.0_

## `extension.field`

Gives you the extension field object which allows you to access the value and metadata of the extension field.

### `extension.field.getData():`

Gets the data of the current field.

### `extension.field.setData(data): Promise`

Sets the data for the current field. It returns a promise object. Data for the field is successfully set only when promise resolves without any error. For example, `extensions.field.setData("Test Data")`.

### `extension.field.setFocus(): Promise`
Sets the focus for a field when an extension is being used. This method shows user presence and highlights field in Contentstack UI by returning a promise object.

### `extension.field.uid: string`
Gets the UID of the current field.

### `extension.field.data_type: string`
Gets the data type of the current field.

### `extension.field.schema: string`
Gets the schema of the current field.

## `extension.entry`
This gives you the entry object which allows you to interact with the current entry.

### `entry.getData(): object`
Gets data of the current entry.

## `entry.onSave(fn)`
This function calls the callback function every time an entry is saved. _Since v1.1.0_

## `entry.getField(uid)`
Gets the field object which allows you to interact with the field. These object will have all the same methods and properties of `extension.field` except for `field.setData()`.

 - `field.uid: string`
 - `field.data_type: string`
 - `field.schema: string`
 - `field.getData(): mixed`

#### Example
Get values of a field
```javascript
var field = entry.getField('field_uid');
var fieldSchema = field.schema;
var fieldUid = field.uid;
var fieldData = field.getData();
```
## `extension.stack`
This method returns stack object which allows users to to read and manipulate a range of objects in a stack.

### `stack.getData(): object`
This method returns data of the current stack. _Since v1.1.0_

### Content Type
This API allows users to interact with the content types of a stack using the Content Type Content Delivery API requests. All methods return Promise object.

- `stack.getContentType(uid, params)`
- `stack.getContentTypes(query, params)`

### Entries
This API allows users to interact with the entries of a stack using the Entries Content Delivery API requests. All methods return Promise object.

#### Get a Single Entry
To get a single entry, you need to specify the content type as well as the UID of the entry. 

      const Query = stack.ContentType('blog').Entry("blta464e9fbd048668c")
       Query.fetch()
            .then(function success(entry) {
              console.log(entry); 
            }, function error(err) {
              // err object
            });

#### Get Multiple Entries
To retrieve multiple entries of a content type, you need to specify the content type UID. You can also specify search parameters to filter results.

    const Query = stack.ContentType('blog').Query();
    Query
       .where("title", "welcome")
       .includeSchema()
       .includeCount()
       .find()
       .then(function success(result) {
         console.log(result);
        }, function error(err) {
         // err object
     });

Go through our [JavaScript API Reference Guide  
](https://www.contentstack.com/docs/platforms/javascript-browser/api-reference/) to know about the methods that can be used to query your content in Contentstack.

### Assets
This API allows users to interact with the assets of a stack using the Assets Content Delivery API requests. All methods return Promise object.

#### Get a Single Asset
To retrieve a specific asset, you need to specify the asset UID.

    const Query = stack.Assets("blta464e9fbd048668c")
    Query.fetch()
        .then(function success(entry) {
            console.log(entry);
        }, function error(err) {
            // err object
        });

#### Get Multiple Assets
To retrieve multiple assets, use the below request. You can also specify search parameters to filter results.

    const Query = stack.Assets().Query();
    Query       
       .includeCount()
       .find()
       .then(function success(result) {
         console.log(result);
        }, function error(err) {
         // err object
     });

### Environment
This API allows users to interact with the assets of a stack using the Environment Content Delivery API Requests. All methods return Promise object.

- `stack.getEnvironment(name, params)`
- `stack.getEnvironments(query, params)`

### Locale
This API allows users to interact with the assets of a stack using the Languages Content Delivery API Requests. All methods return Promise object.

- `stack.getLocale(code, params)`
- `stack.getLocales(query, params)`
    
## `extension.currentUser`

This object holds details of the current user. The details include roles assigned to users.

## `extension.window`
The window object provides users with methods that allow them to adjust the size of the `<iframe>` that contains the extension.

### `window.updateHeight(height)`
This method updates the extension height on Contentstack UI. If argument height is not passed then it will calculate the scroll height and set the height of the extension window accordingly.

### `window.enableAutoResizing()`
This method enables auto resizing of the extension height.

### `window.disableAutoResizing()`
This method disables auto resizing of the extension height.

