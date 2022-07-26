<!-- ⚠️ This README has been generated from the file(s) "./.github/readme/blueprint.md" ⚠️-->
[](#contentstack-extensions-sdk)

# Contentstack Extensions SDK

The Extensions SDK allows you to extend Contentstack’s UI by helping you create Custom Fields, Custom Widgets, and Dashboard Widgets.

**Custom Fields** enable users to introduce simpler interface controls, such as color picker, code editor, video selector, and more, or maybe complex micro web applications such as Shopify or Snipkart. Because of their dissociated nature, custom fields can be reused multiple times.

**Custom Widgets** are like micro content-processing apps that help you analyze the entry content and provide recommendations. Some of the useful widgets you can create using this type of extension are text intelligence, SEO recommendations, language translation, grammar checker and more.

**Dashboard Widgets** let you add powerful widgets to the stack’s dashboard that let users do more from a centralized location. Some examples of this type of extension include personal notes, recently published content, notification centre, and stack usage summary.

This SDK overview document introduces you to the concept of custom extensions.


[](#getting-started)

## Getting started

Include the compiled version of the extension client library by adding the following line to your application.

```html
<script
    src="https://unpkg.com/@contentstack/ui-extensions-sdk@2.2.1/dist/ui-extension-sdk.js"
    integrity="sha512-Zvd/rx8MHdudDeY916W50kakd+G/7Z/L4VvG0A/NBWVtmAlD7FPHcWDHc5a4WpGSXoXDgy2SLLDVrASxM7IpNQ=="
    crossorigin="anonymous"
></script>
```


[](#extensions-examples)

## Extensions examples

### Custom Fields

Some of the examples of custom field extensions are:

-   **[Color Picker](https://github.com/contentstack/extensions/tree/master/color-picker)** - Displays a native color picker polyfill that allows users to select color as input value and saves the color code in the backend

-   **[Ace Editor](https://github.com/contentstack/extensions/tree/master/ace-editor)** - Displays a code editor written in JavaScript, allowing you to edit HTML, PHP, JavaScript and more easily

-   **[JSON Editor](https://github.com/contentstack/extensions/tree/master/json-editor)** - Displays a simple editor that lets you view, edit and format JSON code within the field of your content type

-   **[Key-value Field](https://github.com/contentstack/extensions/tree/master/key-value-field)** - Lets you add key-value as input value of a field of your content type

-   **[Progress Bar](https://github.com/contentstack/extensions/tree/master/progress-bar)** - Allows users to set value of a field by sliding the progress bar to the left or right

-   **[Star Ratings](https://github.com/contentstack/extensions/tree/master/ratings)** - Lets you provide rating by choosing number of stars

-   **[Brightcove](https://github.com/contentstack/extensions/tree/master/brightcove)** - Lets you fetch and display your Brightcove videos into a field of your content type.

-   **[Shopify](https://github.com/contentstack/extensions/tree/master/shopify)** - Lets you load products of your Shopify store into the field of your content type.

-   **[Egnyte](https://github.com/contentstack/extensions/tree/master/egnyte)** - Allows you to fetch files of your Egnyte account and display them into a field of your content type.

-   **[Ooyala](https://github.com/contentstack/extensions/tree/master/ooyala)** - Lets you fetch and display your Ooyala videos into a field of your content type.

-   **[Optimizely](https://github.com/contentstack/extensions/tree/master/optimizely)** - Lets you serve personalized content by allowing you to select the audience for each entry.

-   **[Youtube](https://github.com/contentstack/extensions/tree/master/youtube)** - Lets you fetch and display your Youtube videos into a field of your content type.

-   **[External API Lookup](https://github.com/contentstack/extensions/tree/master/external-api-lookup-template)** - Lets you fetch data from an external API and display the data as possible values for the field on an entry page in Contentstack.

### Custom Widgets

Some of the examples of custom widget extensions are:

-   [**Text Intelligence**](https://github.com/contentstack/extensions/tree/master/text-intelligence) - Lets you use MonekyLearn APIs to provide helpful recommendations such as content summarizer, keyword extractor, retail classifier, etc.

-   [**Google Analytics**](https://github.com/contentstack/extensions/tree/master/google-analytics) - Displays the traffic analysis and statistics of your entry (using Google Analytics data) on the sidebar of the entry.

-   [**Optimizely Experiments**](https://github.com/contentstack/extensions/tree/master/optimizely-experiments) - Lets you retrieve and display Optimizely Experiments and their details in your entry.

### Dashboard Widgets

Some of the examples of the dashboard widget extensions are:

-   [**Google Analytics**](https://github.com/contentstack/extensions/tree/master/dashboard-widget-google-analytics) - Displays the traffic analysis and statistics of your site on the stack dashboard.


[](#using-contentstack-styles)

## Using Contentstack styles

Extensions are rendered within an iframe, you will need to include the ui-extension-sdk.min.css library within your custom extension in order to use any of the styles provided by Contentstack.

Include the CSS file in your extension code as follows:

```html
<link
    rel="stylesheet"
    type="text/css"
    href="https://unpkg.com/@contentstack/ui-extensions-sdk/dist/ui-extension-sdk.css"
    integrity="sha512-YFrH8bTpkhIRTf8jgGmJDWvd56LA9GnRzirfMr/K78ldxsyrfedaMxMCZMC9A9d0LzuVFhkkHWo10HWEoAgjjg=="
    crossorigin="anonymous"
/>
```

For more information on styling your extension, refer to our [style guide](https://www.contentstack.com/docs/extensions/style-guide/).


[](#more-information)

## More information

-   [Extensions SDK API reference](https://github.com/contentstack/ui-extensions-sdk/blob/2.2.0/docs/ui-extensions-api-reference.md)
-   [Extensions documentation ](https://www.contentstack.com/docs/guide/extensions)


[](#license)

## License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
