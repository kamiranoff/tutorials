// gulpfile.js
var gulp = require('gulp');
var server = require('gulp-express');
var serverfile = 'server/server.js';
var client = 'client';
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('jshint', function() {
  return gulp.src(['client/**/*.js', 'server/**/*.js', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('server', function() {
  // Start the server at the beginning of the task
  server.run([serverfile]);

  // Restart the server when file changes
  gulp.watch([client + '/**/*.jade',client + '/**/*.html'], server.notify);
  gulp.watch([client + '/styles/**/*.scss'], ['sass']);
  gulp.watch([client + '/scripts/**/*.js'], ['jshint']);
  //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]);
  //Event object won't pass down to gulp.watch's callback if there's more than one of them.
  //So the correct way to use server.notify is as following:
  gulp.watch(['{.tmp,' + client + '}/styles/**/*.css'], function(event) {
    gulp.run('sass');
    server.notify(event);
    //pipe support is added for server.notify since v0.1.5,
    //see https://github.com/gimm/gulp-express#servernotifyevent

  });
  gulp.watch([client + '/images/**/*'], server.notify);
  gulp.watch([serverfile, 'server/**/*.js'], [server.run]);
});
