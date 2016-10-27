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

// Path definition
var staticPath = 'public/static/';

var srcPath = staticPath + 'src/';
var jsSrcPath = srcPath + 'js/';
var jsLibSrcPath = jsSrcPath + 'lib/';
var sassSrcPath = srcPath + 'sass/';
var cssSrcPath = srcPath + 'css/';
var fontSrcPath = srcPath + 'fonts/';
var imgSrcPath = srcPath + 'img/';

var distPath = staticPath + 'dist/';
var jsDistPath = distPath + 'js/';
var jsLibDistPath = jsDistPath + 'lib/';
var cssDistPath = distPath + 'css/';
var fontDistPath = distPath + 'fonts/';
var imgDistPath = distPath + 'img/';

var getBrowserify = function () {
    return browserify({entries: [jsSrcPath + 'app.js'], debug: true})
        .transform(babelify, {presets: ['es2015', 'es2016', 'es2017']});
};

var compileScript = function (bundler) {
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Compile Script Error:\n'))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest(jsDistPath))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDistPath));
};

gulp.task('script', function () {
    return compileScript(getBrowserify());
});

gulp.task('sass', function () {
    gulp.src(sassSrcPath + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssSrcPath))
        .pipe(minifycss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.4', 'iOS >= 7']
        }))
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssDistPath));
});

var bundler = watchify(getBrowserify());
gulp.task('watch', function () {
    gulp.watch(sassSrcPath + '*.scss', ['sass']);

    bundler.on('update', function () {
        console.log('-> Compiling Script...');
        compileScript(bundler);
    });
    bundler.on('log', gutil.log);
    return compileScript(bundler);
});

gulp.task('clean', function (cb) {
    return del([cssSrcPath, distPath], cb);
});

gulp.task('copy', function () {
    gulp.src(jsLibSrcPath + '*.js')
        .pipe(gulp.dest(jsLibDistPath));

    gulp.src(fontSrcPath + '**/*.*')
        .pipe(gulp.dest(fontDistPath));

    gulp.src(imgSrcPath + '**/*.*')
        .pipe(gulp.dest(imgDistPath));
});

gulp.task('build', function (cb) {
    runSequence('clean', ['sass', 'script', 'copy'], cb);
});

gulp.task('default', ['build', 'watch']);
