var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
browserSync = require('browser-sync').create();

var cssImporter = require('postcss-import');

const { src, dest } = require('gulp');

function styles() {
  return src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImporter, cssvars, nested, autoprefixer]))
    .pipe(browserSync.stream())
    .pipe(dest('./app/temp/styles', 'styles.css'));
}

exports.default = styles();
