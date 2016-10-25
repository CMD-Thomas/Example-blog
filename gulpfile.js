var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var nodemon         = require('gulp-nodemon');
var stylus          = require('gulp-stylus');
var minifyCSS       = require('gulp-minify-css');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');
var concat          = require('gulp-concat');
var autoprefixer    = require('gulp-autoprefixer');

gulp.task('browser-sync', ['stylus', 'nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3010",
        files: ["build/views/**/*.ejs", "build/routers/*.js", "js/main.js"],
        browser: "google chrome",
        port: 4000,
        online: "true"
        //reloadDelay: 500
  });
});

gulp.task('js', function(){
  gulp.src("build/js/main.js")
  .pipe(concat('output.min.js')) 
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.reload({stream:true}))
})

gulp.task('stylus', function () {
      gulp.src('build/stylesheets/style.styl')
      .pipe(stylus({compress: true, paths: ['public/stylesheets']}))
      .pipe(autoprefixer())
      .pipe(minifyCSS())
      .pipe(rename('style.css'))
      .pipe(gulp.dest('public/stylesheets'))
      .pipe(browserSync.reload({stream:true}))
});

gulp.task('ejs', function(){
  return gulp.src('build/views/*.ejs')
    .pipe(browserSync.reload({stream:true}))
})

gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true; 
    } 
  });
});

gulp.task('watch', function () {
   //gulp.watch('public/stylesheets/**/*.styl', ['stylus']);
   gulp.watch('build/stylesheets/imports/*.styl', ['stylus']);   
   gulp.watch('build/js/main.js', ['js']);
   gulp.watch('build/views/*.ejs', ['ejs']);

});

// gulp.watch("**/**/*.*").on("change", browserSync.reload);


gulp.task('default', [ 'stylus', 'nodemon', 'watch', 'js', 'browser-sync'],function () {
});
