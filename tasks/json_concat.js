/*
 * grunt-json-concat
 * https://github.com/alexheyd/grunt-json-concat
 *
 * Copyright (c) 2016 Alex Heyd
 * Licensed under the MIT license.
 */

'use strict';

var fs   = require('fs');
var path = require('path');

module.exports = function(grunt) {
  var options = null;

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('json_concat', 'Concatenates JSON from multiple files, extending the objects with JSON files contained in subdirectories, outputting combined JSON config files.', extendTask);

  // recursive loop through source directories, extracting and extending
  // configs based on environment and region
  function extendTask() {
      options = this.options({
          root: './configs',
          output: './dist'
      });

      // get all files in root source dir
      var allFiles   = fs.readdirSync(options.root);
      // builds a in-memory config to be used for output
      var allConfigs = extractConfigs(allFiles);
      // outputs config files to options.output
      outputConfigs(allConfigs);
  }

  // grabs intersection of files and src arrays
  function getValidDirs(files, src) {
      return grunt.util._.intersection(files, src);
  }

  // grabs the contents of a JSON file and saves it to in-memory config
  // for later extension and output
  function extractConfigs(sourceDirectories) {
      var configs = {};

      // loops through all source directories
      sourceDirectories.forEach(function(envDir) {
          extractConfigFromFiles(envDir, configs);
      });

      return configs;
  }

  // recursively extract configs from files
  function extractConfigFromFiles(dir, data) {
      var files  = fs.readdirSync(options.root + '/' + dir);

      // dir is expected to be `env/region`
      var parts  = dir.split('/');
      var env    = parts[0];
      var region = parts[1];

      if (typeof data[env] === 'undefined') {
          data[env] = {
              base: {}
          };
      }

      files.forEach(function(file) {
          var filePath = options.root + '/' + dir + '/' + file;

          // if it's really a file, extract config
          if (!fs.statSync(filePath).isDirectory()) {
              var name = file.substring(0, file.lastIndexOf('.'));

              // if we're not looping through a region directory
              if (!region) {
                  // we store the default config under config[env].base
                  region = 'base';
              }

              if (typeof data[env][region] === 'undefined') {
                  data[env][region] = {};
              }

              data[env][region][name] = grunt.file.readJSON(filePath);
          // if it's a directory, loop through its files as well
          } else {
              extractConfigFromFiles(dir + '/' + file, data);
          }
      });
  }

  // sugar syntax
  function stringifyJSON(json) {
      return JSON.stringify(json, null, 4);
  }

  // builds path by joining the array. appends ".json" if not present
  function buildPath(pathArray, isFile) {
      isFile = (typeof isFile === 'undefined') ? false : isFile;

      pathArray.unshift('.');

      var path = pathArray.join('/');

      if (path.indexOf('.json') === -1 && isFile) {
          path += '.json';
      }

      return path;
  }

  function outputConfigs(data) {
      for (var env in data) {
          var envConfig    = data[env];
          var baseConfig   = envConfig.base;
          var regionConfig = null;

          // output base config for env
          grunt.file.write(buildPath([options.output, env], true), stringifyJSON(baseConfig));

          // find region configs
          for (var region in envConfig) {
              if (region !== 'base') {
                  // extend base config with region config
                  regionConfig = grunt.util._.merge({}, baseConfig, envConfig[region]);

                  // output region configs for env
                  var dest = buildPath([options.output, region, env], true);
                  grunt.file.write(dest, stringifyJSON(regionConfig));
              }
          }
      }
  }

};
