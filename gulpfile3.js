var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();



gulp.task('scripts', function() {
  return gulp.src('assets/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('assets/js/min/'))
    .pipe(ngmin())
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/min/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});