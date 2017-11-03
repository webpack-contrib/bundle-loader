[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>Bundle Loader</h1>
  <p>Bundle loader for webpack<p>
</div>

<h2 align="center">Install</h2>

```bash
npm i bundle-loader --save
```

<h2 align="center"><a href="https://webpack.js.org/concepts/loaders">Usage</a></h2>

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader'
      }
    ]
  }
}
```

The chunk is requested, when you require the bundle.

**file.js**
```js
import bundle from './file.bundle.js';
```

To wait until the chunk is available (and get the exports)
you need to async wait for it.

```js
bundle((file) => {
  // use the file like it was required
  const file = require('./file.js')
});
```

This wraps the `require('file.js')` in a `require.ensure` block

Multiple callbacks can be added. They will be executed in the order of addition.

```js
bundle(callbackTwo)
bundle(callbackThree)
```

If a callback is added after dependencies were loaded, it will be called immediately.

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`lazy`**|`{Boolean}`|`false`|Loads the imported bundle asynchronously|
|**`name`**|`{String}`|`[id].[name]`|Configure a custom filename for your imported bundle|

### `lazy`

The file is requested when you require the `bundle-loader`. If you want it to request it lazy, use:

**webpack.config.js**
```js
{
  loader: 'bundle-loader',
  options: {
    lazy: true
  }
}
```

```js
import bundle from './file.bundle.js'

bundle((file) => {...})
```

> ℹ️  The chunk is not requested until you call the load function

### `name`

You may set name for a bundle using the `name` options parameter.
See [documentation](https://github.com/webpack/loader-utils#interpolatename).

**webpack.config.js**
```js
{
  loader: 'bundle-loader',
  options: {
    name: '[name]'
  }
}
```

> :warning: chunks created by the loader will be named according to the
[`output.chunkFilename`](https://webpack.js.org/configuration/output/#output-chunkfilename) rule, which defaults to `[id].[name]`. Here `[name]` corresponds to the chunk name set in the `name` options parameter.

<h2 align="center">Examples</h2>

```js
import bundle from './file.bundle.js'
```

**webpack.config.js**
``` js
module.exports = {
  entry: {
   index: './App.js'
  },
  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: '[name].js',
    // or whatever other format you want
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: {
          loader: 'bundle-loader',
          options: {
            name: 'my-chunk'
          }
        }
      }
    ]
  }
}
```

Normal chunks will show up using the `filename` rule above, and be named according to their `[chunkname]`.

Chunks from `bundle-loader`, however will load using the `chunkFilename` rule, so the example files will produce `my-chunk.1.js` and `file-2.js` respectively.

You can also use `chunkFilename` to add hash values to the filename, since putting `[hash]` in the bundle options parameter does not work correctly.

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

[tests]: http://img.shields.io/travis/webpack-contrib/bundle-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/bundle-loader

[cover]: https://coveralls.io/repos/github/webpack-contrib/bundle-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack-contrib/bundle-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
