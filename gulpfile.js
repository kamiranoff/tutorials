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


/*==========  JADE  ==========*/

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('client/views/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('client/html/'))
});


gulp.task('jade:reload',function(){
  gulp.src('client/views/**/*.jade').pipe(livereload());
  });

/*==========  END JADE  ==========*/


/*==========  SERVER  ==========*/

gulp.task('serve', function() {
  nodemon({
    script: 'server/server.js',
    ext: 'js html jade',
    ignore: ['bower_components', 'node_modules', 'sources','client/scripts'],
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', function () {
        setTimeout(function () {
            livereload.changed('client/views/**/*.jade');
        }, 500); // wait for the server to finish loading before restarting the browsers
    });
});

/*==========  END SERVER  ==========*/

/*==========  LINTING  ==========*/

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

/*========== END  LINTING  ==========*/



// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('client/styles/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/styles'))
    .pipe(livereload());
});



/*==========  Concatenate & Minify JS : NOT USES YET ==========*/
// Concatenate & Minify JS
//
gulp.task('scripts', function() {
  return gulp.src('client/scripts/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));

});

/*==========  END Concatenate & Minify JS  ==========*/


// Watch Files For Changes
gulp.task('watch', function() {

  gulp.watch('client/**/*.js', ['lintFront', 'scripts']);
  gulp.watch('server/**/*.js', ['lintBack', 'scripts']);
  gulp.watch('client/styles/**/*.scss', ['sass']);
  gulp.watch('client/views/**/*.jade',['jade:reload']);
  livereload.listen();
});

// Default Task
gulp.task('default', ['serve', 'lintFront', 'lintBack', 'sass', 'watch']);
