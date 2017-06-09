[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>Bundle Loader</h1>
  <p>Bundle loader for webpack.<p>
</div>

<h2 align="center">Install</h2>

```bash
npm i bundle-loader --save
```

<h2 align="center"><a href="https://webpack.js.org/concepts/loaders">Usage</a></h2>

``` javascript
// The chunk is requested, when you require the bundle
var waitForChunk = require("bundle-loader!./file.js");

// To wait until the chunk is available (and get the exports)
//  you need to async wait for it.
waitForChunk(function(file) {
	// use file like it was required with
	// var file = require("./file.js");
});
// wraps the require in a require.ensure block

// Multiple callbacks can be added. They will be executed in the order of addition.
waitForChunk(callbackTwo);
waitForChunk(callbackThree);
// If a callback is added after dependencies were loaded, it will be called immediately.
```

The file is requested when you require the bundle loader. If you want it to request it lazy, use:

``` javascript
var load = require("bundle-loader?lazy!./file.js");

// The chunk is not requested until you call the load function
load(function(file) {

});
```
### `name` query parameter

You may set name for a bundle using the `name` query parameter.
See [documentation](https://github.com/webpack/loader-utils#interpolatename).

**Note** chunks created by the loader will be named according to the
[`output.chunkFilename`](https://webpack.js.org/configuration/output/#output-chunkfilename) rule, which defaults to `[id].[name]`.
Here `[name]` corresponds to the chunk name set in the `name` query parameter.

#### Example:

``` js
require("bundle-loader?lazy&name=my-chunk!./file.js");
require("bundle-loader?lazy&name=[name]!./file.js");
```
And the webpack configuration:
``` js
module.exports = {
   entry: { ... },
   output : {
      path : ...,
      filename : '[name].js',
      chunkFilename : '[name]-[id].js', // or whatever other format you want.
   },
}
```

Normal chunks will show up using the `filename` rule above, and be named according to their chunkname.
Chunks from `bundle-loader`, however will load using the `chunkFilename` rule, so the example files will produce `my-chunk-1.js` and `file-2.js` respectively.

You can also use `chunkFilename` to add hash values to the filename, since putting `[hash]` in the bundle query parameter does not work correctly.

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/bebraw">
          <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">
          </br>
          Juho Vepsäläinen
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">
          </br>
          Joshua Wiens
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/sapegin">
          <img width="150" height="150" src="https://github.com/sapegin.png?v=3&s=150">
          </br>
          Artem Sapegin
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Alexander Krasnoyarov
        </a>
      </td>
    </tr>
  <tbody>
</table>



[npm]: https://img.shields.io/npm/v/bundle-loader.svg
[npm-url]: https://npmjs.com/package/bundle-loader

[node]: https://img.shields.io/node/v/bundle-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/bundle-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/bundle-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/bundle-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/bundle-loader

[cover]: https://codecov.io/gh/webpack-contrib/bundle-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/bundle-loader
