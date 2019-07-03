Directory for mocks data. Used in blocks, pages and components.

Usage example:

find code block in webpack.config.js and require data file in variable.
```js
{
    loader: 'pug-html-loader',
    query: {
      data: {
        linkslist: links,
        header: require('./src/data/header.json'),
      },
      pretty: true
    }
}
```
Use header variable in .pug template
```pug
```
