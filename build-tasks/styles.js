var gulp = require("gulp"),
    reactJadeTransformer = require("react-jade-transformer"),
    browserify = require("browserify"),
    envify = require("envify/custom"),
    less = require("gulp-less"),
    sourcemaps = require("gulp-sourcemaps"),
    toolkit = require("toolkit-less-css"),
    pleeease = require("gulp-pleeease"),
    postcss = require("gulp-postcss"),
    less_plugin_glob = require("less-plugin-glob"),
    using = require("gulp-using"),
    connect = require("gulp-connect")

// postcss plugins:
var autoprefixer = require('autoprefixer')
var bemc_linter = require("bemc-linter")

var CONFIG = require("./config.js")
var dispatchErrors = require("./errors.js").dispatchErrors
var defaultPlumber = require("./errors.js").defaultPlumber

var less_config = {
  strictMath: true,
  plugins: [toolkit, less_plugin_glob]
}

gulp.task("styles:compile", function() {
  return gulp.src([
    CONFIG.paths.componentServer + "/main.less",
  ]).pipe(defaultPlumber())
    .pipe(less(less_config))
    .on("error", dispatchErrors("less", true))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(gulp.dest(CONFIG.paths.scriptsOut + "/src"))
    .pipe(using())
})

gulp.task("styles:dependency-check", function() {
  return gulp.src([
    CONFIG.paths.componentServer + "/ui/**/*.less",
  ]).pipe(defaultPlumber())
    .pipe(less(less_config))
    .on("error", dispatchErrors("less", true))
    .pipe(using({prefix:'Less Dependencies Check ->', color:'blue'}))
})

gulp.task("styles:lint", function() {
  return gulp.src([
    CONFIG.paths.exampleSrc + "/app.less",
    CONFIG.paths.componentServer + "/main.less",
  ]).pipe(defaultPlumber())
    .pipe(less(less_config))
    .on("error", dispatchErrors("less", true))
    .pipe(postcss([bemc_linter]))
    .pipe(using({prefix:'Lint ->', color:'green'}))
})
