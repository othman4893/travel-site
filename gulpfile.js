var postcss = require('gulp-postcss');
// var watch = require('gulp-watch');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var replace = require('gulp-replace');

var mixins = require('postcss-mixins');
var cssImporter = require('postcss-import');
const { src, dest, watch, series } = require('gulp');

browserSync = require('browser-sync').create();

const files = {
  cssPath: 'app/assets/styles/styles.css',
  htmlPath: 'app/index.html',
  cssPathAll: 'app/assets/styles/**/*.css',
  htmlPathAll: 'app/**/*.html'
};

//html
var cbString = new Date().getTime();
function cashBurtTask() {
  return src(files.htmlPath)
    .pipe(replace(/cd=\d+/g, 'cb=' + cbString))
    .pipe(dest('.', 'cashBurt.html'));
}

function styles() {
  return src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImporter, mixins, cssvars, nested, autoprefixer]))
    .pipe(browserSync.stream())
    .pipe(dest('./app/temp/styles', 'styles.css'));
}

function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
}
function reloadTask() {
  browserSync.reload();
  return src(files.htmlPath);
}

function watchMyFiles() {
  browserSyncTask();
  watch(
    [files.cssPath, files.htmlPath, files.cssPathAll, files.htmlPathAll],
    series(cashBurtTask, styles, reloadTask)
  );
}

exports.default = series(cashBurtTask, styles, watchMyFiles);
