'use strict'

// gulp modules
var gulp       = require('gulp')
var changed    = require('gulp-changed')
var concat     = require('gulp-concat')
var connect    = require('gulp-connect')
var uglify     = require('gulp-uglify')
var gutil      = require('gulp-util')
var sourcemaps = require('gulp-sourcemaps')
var istanbul   = require('gulp-istanbul')
var mocha      = require('gulp-mocha')
var clean      = require('gulp-clean')
var plumber    = require('gulp-plumber')

// browserify specific modules
var watchify   = require('watchify')
var browserify = require('browserify')
var source     = require('vinyl-source-stream')
var buffer     = require('vinyl-buffer')
var assign     = require('lodash.assign')

gulp.task('base', ['html', 'css', 'fonts', 'images'])
gulp.task('build', ['base', 'browserify'])
gulp.task('dev', ['base', 'watchify', 'connect', 'watch'])

gulp.task('html', function() {
  gulp.src('./html/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
})

gulp.task('css', function() {
  gulp.src(['./node_modules/normalize.css/normalize.css', './css/main.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload())
})

gulp.task('fonts', function() {
  gulp.src(['./fonts/*'])
    .pipe(changed('./dist/img'))
    .pipe(gulp.dest('./dist/fonts'))
})

gulp.task('images', function() {
  gulp.src('./assets/images/*')
    .pipe(changed('./dist/img'))
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
  })
})

gulp.task('watch', function() {
  gulp.watch('./html/index.html', ['html'])
  gulp.watch('./css/**/*.css', ['css'])
})

// ### browserify

var customOpts = {
  entries: ['./client/src/main.js'],
  debug: true,
}
var opts = assign({}, watchify.args, customOpts)
var b = browserify(opts)
var w = watchify(b)

var bundle = function() {
  return w.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload())
}

gulp.task('watchify', bundle)
w.on('update', bundle)
w.on('log', gutil.log)

gulp.task('browserify', function() {
  var b = browserify({
    entries: ['./client/src/main.js'],
  })

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
        .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('mocha', function() {
  gulp.src(['client/**/*.test.js'])
    .pipe(mocha({
      reporter: 'min',
      require: 'mocha-clean/brief',
      istanbul: true,
    }))
})

gulp.task('TDD', function() {
  gulp.watch(['client/**'], ['test'])
})

gulp.task('test', function(cb) {
  gulp.src([
      'client/**/*.js',
      '!client/**/*.test.js',
      '!client/setup/*',
    ])
    .pipe(istanbul({
      // includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['client/**/*.test.js'], {read: false})
        .pipe(plumber())
        .pipe(mocha({
          reporter: 'min',
          globals: {
            env: require('./client/setup/test-env'),
          },
        }))

        // .on('error', gutil.log)
        .pipe(istanbul.writeReports({
          reporters: ['html', 'text-summary'],
        }))

        .pipe(istanbul.enforceThresholds({thresholds: {global: 90}}))
        .on('end', cb)
    })
})

gulp.task('clean', function() {
  return gulp.src('coverage', {read: false})
    .pipe(clean())
})
