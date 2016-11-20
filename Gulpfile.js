'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    var paths = ['./SimpleDemo/assets/*.scss'];
    return gulp.src(paths, { base: "./" })
        .pipe(sass.sync({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./'))
});
 
gulp.task('sass:watch', function () {
    gulp.watch('./SimpleDemo/assets/*.scss', ['sass']);
});

gulp.task('default', ['sass'], function () {
});
