'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build', ['html', 'css', 'images']);
gulp.task('dev', ['build', 'watch']);

gulp.task('html', function() {
  gulp.src('./html/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('css', function() {
  gulp.src(['./node_modules/normalize.css/normalize.css', './css/main.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('images', function() {
  gulp.src('./assets/images/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('watch', function() {
  gulp.watch('./html/index.html', ['html']);
  gulp.watch('./css/**/*.css', ['css']);
});
