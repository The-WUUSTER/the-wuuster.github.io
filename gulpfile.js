var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var series = require('gulp-series');

/* packs vendor js files into a single file and minifies it */
gulp.task('pack-vendor-js', function() {
  return gulp.src(['node_modules/html5-boilerplate/dist/js/main.js', 'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js', 'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js', 'node_modules/jquery/dist/jquery.min.js',
    'node_modules/materialize-css/dist/js/materialize.min.js', 'js/init-materialize.js'])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

/* packs controller js files into single minified file */
gulp.task('pack-controller-js', function() {
  return gulp.src(['js/controllers/about-control.js', 'js/controllers/skills-control.js',
    'js/controllers/projects-control.js', 'js/controllers/cs170-control.js', 'js/controllers/contact-control.js'])
    .pipe(concat('controller.js'))
    .pipe(gulp.dest('js'));
});

/* combines js files */
gulp.task('combine-js', function() {
  return gulp.src(['js/vendor.js', 'js/app.js', 'js/controller.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('js'));
})

/* packs css files into a single file and then minifies it */
gulp.task('pack-css', function() {
  return gulp.src(['node_modules/html5-boilerplate/dist/css/normalize.css',
    'node_modules/html5-boilerplate/dist/css/main.css', 'node_modules/materialize-css/dist/css/materialize.min.css',
    'node_modules/@mdi/font/css/materialdesignicons.min.css', 'css/app.css'])
    .pipe(concat('build.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('css'));
});

/* js stuff needs to be done sequentially */
gulp.task(
  'default',
  gulp.parallel(
    gulp.series(
      gulp.parallel(
        'pack-vendor-js', 'pack-controller-js'
      ),
      'combine-js'
    ),
    'pack-css'
  )
);
