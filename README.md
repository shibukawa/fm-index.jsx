fm-index.jsx
===========================================

Synopsis
---------------

FM-index is the fastest full text search algorithm using a compressed index file. This is FM-index for JSX/JS/AMD/Common.js.

Motivation
---------------

FM-index is the alternate search algorithm of an inverse index algorithm. FM-index has the following advantages:

1. It doesn't need to split word (like N-gram). It is good for CJK languages.
2. It can recreate original document from the index file
3. Index file is compressed.
4. Easy to control the performance and the index file size.

Code Example
---------------

### Use from JSX

```js
import "fm-index.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var fm = new FMIndex();
        fm.push("hello");
        fm.push("world");
        this.fm.build(5);
        console.log(this.fm.search('world')); // -> [5]
    }
}
```

### Use from node.js

```js
var FMIndex = require('fm-index.common.js').FMIndex;
```

### Use from require.js

```js
// use fm-index.amd.js
define(['fm-index.amd.jsx'], function (fmindex) {

    var fmindex = fmindex.FMIndex();
    // Write simple usage here!
});
```

### Use via standard JSX function

```html
<script src="fm-index.js" type="text/javascript"></script>
<script type="text/javascript">
window.onload = function () {
    var FMIndex = JSX.require("lib/fm-index.js").FMIndex;
});
</script>
```

### Use via global variables

```html
<script src="fm-index.global.js" type="text/javascript"></script>
<script type="text/javascript">
window.onload = function () {
    var fmindex = new FMIndex();
});
</script>
```

Installation
---------------

```sh
$ npm install fm-index.jsx
```

You should add the following modules to `package.json` if you want to use from JSX:

* burrows-wheeler-transform.jsx (0.3.x)
* wavelet-matrix.jsx (0.3.x)
* binary-io.jsx (0.3.x)
* bit-vector.jsx (0.4.x)
* binary-support.jsx (0.2.x)

If you want to use this library from other JSX project, install like the following:

```sh
$ npm install fm-index.jsx --save-dev
```

or add like these lines to your parent project's `package.json`:

```js
   devDependencies: {
       "fm-index.jsx": "~0.3.0"
   },
   peerDepenencies: {
       "fm-index.jsx": "~0.3.0"
   }
```

And add `node_modules/fm-index.jsx/src` as a search path.
You should add to `peerDepenencies` if your product is library.

API Reference
------------------

### class FMIndex()

Constructor.

### FMIndex.push(str : string) : void

Append string.

### FMIndex.contentSize()

Return total length of pushed string. It is available before `build()`.

### FMIndex.build(ddic : int, maxChar : int = 65535) : void

Build search index. `ddic` is a cache density. `(1 / ddic) * 100` % is a actual cache rate.
If ddic == 1, densty = 100%, it provides maximum speed but it use match memory and storage.
Initial recommendation value is 50.

`maxChar` is a maximum character code. If you reduce this, you can save memory.

### FMIndex.size()

Return contetn size. It is available after `build()`.

### FMIndex.search(keyword : string) : int[]

Return position list that includes `keyword`.

### FMIndex.getSubstring(pos : int, len : int) : string

Return original document content.

### FMIndex.dump(output : BinaryOutput) : void

Export bit-vector.

### FMIndex.load(input : BinaryInput) : void

Import bit-vector.

Development
-------------

## JSX

Don't be afraid [JSX](http://jsx.github.io)! If you have an experience of JavaScript, you can learn JSX
quickly.

* Static type system and unified class syntax.
* All variables and methods belong to class.
* JSX includes optimizer. You don't have to write tricky unreadalbe code for speed.
* You can use almost all JavaScript API as you know. Some functions become static class functions. See [reference](http://jsx.github.io/doc/stdlibref.html).

## Setup

To create development environment, call following command:

```sh
$ npm install
```

## Repository

* Repository: git://github.com/shibukawa/fm-index.jsx.git
* Issues: https://github.com/shibukawa/fm-index.jsx/issues

## Run Test

```sh
$ grunt test
```

## Build

```sh
$ grunt build
```

## Generate API reference

```sh
$ grunt doc
```

Author
---------

* shibukawa / yoshiki@shibu.jp

License
------------

MIT

Complete license is written in `LICENSE.md`.
