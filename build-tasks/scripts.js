var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    reactJadeTransformer = require('react-jade-transformer'),
    browserify = require('browserify'),
    envify = require('envify/custom'),
    using = require('gulp-using'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    babel = require('gulp-babel'),
    changed = require('gulp-changed'),
    gutil = require('gulp-util'),
    webpack = require('webpack-stream'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    merge = require('merge-stream'),
    connect = require('gulp-connect')

var CONFIG = require('./config.js')
var dispatchErrors = require('./errors.js').dispatchErrors
var defaultPlumber = require('./errors.js').defaultPlumber

// look at this hacky shit :) it works though for importing svg as string
require.extensions['.svg'] = function(module, filename) {
  var raw = fs.readFileSync(filename, 'utf8')
  var proper = 'module.exports = "' + raw.replace(/\n/g, "").replace(/"/g, '\\"') + '";'
  return module._compile(proper, filename)
}

gulp.task('scripts:compile', function() {
  var stream = gulp.src([
    CONFIG.paths.exampleSrc + '/**/*.js',
    CONFIG.paths.componentServer + '/**/*.js',
  ], { base: './' })
    .pipe(defaultPlumber())
    .pipe(changed(CONFIG.paths.scriptsOut))
    .pipe(reactJadeTransformer.gulp())
    .pipe(babel({'presets': ['es2015', 'stage-1']}))
    .on('error', dispatchErrors('babel', true))
    .pipe(gulp.dest(CONFIG.paths.scriptsOut))
    .pipe(using({prefix: 'ES5 ->'}))

  var svgs = gulp.src([
    CONFIG.paths.exampleSrc + '/**/*.{svg,less,html,md}',
  ], { base: './' })
    .pipe(defaultPlumber())
    .pipe(changed(CONFIG.paths.scriptsOut))
    .pipe(gulp.dest(CONFIG.paths.scriptsOut))
    .pipe(using({prefix: 'SVG ->'}))

  return merge(stream, svgs)
})


gulp.task('scripts:client-bundle', ['scripts:compile'], function() {
  var stream = gulp.src([
    CONFIG.paths.scriptsOut + '/src/client.js',
  ], { base: './' })
    .pipe(defaultPlumber())
    .pipe(webpack())
    .pipe(rename('client-bundle.js'))
    .pipe(gulp.dest(CONFIG.paths.scriptsOut + '/src'))
    .pipe(using({prefix: 'CLIENT_BUNDLE ->'}))

  return stream;
})
