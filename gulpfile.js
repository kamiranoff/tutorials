// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync');


/*============================
=            JADE            =
============================*/

gulp.task('templates', function() {

  gulp.src('client/views/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dist/html/'))
    .pipe(livereload());
});


// gulp.task('jade:reload', function() {
//   gulp.src('client/views/**/*.jade').pipe(livereload());
// });

/*-----  End of JADE  ------*/



/*==============================
=            SERVER            =
==============================*/

gulp.task('serve', function(cb) {
  // We use this `called` variable to make sure the callback is only executed once
  var called = false;
  return nodemon({
    script: 'server/server.js',
    watch: ['server/**/*.*','client/views/**/*.*']
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
gulp.task('browser-sync', ['serve'], function() {
  var port = process.env.PORT || 3030;
  browserSync.init({

    // All of the following files will be watched
    files: ['client/**/*.*'],

    // Tells BrowserSync on where the express app is running
    proxy: 'http://localhost:' + port,

    // This port should be different from the express app port
    port: 4000,

    // Which browser should we launch?
    browser: ['google chrome']
  });
});

/*-----  End of SERVER  ------*/







/*===============================
=            LINTING            =
===============================*/

// Lint Task Front
gulp.task('lintFront', function() {
  return gulp.src('client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(livereload());
});

// Lint Task Back
gulp.task('lintBack', function() {
  return gulp.src('server/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(livereload());
});

/*-----  End of LINTING  ------*/







/*============================
=            SASS            =
============================*/

gulp.task('sass', function() {
  return gulp.src('client/styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/styles'))
    .pipe(livereload());
});

/*-----  End of SASS  ------*/







/*========================================
=            CONCACT & MINIFY            =
========================================*/

gulp.task('scripts', function() {
  return gulp.src('client/scripts/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scriptsc'));

});

/*-----  End of CONCACT & MINIFY  ------*/



/*==================================
=            GULP TASKS            =
==================================*/

// Watch Files For Changes
gulp.task('watch', function() {

  gulp.watch('client/**/*.js', ['lintFront', 'scripts']);
  gulp.watch('server/**/*.js', ['lintBack', 'scripts']);
  gulp.watch('client/styles/**/*.scss', ['sass']);
  livereload.listen();
});

// Default Task
gulp.task('default', ['browser-sync', 'lintFront', 'lintBack', 'watch']);

/*-----  End of GULP TASKS  ------*/
