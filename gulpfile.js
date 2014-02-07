var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var clean = require('gulp-rimraf');
var usemin = require('gulp-usemin');
var ngmin = require('gulp-ngmin');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
    return gulp.src(['./index.html', 'assets/js/min'], {read:false}).pipe(clean());
});

gulp.task('html', ['clean'], function () {
  return gulp.src('./dev.html')
    .pipe(rename('index.html'))
    .pipe(usemin({ cssmin: false, htmlmin: false, jsmin: false }))
    .pipe(context.replace(/src="assets\/js\/min\/(\w+\.js)"/g, 'src="assets/js/min/{{$1}}"'))
    .pipe(gulp.dest('./'));
});

gulp.task('js', ['html'], function () {
  return gulp.src(['assets/js/min/app.js', 'assets/js/min/foo.js']) // FRAGILE: gulp-usemin creates this file
    .pipe(ngmin())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./assets/js/min/'))
});

gulp.task('default', ['js']);