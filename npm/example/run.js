'use strict';

var _main = require('./../src/main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom/server');
var express = require('express');
var fs = require('fs');

// look at this hacky shit :) it works though for importing svg as string
require.extensions['.svg'] = function (module, filename) {
  var raw = fs.readFileSync(filename, 'utf8');
  var proper = 'module.exports = "' + raw.replace(/\n/g, "").replace(/"/g, '\\"') + '";';
  return module._compile(proper, filename);
};

var server = (0, _main2.default)({
  matcher: "**/*.react.js",
  basedir: __dirname + "/ui",
  extraHead: [],
  scripts: [],
  styles: [],
  getTestData: function getTestData(component, path) {
    var dataPath = path.replace(".react.js", ".data.js");
    try {
      var testData = require(dataPath);
      return testData;
    } catch (e) {
      return { default: {} };
    }
  },
  wrapComponent: function wrapComponent(component, props) {
    return React.createElement(component, props || {});
  }
});

var ASSET_PATH = __dirname + "/../../../build/assets/";
server.configApp(function (app) {
  app.use('/assets', express.static(ASSET_PATH));
});

console.log("Running Component Server, port 3600");

server.listen(3600);