const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin-changba');
const htmlmin = require('gulp-htmlmin');
const jsObfuscator = require('gulp-javascript-obfuscator');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpackStream = require('webpack-stream');
const babel = require('gulp-babel');

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: './'
            // baseDir: 'dist'
        },
        notify: false,
        host: 'localhost',
        open: 'external',
        port: 3000,
        logPrefix: 'server'
    });

    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/scss/**/*.+(scss|sass)').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('src/img/**/*').on('change', browserSync.reload);
});

const plumberNotify = title => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%= error.message %>',
            sound: false
        })
    };
};

gulp.task('styles', function () {
    return gulp
        .src('src/scss/**/*.+(scss|sass)')
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(
            rename({
                suffix: '.min',
                prefix: ''
            })
        )
        .pipe(autoprefixer())
        .pipe(
            cleanCSS({
                compatibility: 'ie8'
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
    gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
    gulp.watch('src/img/**/*').on('change', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp
        .src('src/*.html')
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                minifyCSS: true,
                removeComments: true
            })
        )
        .pipe(gulp.dest('./'));
    // .pipe(gulp.dest('dist'))
});

gulp.task('scripts', function () {
    return gulp
        .src('src/js/**/*.js')
        .pipe(plumber(plumberNotify('JS')))
        .pipe(babel())
        .pipe(
            webpackStream({
                mode: 'production',
                entry: {
                    index: './src/js/script.js'
                },
                output: {
                    filename: 'script.js'
                },
                module: {
                    rules: [
                        {
                            test: /\.css$/,
                            use: ['style-loader', 'css-loader']
                        }
                    ]
                }
            })
        )
        .pipe(
            jsObfuscator({
                compact: true
            })
        )
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function () {
    return gulp
        .src('src/img/**/*')
        .pipe(
            imagemin(
                [
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.mozjpeg({ quality: 80, progressive: true }),
                    imagemin.optipng({ optimizationLevel: 4 }),
                    imagemin.svgo({
                        plugins: [
                            { removeViewBox: true },
                            { cleanupIDs: false },
                            {
                                addAttributesToSVGElement: {
                                    attributes: [{ preserveAspectRatio: 'none' }]
                                }
                            }
                        ]
                    })
                ],
                {
                    verbose: true
                }
            )
        )
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'html', 'images'));
