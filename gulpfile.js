var postcss = require('gulp-postcss');
// var watch = require('gulp-watch');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var del = require('del');
var hexrgba = require('postcss-hexrgba')

var mixins = require('postcss-mixins');
var cssImporter = require('postcss-import');

var webpack = require("webpack");

var svgSprite = require('gulp-svg-sprite');
var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './app/gulp/templates/sprite.css'
        }
      }
    }
  }
};


const {
  src,
  dest,
  watch,
  series, parallel
} = require('gulp');

browserSync = require('browser-sync').create();

const files = {
  cssPath: 'app/assets/styles/styles.css',
  htmlPath: 'app/index.html',
  cssPathAll: 'app/assets/styles/**/*.css',
  htmlPathAll: './app/**/*.html',
  jsPathAll: 'app/assets/scripts/**/*.js'
};

/*
//html
var cbString = new Date().getTime();

function cashBurtTask() {
  return src(files.htmlPath)
    .pipe(replace(/cd=\d+/g, 'cb=' + cbString));
}
*/

// svg sprite
function svgSpriteTask() {
  del(['./app/temp/sprite', './app/assets/images/sprites']);
  return src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./app/temp/sprite/'));
}

function copySpriteCss() {
  return src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(dest('./app/assets/styles/modules'))
}

function copySpriteGraphic() {
  return src('./app/temp/sprite/css/**/*.svg')
    .pipe(dest('./app/assets/images/sprites'))
}



function scripts(a) {
  webpack(require('./webpack.config'), (err, stats) => {
    if (err) console.error(err.toString());
    console.log(stats.toString());
    a();
  })

}


function styles() {
  console.log("Sprite function as done")
  return src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImporter, mixins, cssvars, nested, hexrgba, autoprefixer]))
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
    [files.cssPathAll, files.htmlPathAll, files.jsPathAll],
    series(styles, scripts, reloadTask)
  );


  del(['./app/temp/sprite']);
}

exports.default = series(styles, scripts, svgSpriteTask, copySpriteCss, copySpriteGraphic, watchMyFiles);  