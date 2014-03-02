
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

gulp.task('ci', ['lint', 'test']);
gulp.task('default', ['lint', 'test']);

// Owner only
gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
             .pipe(bump())
             .pipe(gulp.dest('./'));
});
