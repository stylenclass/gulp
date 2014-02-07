var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var clean = require('gulp-rimraf');
var usemin = require('gulp-usemin');
var ngmin = require('gulp-ngmin');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
    return gulp.src(['./index.html', 'js/min'], {read:false}).pipe(clean());
});

gulp.task('html', ['clean'], function () {
  return gulp.src('./dev.html')
    .pipe(rename('index.html'))
    .pipe(usemin({ cssmin: false, htmlmin: false, jsmin: false }))
    .pipe(context.replace(/src="js\/min\/(\w+\.js)"/g, 'src="js/min/{{$1}}"'))
    .pipe(gulp.dest('./'));
});

gulp.task('js', ['html'], function () {
  return gulp.src(['js/min/app.js', 'js/min/foo.js']) // FRAGILE: gulp-usemin creates this file
    .pipe(ngmin())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./js/min/'))
});

gulp.task('default', ['js']);