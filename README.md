# grunt-json-extend-concat

> Concatenates JSON from multiple files, extending the objects with JSON files contained in subdirectories, outputting combined JSON config files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-json-extend-concat --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-json-extend-concat');
```

## The "json_concat" task

### Overview
In your project's Gruntfile, add a section named `json_concat` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  json_concat: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.root
Type: `String`
Default value: `configs`

Where to look for the JSON files.

#### options.output
Type: `String`
Default value: `dist`

Where the concatenated, extended JSON files are stored.

### Usage Examples

```js
grunt.initConfig({
    json_concat: {
      default_options: {
        options: {
            root: 'configs',
            output: 'dist'
        }
      }
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
