var browserSync = require('browser-sync');
var gulp = require('gulp');
var LiveServer = require('gulp-live-server');

var nodemon = require('gulp-nodemon');

gulp.task('server', function(cb) {
  // We use this `called` variable to make sure the callback is only executed once
  var called = false;
  return nodemon({
      script: 'server/main.js',
      watch: ['app/**/*.*']
    })
    .on('start', function onStart() {
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {

      // Also reload the browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, 500);
    });
});


// Make sure `nodemon` is started before running `browser-sync`.
gulp.task('serve', ['server'], function() {
  var port = process.env.PORT || 7777;
  browserSync.init({

    // All of the following files will be watched
    files: ['**/*.*'],

    // Tells BrowserSync on where the express app is running
    proxy: 'http://localhost:' + port,

    // This port should be different from the express app port
    port: 9001,

    // Which browser should we launch?
    browser: ['google chrome']
  });
});

