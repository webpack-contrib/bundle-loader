# bundle loader for webpack

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
require("bundle!./file.js")(function(file) {
	// use file like is was required with
	// var file = require("./file.js");
});
// wraps the require in a require.ensure block
```

The file is requested when you require the bundle loader. If you want it to request it lazy, use:

``` javascript
var load = require("bundle?lazy!.file.js")
load()   // triggers the request

```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
