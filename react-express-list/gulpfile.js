var browserSync = require('browser-sync');
var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');


gulp.task('bundle', ['copy'], function() {
  return browserify({
      entries: 'app/main.jsx',
      debug: true
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('copy', function() {
  // content
  gulp.src(['app/**/*.css'])
    .pipe(gulp.dest('./.tmp'));

  gulp.src(['bower_components/**'])
    .pipe(gulp.dest('./.tmp/bower_components'));
});


// gulp.task('server', function(cb) {
//   // We use this `called` variable to make sure the callback is only executed once
//   var called = false;
//   return nodemon({
//       script: 'server/main.js',
//       watch: ['app/**/*.*']
//     })
//     .on('start', function onStart() {
//       if (!called) {
//         cb();
//       }
//       called = true;
//     })
//     .on('restart', function onRestart() {

//       // Also reload the browsers after a slight delay
//       setTimeout(function reload() {
//         browserSync.reload({
//           stream: false
//         });
//       }, 500);
//     });
// });

// // Make sure `nodemon` is started before running `browser-sync`.
// gulp.task('serve', ['bundle', 'server'], function() {
//   var port = process.env.PORT || 7776;
//   browserSync.init({

//     // All of the following files will be watched
//     files: ['**/*.*'],

//     // Tells BrowserSync on where the express app is running
//     proxy: 'http://localhost:' + port,

//     // This port should be different from the express app port
//     port: 9001,

//     // Which browser should we launch?
//     browser: ['google chrome']
//   });
// });


gulp.task('server', function() {
    // content
    var server = new LiveServer('server/main.js');
    server.start();
});


gulp.task('serve',['bundle','server'],function(){
  browserSync.init(null,{
    proxy:'http://localhost:1212',
    port:9001
    });
});
