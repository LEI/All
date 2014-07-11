var gulp = require('gulp')
  , g = require('gulp-load-plugins')()
  , es = require('event-stream');

gulp.task('clean', function() {

	return gulp.src(['dist/*.(html|js|css)'],{'read': false})
		.pipe(g.clean());

});

gulp.task('assets', function() {
    return es.concat(
        gulp.src('src/lib/**/*.js')
            .pipe(gulp.dest('dist/lib')),
        gulp.src('src/img/**')
            .pipe(gulp.dest('dist/img'))
    );
});

gulp.task('lint', function() {

	return gulp.src('src/scripts/**/*.js')
		.pipe(g.changed('dist'))
		.pipe(g.jshint())
		.pipe(g.jshint.reporter('default'))
		.pipe(gulp.dest('dist'));

});

gulp.task('sass', function() {

	return gulp.src('src/styles/**/*.scss')
		.pipe(g.changed('dist'))
		.pipe(g.sass())
		.pipe(gulp.dest('dist'));

});

gulp.task('jade', function() {

    return gulp.src('src/jade/*.jade')
        .pipe(g.jade({'pretty':true}))
        .pipe(gulp.dest('dist'));

});

gulp.task('watch', function () {

	gulp.watch('src/scripts/**/*.js', ['lint']);
	gulp.watch('src/styles/**/*.scss', ['sass']);
	gulp.watch('src/jade/*.jade', ['jade']);

});
 
gulp.task('default', function() {

	gulp.start('clean', 'assets', 'lint', 'sass', 'jade', 'watch');
	g.livereload.listen();
	gulp.watch('dist/**').on('change', g.livereload.changed);

});