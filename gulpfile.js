var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
        browserify({
        entries: ['./src/js/main.js'],
        transform: [reactify]
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('copy', function() {
     gulp.src('./src/index.html')
        .pipe(gulp.dest('dist'));

    gulp.src('./node_modules/socket.io/')
        .pipe(gulp.dest('dist'));
	
    gulp.src('./src/css/style.css')
        .pipe(gulp.dest('dist'));

    gulp.src('./node_modules/basscss/css/basscss.css')
	.pipe(gulp.dest('dist'));

    gulp.src('./src/js/img/Tree.png')
	.pipe(gulp.dest('dist'));

    gulp.src('./src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', ['browserify', 'copy']);
gulp.task('watch', ['browserify', 'copy'], function() {
    return gulp.watch('src/**/*.*', ['browserify', 'copy'])
});
