var gulp    		= require('gulp'),
		gutil       = require('gulp-util'),
		rename      = require('gulp-rename'),
		clean       = require('gulp-clean'),
		usemin      = require('gulp-usemin'),
		ngmin       = require('gulp-ngmin'),
		rev 				= require('gulp-rev'),
		uglify 			= require('gulp-uglify');


try {
  process.chdir(gutil.env.cwd);
  console.info('Processing %s', gutil.env.cwd);
} catch (err) {
  	console.info('You are processing root')
}

gulp.task('default', ['clean'], function() {
	gulp.start('scripts');
});

gulp.task('clean', function() {
	return gulp.src(['**/index.html', '!/.git/**', '!/node_modules', '!/js', '!/assets']).pipe(clean());
});

gulp.task('copy', function() {
	return gulp.src(['**/dev.html', '!/.git/**', '!/node_modules', '!/js', '!/assets'])
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./'));
});

gulp.task('usemin', ['copy'], function() {
	return gulp.src('index.html')
		.pipe(usemin({ cssmin: false, htmlmin: false, jsmin: false }))
		.pipe(gulp.dest('./'))
});

gulp.task('ngmin', ['usemin'], function(){
	return gulp.src('js/min/app.js')
		.pipe(ngmin())
		.pipe(gulp.dest('js/min/'))
})

gulp.task('scripts', ['ngmin'], function () {
	var context = rev.Context();
	return gulp.src('js/min/*.js')
		.pipe(uglify())
		.pipe(rev(context))
		.pipe(gulp.dest('js/min/')),
			 gulp.src('index.html')
				.pipe(context.replace(/src="js\/min\/(\w+\.js)"/g, 'src="js/min/{{$1}}"'))
				.pipe(gulp.dest('./'));
});