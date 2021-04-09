# Holosun

[![Release Version](https://img.shields.io/npm/v/holosun.svg)](https://www.npmjs.com/package/holosun)
[![License](https://img.shields.io/badge/License-Apache%202-blue.svg)](https://github.com/roydukkey/holosun/blob/master/LICENSE)

An events API with delegation and type declarations. Holosun is built to remain completely interoperable with the native events API.

## Usage

The distribution provided at `./dist/holosun.umd.js` can be used directly in the browser, with the API begin namespaced as a `holosun` global variable.

Or, use the package like any other node package:

```js
// ES6 module syntax
import * as holosun from 'holosun';
import { on, off } from 'holosun';

// CommonJS syntax
const holosun = require('holosun');
const { on, off } = require('holosun');
```

Alteratively, importing TypeScript directly will allow transpiled code to be optimize, including only the required portions of Holosun.

```js
import { on, off } from 'holosun/typescript';
```

Note: this package includes a proper [ECMAScript module](#ECMAScript-Modules).

## API Summary

| function | description |
| --- | --- |
| [`holosun.on()`](#HolosunOn) | Attach an event listener that will be called whenever a specified event type is delivered to the given target. |
| [`holosun.one()`](#HolosunOne) | Attach an event listener that will be called once whenever each of the specified event types are delivered to the given target. |
| [`holosun.any()`](#HolosunAny) | Attach an event listener that will be called once whenever any of the specified event types are delivered to the given target. |
| [`holosun.off()`](#HolosunOff) | Detach event listeners of the specified event types from the given target. |
| [`holosun.trigger()`](#HolosunTrigger) | Executes all listeners attached to the given target for the specified event types. |

## API

### holosun.on()

#### `on (target, types, listener[, useCapture | options])`
Attach an event listener that will be called whenever a specified event type is delivered to the given target.

#### `on (node, selector, types, listener[, useCapture | options])`
Attach an event listener that will be called whenever a specified event type is delivered to the given node from specific descendants.

##### Parameters
| parameter | type | description |
| --- | --- | --- |
| `target` | [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) | The target on which the event listener is attached. |
| `node` | [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) | The node on which the event listener is attached. |
| `selector` | `string` | A selector string to filter the descendants of the given node that trigger the event. |
| `types` | `string` | A case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events)s to listen for. |
| `listener` | [`EventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) \|<br>[`EventListenerObject`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) \|<br>`null` | The object that receives a notification (an object that implements the [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) interface) when an event of a specified type occurs. This must be an object implementing the EventListener interface, or a function. |
| `useCapture` | `boolean` | Whether or not events of these types will be dispatched to the registered listener before being dispatched to any target beneath it in the DOM tree. |
| `options` | `AddEventListenerOptions` | An [options object](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters) specifying characteristics about the event listener. |

##### Returns
The provided listener when successfully attached; otherwise, `undefined`.

### holosun.one()

#### `one (target, types, listener[, useCapture | options])`
Attach an event listener that will be called once whenever each of the specified event types are delivered to the given target.

#### `one (node, selector, types, listener[, useCapture | options])`
Attach an event listener that will be called once whenever each of the specified event types are delivered to the given node from specific descendants.

##### Parameters & Returns
Same as [`holosun.on()`](#HolosunOn).

### holosun.any()

#### `any (target, types, listener[, useCapture | options])`
Attach an event listener that will be called once whenever any of the specified event types are delivered to the given target.

#### `any (node, selector, types, listener[, useCapture | options])`
Attach an event listener that will be called once whenever any of the specified event types are delivered to the given node from specific descendants.

##### Parameters & Returns
Same as [`holosun.on()`](#HolosunOn).

### holosun.off()

#### `off (target, types)`
Detach all event listeners of the specified event types from the given target.

#### `off (target, types, listener[, useCapture | options])`
Detach an event listener of the specified event types from the given target.

#### `off (node, selector, types)`
Detach all event listeners of the specified event types from the given node for the specified selector.

#### `off (node, selector, types, listener[, useCapture | options])`
Detach an event listener of the specified event types from the given node for the specified selector.

##### Parameters
| parameter | type | description |
| --- | --- | --- |
| `target` | [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) | The target from which the event listener is detached. |
| `node` | [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) | The node from which the event listener is detached. |
| `selector` | `string` | A selector which should match the one used when attaching event listeners. |
| `types` | `string` | A case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events)s to detach. |
| `listener` | [`EventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) \|<br>[`EventListenerObject`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) \|<br>`null` | The event listener to detach from the event target. |
| `useCapture` | `boolean` | Whether or not the EventListener to be detached is registered as a capturing listener. |
| `options` | `EventListenerOptions` | An [options object](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#parameters) specifying characteristics about the event listener. |

##### Returns
`true` when successfully detached at least one listener; otherwise, `false`.

### holosun.trigger()

#### `trigger (target, types[, options])`
Executes all listeners attached to the given target for the specified event types.

##### Parameters
| parameter | type | description |
| --- | --- | --- |
| `target` | [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) | The target on which the specified events are executed. |
| `types` | `string` | A case-sensitive string representing the [event type](https://developer.mozilla.org/en-US/docs/Web/Events)s to execute. |
| `options` | `EventInit` | An [options object](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#values) specifying characteristics about the triggered event. |

##### Returns
A list of tuples, where the first value is the event type and the second is `true`; unless the event is cancelable and at least one of the event listeners, which received the event, called [`Event.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault), the second value is `false`.

## ECMAScript Modules

This library comes with [ECMAScript Modules](https://www.ecma-international.org/ecma-262/6.0/#sec-modules) (ESM) support for Node.js versions that support it as well as bundlers like [rollup.js](https://rollupjs.org/guide/en/#tree-shaking) and [webpack](https://webpack.js.org/guides/tree-shaking/) (targeting both, Node.js and browser environments).

## CDN Builds

### ECMAScript Modules
To load this module directly into modern browsers that [support loading ECMAScript Modules](https://caniuse.com/#feat=es6-module) you can make use of [jspm](https://jspm.org/):

```html
<script type="module">
  import { on } from 'https://jspm.dev/holosun';
  on(document, 'click', () => {
    window.location.href = 'https://youtu.be/950sXulKXGs?t=10';
  });
</script>
```

### UMD
To load this module directly into older browsers you can use the [UMD (Universal Module Definition)](https://github.com/umdjs/umd) builds from any of the following CDNs.

These CDNs all provide the entire API as a `holosun` global variable:

```html
<script>
  holosun.on(document, 'click', () => {
    window.location.href = 'https://youtu.be/950sXulKXGs?t=10';
  });
</script>
```

#### Using [UNPKG](https://unpkg.com/browse/holosun/dist/)
```html
<script src="https://unpkg.com/holosun@latest/dist/holosun.umd.js"></script>
```

#### Using [jsDelivr](https://cdn.jsdelivr.net/npm/holosun@latest/dist/)
```html
<script src="https://cdn.jsdelivr.net/npm/holosun@latest/dist/holosun.umd.js"></script>
```
