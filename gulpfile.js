const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Task to compile SCSS
gulp.task('scss', function () {
    return gulp
        .src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

// Task to initialize BrowserSync and watch for changes in PHP, HTML, JS, and SCSS files
gulp.task('serve', function () {
    browserSync.init({
        proxy: 'localhost/memorific', // Change this to the correct URL of your local server
        port: 3001, // Specify the desired port for BrowserSync
        open: 'local' // Disable automatic opening of the browser
    });

    gulp.watch('./scss/**/*.scss', gulp.series('scss')); // Watch for changes in SCSS files
    gulp
        .watch(['./**/*.html', './assets/js/*.js', './scss/**/*.scss'])
        .on('change', browserSync.reload); // Watch for changes in HTML, JS, and SCSS files
});

// Default Gulp task
gulp.task('default', gulp.series('scss', 'serve'));