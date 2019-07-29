// const gulp = require('gulp');
const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
// const watch = require('gulp-watch'); 
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function _scss() {
  return src('src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function _uglify() {
  return src('src/js/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function _nouglify() {
  return src('src/js/*.js')
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function _compress(){
    return src('src/img/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}

function _browserSync(){
    browserSync.init({
        server: {
          baseDir: "./"
        }
    });
}

watch(['input/*.js'], (cb) => { _browserSync(); _scss(); _nouglify(); _compress();  cb();});
// gulp.task('dev', gulp.parallel('browser-sync', 'scss', 'nouglify', 'compress'), function(){
//   gulp.watch('src/sass/*.scss', gulp.series('scss'));
//   gulp.watch('src/js/*.js', gulp.series('nouglify'));
//   gulp.watch('src/img/*', gulp.series('compress'));
//   gulp.watch("*.html").on('change', browserSync.reload);
//   return;
// });

// gulp.task('default', gulp.parallel('browser-sync', 'scss', 'uglify', 'compress'), function(){
//     gulp.watch('src/sass/*.scss', gulp.series('scss'));
//     gulp.watch('src/js/*.js', gulp.series('uglify'));
//     gulp.watch('src/img/*', gulp.series('compress'));
//     gulp.watch("*.html").on('change', browserSync.reload);
//     return;
//   });
  
exports.browser_Sync = _browserSync;
exports.scss = _scss;
exports.nouglify = _nouglify;
exports.uglify = _uglify;
exports.compress = _compress;
exports.default = parallel(_browserSync, _compress, _scss, _nouglify);