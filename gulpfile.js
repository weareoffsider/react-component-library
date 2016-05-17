var gulp = require("gulp"),
    tar = require("gulp-tar"),
    gzip = require("gulp-gzip"),
    using = require("gulp-using"),
    growl = require("growl"),
    cached = require("gulp-cached"),
    wait = require("gulp-wait"),
    debounce = require("debounce"),
    chokidar = require("chokidar"),
    del = require("del"),
    staticMount = require("serve-static"),
    connect = require("gulp-connect")

var CONFIG = require("./build-tasks/config.js")

Object.assign = Object.assign || require("object.assign")

require("./build-tasks/scripts.js")
require("./build-tasks/styles.js")

var runTasks = function(tasks) {
  return debounce(function(e, p) { gulp.start(tasks) }, 500)
}

var flushCache = function() {
  Object.keys(require.cache).filter(function (cachePath) {
    return (
      cachePath.indexOf("/build/scripts/front-end") != -1 ||
      cachePath.indexOf("/test-data/") != -1
    )
  }).forEach(function (cachePath) {
    require.cache[cachePath] = null
  })
}

growl("Gulp Started")

gulp.task("clean", function() {
  return del([
    CONFIG.paths.assetsOut + '/**/*',
  ]);
})

gulp.task("dev", ["clean"], function() {
  CONFIG.watching = true
  gulp.start(CONFIG.taskLists.componentLibrary)

  chokidar.watch(CONFIG.paths.exampleSrc + "/**/*.less")
          .on("all", runTasks(["styles:compile", "styles:dependency-check"]))
  chokidar.watch(CONFIG.paths.componentServer + "/**/*.less")
          .on("all", runTasks(["styles:compile", "styles:dependency-check"]))
  chokidar.watch(CONFIG.paths.exampleSrc + "/**/*.js")
          .on("all", runTasks(["scripts:compile"]))
  chokidar.watch(CONFIG.paths.componentServer + "/**/*.js")
          .on("all", runTasks(["scripts:compile"]))
  chokidar.watch(CONFIG.paths.scriptsOut + "/**/*.js")
          .on("all", runTasks(["scripts:client-bundle"]))
})

gulp.task("default", function() {
  gulp.start("dev")
})

gulp.task("build", function() {
  CONFIG.packed = true
  CONFIG.setToBuildPaths()
  return gulp.start(CONFIG.taskLists.fullBuild)
})
