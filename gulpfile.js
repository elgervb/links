var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish')
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    express = require('express'),
    del = require('del'),
    stripDebug = require('gulp-strip-debug'),
    browserSync = require('browser-sync'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    todo = require('gulp-todo'),
    jsdoc = require("gulp-jsdoc"),
    plumber = require('gulp-plumber'),
    ngannotate = require('gulp-ng-annotate'),
    replace = require('gulp-replace');

/**
 * browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.
 * Depends on: watch
 */
gulp.task('browser-sync', ['watch'], function() {

  // Watch any files in dist/* & index.html, reload on change
  gulp.watch(['dist/**', 'index.html']).on('change', function(){browserSync.reload({});notify({ message: 'Reload browser' });});

  return browserSync({
      server: {
          baseDir: "./dist"
      },
      ghostMode: {
        clicks: true,
        location: true,
        forms: true,
        scroll: true
      },
      open: "external",
      injectChanges: true, // inject CSS changes (false force a reload) 
      browser: ["google chrome"],
      scrollProportionally: true, // Sync viewports to TOP position
      scrollThrottle: 50,
    });
});


/**
 * Build and copy all styles, scripts, images and fonts.
 * Depends on: clean
 */
gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'copy', 'todo');
});


/**
 * Cleans the `dist` folder and other generated files
 */
gulp.task('clean', function(cb) {
    del(['dist', 'docs','todo.md', 'todo.json'], cb);
});


/**
 * Copies all to dist/
 */
gulp.task('copy', function() {

  // copy all jpg's as they are not handled by the images task
   gulp.src( 'src/img/**/*.jpg')
    .pipe(gulp.dest('dist/assets/img'));

  // copy all fonts
  gulp.src( 'src/fonts/**')
    .pipe(gulp.dest('dist/assets/fonts'));

  // copy all html && json
  gulp.src( ['src/js/app/**/*.html', 'src/js/app/**/*.json'])
    .pipe(gulp.dest('dist/assets/js/app'));

  // copy the index.html
  return gulp.src('src/index.html')
      .pipe(gulp.dest('dist/'));
});


/**
 * Default task.
 * Depends on: build
 */
gulp.task('default', ['build']);


/**
 * Generate docs from all application javascript
 */
gulp.task('docs', function() {
  gulp.src("./src/js/app/**/*.js")
    .pipe(jsdoc('./docs'))
});


/**
 * Task to start a Express server on port 4000.
 */
gulp.task('express', function(){
  var app = express(), port = 4000;
  app.use(express.static(__dirname + "/dist"));
  app.listen(port); 
  console.log('started webserver on port ' + port);
});


/**
 * Task to start a Express server on port 4000 and used the live reload functionality.
 * Depends on: express, live-reload
 */
gulp.task('express-lr', ['express', 'live-reload'], function(){});

/**
 * Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/assets/img`
 */
gulp.task('images', function() {
  return gulp.src('src/img/**/*.png')
    .pipe(plumber({errorHandler: onError}))
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'));
});


/**
 * Start the live reload server. Live reload will be triggered when a file in the `dist` folder or the index.html changes.
 * Depends on: watch
 */
gulp.task('live-reload', ['watch'], function(cb) {

  del(['dist/index.html']);

  // add livereload script to the index.html
  gulp.src(['src/index.html'])
   .pipe(replace(/(\<\/body\>)/g, "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>$1"))
   .pipe(gulp.dest('dist'));

  // // Create LiveReload server
  // livereload.listen();

  // // Watch any files in dist/* & index.html, reload on change
  // gulp.watch(['dist/**', 'index.html']).on('change', livereload.changed);

  // console.log('To enable live reload, you can place following script in your page or use the browser plugin')
  // console.log("<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>");
});


/**
 * Removes the node_modules
 */
gulp.task('remove',['clean'], function(cb){
  del('node_modules', cb);
});


/**
 * Task to handle and deploy all javascript, application & vendor
 *
 * Depends on: scripts-app, scripts-vendor
 */
gulp.task('scripts', ['scripts-app','scripts-vendor']);


/**
 * Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder.
 * This will also generete sourcemaps for the minified version.
 *
 * Depends on: docs
 */
gulp.task('scripts-app', ['docs'], function() {
  return gulp.src('src/js/app/**/*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(!argv.dev, stripDebug()))
    .pipe(ngannotate())
    .pipe(gulpif(!argv.dev, uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'));
});


/**
 * Task to handle all vendor specific javasript. All vendor javascript will be copied to the dist directory. Also a concatinated version will be made, available in \dist\assets\js\vendor\vendor.js
 */
gulp.task('scripts-vendor', function() {
    // script must be included in the right order. First include angular, then angular-route
  return gulp.src(['src/js/vendor/angularjs/1.3.7/angular.min.js','src/js/vendor/angularjs/1.3.7/angular-route.min.js','src/js/vendor/**/*.js'])
    .pipe(gulp.dest('dist/assets/js/vendor'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/assets/js/vendor'));
});


/**
 * Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder.
 * This will also auto prefix vendor specific rules.
 */
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'));
});


/**
 * Output TODO's & FIXME's in markdown and json file as well
 */
gulp.task('todo', function() {
    gulp.src('src/js/app/**/*.js')
      .pipe(plumber({errorHandler: onError}))
      .pipe(todo())
      .pipe(gulp.dest('./')) //output todo.md as markdown
      .pipe(todo.reporter('json', {fileName: 'todo.json'}))
      .pipe(gulp.dest('./')) //output todo.json as json
});


/**
 * Watches changes to Sass, javascript and images. On change this will run the appropriate task, either: styles, scripts or images. 
 */
gulp.task('watch', function() {

  // watch html files
  gulp.watch('src/**/*.html', ['copy']);

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch app .js files
  gulp.watch('src/js/app/**/*', ['scripts-app']);

  // Watch vendor .js files
  gulp.watch('src/js/vendor/**/*', ['scripts-vendor']);

  // Watch image files
  gulp.watch('src/img/**/*', ['images']);

  // data
  gulp.watch('src/js/app/**/*.json', ['copy']);
});

var onError = function(err) {
    notify.onError({
                title:    "Gulp",
                subtitle: "Failure!",
                message:  "Error: <%= error.message %>",
                sound:    "Beep"
            })(err);

    this.emit('end');
};