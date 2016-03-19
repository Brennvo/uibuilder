'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    var paths = ['./demo/assets/*.scss'];
    return gulp.src(paths, { base: "./" })
        .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./'))
});
 
gulp.task('sass:watch', function () {
    gulp.watch('./demo/assets/*.scss', ['sass']);
});

gulp.task('default', ['sass'], function () {
});
