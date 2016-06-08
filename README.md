[![polymer-mustache-template](https://cdn.rawgit.com/ChristianGrete/polymer-mustache-template/v1.5.11/logo.svg "polymer-mustache-template")](https://github.com/ChristianGrete/polymer-mustache-template)

# polymer-mustache-template

[![Travis CI](https://img.shields.io/travis/ChristianGrete/polymer-mustache-template.svg)](https://travis-ci.org/ChristianGrete/polymer-mustache-template)
[![Task Runner](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com)
[![Latest GitHub Tag](https://img.shields.io/github/tag/ChristianGrete/polymer-mustache-template.svg)](https://github.com/ChristianGrete/polymer-mustache-template/tags)
[![Bower Component Version](https://img.shields.io/bower/v/polymer-mustache-template.svg)](http://bower.io/search/?q=polymer-mustache-template)
[![Node.js Module Version](https://img.shields.io/npm/v/polymer-mustache-template.svg)](https://www.npmjs.com/package/polymer-mustache-template)
[![Downloads via npm per Month](https://img.shields.io/npm/dm/polymer-mustache-template.svg)](https://www.npmjs.com/package/polymer-mustache-template)

> A [Mustache](https://mustache.github.io) template for [Polymer](https://www.polymer-project.org) web components

__polymer-mustache-template__ provides a [Mustache](https://mustache.github.io) template file that can be used to render [Polymer](https://www.polymer-project.org) _local DOM_ modules (custom elements) from external HTML, CSS and JavaScript files.

For instance, this template could be used by a task runner to build web components out of different sources.

## Getting started

### Installation
Install this template as a dependency to your project using [npm](https://www.npmjs.org):
```sh
$ npm install --save polymer-mustache-template
```
Alternatively, it is also available on [Bower](http://bower.io):
```sh
$ bower install --save polymer-mustache-template
```

### Usage
This template can easily be required as a CommonJS module in Node.js:
```js
var polymerMustacheTemplate = require('polymer-mustache-template').default;
```

### Hash Example
The following view data is referenced in the template file:
```js
{
  id: 'example-element',
  imports: {
    additional: [
      '../optional/path/to/an/additional/component.html',
      '../another/optional/path/to/an/additional/component.html'
    ],
    polymer: '../required/path/to/polymer.html'
  },
  markup: '<p>Hello world!</p> <!-- This property is optional -->',
  script: 'Polymer({ is: "example-element" }); // This property is required',
  style: '.optional-css-styles { color: red; }'
}
```

## Policy

This is communist software. It is crafted with heart and soul to the best of the author’s knowledge and belief: _Not for profit but to satisfy the concrete needs._ Do whatever you want with it (as long as you keep the author’s copyright notice in all copies or substantial portions of it included) for free. Imagine how the world could be if others would produce and distribute their products for the same benefits and ask yourself why they’re actually not.

## License

This software is licensed under [MIT License](LICENSE.md).

Copyright © 2016 [Christian Grete](https://christiangrete.com)
- [GitHub](https://github.com/ChristianGrete)
- [npm](https://www.npmjs.com/~christiangrete)
- [Twitter](https://twitter.com/ChristianGrete)
- [LinkedIn](https://www.linkedin.com/in/ChristianGrete)
- [XING](https://www.xing.com/profile/Christian_Grete2)