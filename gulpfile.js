var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var del = require('del');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var staticPath = 'public/static/';
var srcPath = staticPath + 'src/';
var distPath = staticPath + 'dist/';

var getBrowserify = function () {
    return browserify({entries: [srcPath + 'js/app.js'], debug: true})
        .transform(babelify, {presets: ['es2015', 'es2016', 'es2017']});
};

var compileScript = function (bundler) {
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Compile Script Error:\n'))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest(distPath + 'js/'))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(distPath + 'js/'));
};

gulp.task('script', function () {
    return compileScript(getBrowserify());
});

gulp.task('sass', function () {
    gulp.src(srcPath + 'sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(srcPath + 'css/'))
        .pipe(minifycss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.4', 'iOS >= 7']
        }))
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(distPath + 'css/'));
});

var bundler = watchify(getBrowserify());
gulp.task('watch', function () {
    gulp.watch(srcPath + 'sass/*.scss', ['sass']);

    bundler.on('update', function () {
        console.log('-> Compiling Script...');
        compileScript(bundler);
    });
    bundler.on('log', gutil.log);
    return compileScript(bundler);
});

gulp.task('clean', function (cb) {
    return del([srcPath + 'css/', distPath], cb);
});

gulp.task('copy', function () {
    gulp.src(srcPath + 'js/lib/*.js')
        .pipe(gulp.dest(distPath + 'js/lib/'));

    gulp.src(srcPath + 'fonts/**/*.*')
        .pipe(gulp.dest(distPath + 'fonts/'));

    gulp.src(srcPath + 'img/**/*.*')
        .pipe(gulp.dest(distPath + 'img/'));
});

gulp.task('build', function (cb) {
    runSequence('clean', ['sass', 'script', 'copy'], cb);
});

gulp.task('default', ['build', 'watch']);
