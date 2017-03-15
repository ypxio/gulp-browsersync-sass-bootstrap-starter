var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var fileInclude = require('gulp-file-include');

/* SASS compiling task */
gulp.task('sass-compile', function(){
  return gulp.src('./src/assets/style.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./dist/assets/'))
    .pipe(browserSync.stream())
});

/* Template compiling task */
gulp.task('template-compile', function(){
  return gulp.src('./src/**/*.html')
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: 'src/'
      })
    )
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
});

/* Default task */
gulp.task('develop', ['sass-compile', 'template-compile'], function(){
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('./src/**/*.html', ['template-compile'])
  gulp.watch('./src/**/*.sass', ['sass-compile'])
});
