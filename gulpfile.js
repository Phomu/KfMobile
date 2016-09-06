var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watchPath = require('gulp-watch-path');
var combiner = require('stream-combiner2');
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
};

gulp.task('sass', function () {
    gulp.src('public/static/src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/static/src/css/'))
        .pipe(minifycss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.4', 'iOS >= 7']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/static/dist/css/'));
});

gulp.task('uglify', function () {
    var combined = combiner.obj([
        gulp.src('public/static/src/js/*.js'),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('public/static/dist/js/')
    ]);
    combined.on('error', handleError);
});

gulp.task('clean', function (cb) {
    return del(['public/static/src/css', 'public/static/dist'], cb);
});

gulp.task('copy', function () {
    gulp.src('public/static/src/fonts/**/*.*')
        .pipe(gulp.dest('public/static/dist/fonts/'));

    gulp.src('public/static/src/img/**/*.*')
        .pipe(gulp.dest('public/static/dist/img/'));
});

gulp.task('watch', function () {
    gulp.watch('public/static/src/sass/*.scss', ['sass']);

    gulp.watch('public/static/src/js/*.js', function (event) {
        var paths = watchPath(event, 'public/static/src/', 'public/static/dist/');

        gutil.log(gutil.colors.green(event.type) + ': ' + paths.srcPath);
        gutil.log('dist: ' + paths.distPath);

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ]);

        combined.on('error', handleError);
    });
});

gulp.task('build', function (cb) {
    runSequence('clean', ['sass', 'uglify', 'copy'], cb);
});

gulp.task('default', ['build', 'watch']);
