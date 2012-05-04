# bundle loader for webpack

## Usage

``` javascript
require("bundle!./file.js")(function(file) {
	// use file like is was required with
	// var file = require("./file.js");
});
// wraps the require in a requre.ensure block
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)