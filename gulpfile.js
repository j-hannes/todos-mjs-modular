'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var changed = require('gulp-changed');
var connect = require('gulp-connect');

gulp.task('build', ['html', 'css', 'images']);
gulp.task('dev', ['build', 'connect', 'watch']);

// ### build

gulp.task('html', function() {
  gulp.src('./html/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(['./node_modules/normalize.css/normalize.css', './css/main.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src('./assets/images/*')
    .pipe(changed('./dist/img'))
    .pipe(gulp.dest('./dist/img'));
});

// ### dev

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
  });
});

gulp.task('watch', function() {
  gulp.watch('./html/index.html', ['html']);
  gulp.watch('./css/**/*.css', ['css']);
});
