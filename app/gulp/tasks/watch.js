const { watch, series } = require('gulp');
browserSync = require('browser-sync').create();
const files = {
  cssPath: 'app/assets/styles/styles.css',
  htmlPath: 'app/index.html',
  cssPathAll: 'app/assets/styles/**/*.css',
  htmlPathAll: 'app/**/*.html'
};

function reloadTask() {
  browserSync.reload();
  return src(files.htmlPath);
}
function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
}
function browserSyncTask() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
}

function watchMyFiles() {
  browserSyncTask();
  watch(
    [files.cssPath, files.htmlPath, files.cssPathAll, files.htmlPathAll],
    series(styles, cashBurtTask, reloadTask)
  );
}

exports.default = watchMyFiles();
