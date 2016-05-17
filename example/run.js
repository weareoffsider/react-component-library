import ComponentServer from './../src/main.js'
var React = require('react')
var ReactDOM = require('react-dom/server')
var express = require('express')
var fs = require('fs')

// look at this hacky shit :) it works though for importing svg as string
require.extensions['.svg'] = function(module, filename) {
  var raw = fs.readFileSync(filename, 'utf8')
  var proper = 'module.exports = "' + raw.replace(/\n/g, "").replace(/"/g, '\\"') + '";'
  return module._compile(proper, filename)
}

const server = ComponentServer({
  matcher: "**/*.react.js",
  basedir: __dirname + "/ui",
  extraHead: [
  ],
  scripts: [
  ],
  styles: [
  ],
  getTestData: (component, path) => {
    const dataPath = path.replace(".react.js", ".data.js")
    try {
      const testData = require(dataPath)
      return testData
    } catch (e) {
      return {default: {}}
    }
  },
  wrapComponent: (component, props) => {
    return React.createElement(component, props || {});
  },
})

const ASSET_PATH = __dirname + "/../../../build/assets/"
server.configApp((app) => {
  app.use('/assets', express.static(ASSET_PATH))
})

console.log("Running Component Server, port 3600")

server.listen(3600)
