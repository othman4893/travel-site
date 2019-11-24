var replace = require('gulp-replace');
const { src, dest } = require('gulp');
const files = {
  cssPath: 'app/assets/styles/styles.css',
  htmlPath: 'app/index.html',
  cssPathAll: 'app/assets/styles/**/*.css',
  htmlPathAll: 'app/**/*.html'
};

var cbString = new Date().getTime();

function cashBurtTask() {
  return src(files.htmlPath)
    .pipe(replace(/cd=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

exports.default = cashBurtTask();
