# django-react-loader

The `django-react-loader` is a webpack loader for use with `nwb` that prepares files to be loaded into a Django project using the `django-react-components` module.

### Requirements
**Javascript**
```console
nwb
webpack-bundle-tracker
```
**Python**
```console
django-webpack-loader
django-react-components
```

## Getting Started

`django-react-loader` is designed to use `nwb` and `webpack-bundle-tracker`, so install them along with `django-react-loader`

```console
npm install --save-dev nwb webpack-bundle-tracker django-react-loader
```

Then create an `nwb.config.js` file and add `django-react-loader` to the webpack section of it. For example:

**nwb.config.js**

```js
module.exports = {
  webpack: {
    ...,
    module: {
      rules: [
        {
          loader: ['django-react-loader'],
        },
      ],
    },
  }
};
```

For more information on `nwb.config.js`, see the `nwb` documentation: 
https://github.com/insin/nwb/blob/master/docs/Configuration.md#configuration-object


## Compiling React Components

The loader will run on every entry passed to the nwb config file. For example, if you wanted to load three react components:

**src/**
```js
Comp1.js
Comp2.js
Comp3.js
```

your config file might look like this: 
```js
module.exports = {
  webpack: {
    ...,
    entry: {
      Comp1: './src/Comp1.js',
      Comp2: './src/Comp2.js',
      Comp3: './src/Comp3.js'
    },
  }
};
```

The default export of each entry point will be compiled and attached to window on load using the key of the entry point in the config file, so in out example,:
```js
window.Comp1 // The component at './src/Comp1.js'
window.Comp2 // The component at './src/Comp2.js'
window.Comp1 // The component at './src/Comp3.js'
```

The template tags from `django-react-components` will run an initialization function on the code attached to window to create the component using the props provided to the template.

### Setting up `webpack-bundle-tracker`

You will also need to specify the locations to bundle the javascript with the `webpack-bundle-tracker`. For example:
```js
var path = require('path')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  webpack: {
    ...,
    output: {
      path: path.resolve('./dist/webpack_bundles/'), // Location for compiled files
    },
    plugins: [
      new BundleTracker({filename: './webpack-stats.json'}), // Location for generated tracking file
    ],
  }
};
```

### Compilation

Compile with:
```console
nwb build --no-vendor
```

Then the static files deposited in you output file will be ready to be collected and served by Django using the `django-react-components` package: https://github.com/zagaran/django-react-components
