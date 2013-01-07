# bundle loader for webpack

## Usage

``` javascript
require("bundle!./file.js")(function(file) {
	// use file like is was required with
	// var file = require("./file.js");
});
// wraps the require in a requre.ensure block
```

The file is requested when you require the bundle loader. If you want it to request it lazy, use:

``` javascript
require("bundle?lazy!.file.js")
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
