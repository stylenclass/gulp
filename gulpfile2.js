	var gulp = require('gulp');
	var gutil = require('gulp-util');
	var rename = require("gulp-rename");
	var clean = require("gulp-clean");
	var runSequence = require("run-sequence");
	var usemin = require('gulp-usemin');
	var ngmin = require('gulp-ngmin');

	gulp.task('default', function(callback) {
	   runSequence('clean', 'copy', 'usemin', callback);
	});

	gulp.task('clean', function() {
	    return gulp.src(['./index2.html', 'assets/js/min']).pipe(clean());
	});

	gulp.task('copy', function() {
		return gulp.src('./index.html')
	    .pipe(rename('index2.html'))
	    .pipe(gulp.dest('./'));
	});

	gulp.task('usemin', function() {
	  return gulp.src('./index2.html')
	    .pipe(usemin({ cssmin: false, htmlmin: false, jsmin: false }))
	    .pipe(ngmin())
	    .pipe(gulp.dest('./'))
	});

	gulp.task('ngmin', function () {
    return gulp.src('assets/js/min/app.js')
        .pipe(ngmin())
        .pipe(gulp.dest('./assets/js/min/'));
	});