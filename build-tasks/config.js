var gulp = require("gulp")

var CONFIG = {
  paths: {
    exampleSrc: "./example",
    componentServer: "./src",
    scriptsOut: "./build/scripts",
    testData: "./test-data/front-end",
    assetsOut: "./build",
    mediaOut: "./build/cl/media",
    dist: "./dist",
  },

  watching: false,
  packed: false,

  taskLists: {
    componentLibrary: [
      "scripts:compile",
      "scripts:client-bundle",
      "styles:compile",
      "styles:copy-test-styles",
    ],
    fullBuild: [
      "scripts:compile",
      "scripts:client-bundle",
      "styles:compile",
    ]
  },

  setToBuildPaths: function() {
    CONFIG.paths.scriptsOut = './npm'
  }
}

module.exports = CONFIG
