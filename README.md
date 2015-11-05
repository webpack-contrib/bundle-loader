# bundle loader for webpack

## What's This?

This is a loader for webpack that provides a way to loader modules async.

Yes, you can do async loading with `require.ensure` or AMD `require` function like this:

```javascript
require.ensure(['./a','./b'],function(require){/* do something with a and b */})
```

Webpack will package modules `a` and `b` into the same file, And you can not load them seperately.

When working with dynamic modules, things get worse:

```javascript
function loadPage(pageName, callback) {
  try {
    require(["./pages/" + pageName], function(page) {
      callback(null, page);
    });
  } catch(e) {
    calback(e);
  }
}
```

All modules in `./pages/` folder will be packaged into one single file! If you want to load a seperate module when in need, you need bundle-loader!

```javascript
function loadPage(pageName, callback) {
  try {
    var pageBundle = require("bundle!./pages/" + pageName)
  } catch(e) {
    return callback(e);
  }
  pageBundle(function(page) { callback(null, page); })
}
```

Now each module in `./pages/` folder becomes a individual file, and will be loaded seperately.

Enjoy & Good luck!


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
// The chunk is requested, when you require the bundle
var waitForChunk = require("bundle!./file.js");

// To wait until the chunk is available (and get the exports)
//  you need to async wait for it.
waitForChunk(function(file) {
	// use file like is was required with
	// var file = require("./file.js");
});
// wraps the require in a require.ensure block
```

The file is requested when you require the bundle loader. If you want it to request it lazy, use:

``` javascript
var load = require("bundle?lazy!./file.js");

// The chunk is not requested until you call the load function
load(function(file) {

});
```

You may set name for bundle (`name` query parameter). See [documentation](https://github.com/webpack/loader-utils#interpolatename).

``` javascript
require("bundle?lazy&name=my-chunk!./file.js");
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
