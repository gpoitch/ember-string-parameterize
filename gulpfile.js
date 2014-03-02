
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var qunit  = require('gulp-qunit');
var bump   = require('gulp-bump');

var src        = './ember-string-parameterize.js';
var testRunner = './tests/test-runner.html';

gulp.task('lint', function() {
  return gulp.src(src)
             .pipe(jshint())
             .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src(testRunner)
             .pipe(qunit());
});

gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
             .pipe(bump())
             .pipe(gulp.dest('./'));
});

gulp.task('tag', function () {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
             .pipe(git.commit(message))
             .pipe(git.tag(v, message))
             .pipe(git.push('origin', 'master', '--tags'))
             .pipe(gulp.dest('./'));
});

gulp.task('ci', ['lint', 'test']);
gulp.task('default', ['lint', 'test']);
