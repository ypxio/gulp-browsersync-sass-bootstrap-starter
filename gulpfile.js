var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var fileInclude = require('gulp-file-include');

gulp.task('sass-compile', function(){
  return gulp.src('./src/assets/style.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./dist/assets/'))
    .pipe(browserSync.stream())
});

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

gulp.task('develop', ['sass-compile', 'template-compile'], function(){
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('./src/**/*.html', ['template-compile'])
  gulp.watch('./src/**/*.sass', ['sass-compile'])
});
