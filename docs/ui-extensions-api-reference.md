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
You will need to include the contentstack-extension-sdk library in your HTML5 app:
```html
<script src="https://www.contentstack.com/sdks/contentstack-ui-extensions/dist/latest/ui-extension-sdk.js"></script>
```

## Initialization
You need to first include Contentstack Extensions SDK and Contentstack Extensions Stylesheet in you HTML file. Then, call the ContentstackUIExtension.init method, exposed by the SDK, in the <script> tag.

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

## `extension.field`

Gives you the extension field object which allows you to access the value and metadata of the extension field.

### `extension.field.getData():`

Gets the data of the current field.

### `extension.field.setData(data): Promise`

Sets the data for the current field. It returns a promise object. Data for the field is successfully set only when promise resolves without any error.For example, `extensions.field.setData("Test Data")`.

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

## `entry.getField(uid)`

Gets the field object which allows you to interact with the field. These object will have all the same methods and properties of extension.field except for field.setData().

`field.uid: string`
`field.data_type: string`
`field.schema: string`
`field.getData(): mixed`

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
This method returns data of the current stack.
    
## `extension.currentUser`

This object holds details of the current user.

## `extension.window`
The window object provides users with methods that allow them to adjust the size of the iframe that contains the extension.

### `window.updateHeight(height)`
This method updates the extension height on Contentstack UI. If argument height is not passed then it will calculate the scroll height and set the height of the extension window accordingly.
### `window.enableAutoResizing()`

This method enables auto resizing of the extension height.

### `window.disableAutoResizing()`

This method disables auto resizing of the extension height.

