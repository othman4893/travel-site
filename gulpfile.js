var postcss = require('gulp-postcss');
// var watch = require('gulp-watch');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var replace = require('gulp-replace');
var rename = require('gulp-rename')
var del = require('del')

var mixins = require('postcss-mixins');
var cssImporter = require('postcss-import');



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
  series
} = require('gulp');

browserSync = require('browser-sync').create();

const files = {
  cssPath: 'app/assets/styles/styles.css',
  htmlPath: 'app/index.html',
  cssPathAll: 'app/assets/styles/**/*.css',
  htmlPathAll: 'app/**/*.html'
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
    series(styles, reloadTask)
  );
  del(['./app/temp/sprite']);
}

exports.default = series(styles, svgSpriteTask, copySpriteCss, copySpriteGraphic, watchMyFiles);