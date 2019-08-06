// const gulp = require('gulp');
const { src, dest, parallel, watch, series } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const watch = require('gulp-watch'); 
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const del = require('del')

const server = browserSync.create();

const files = {
  src : {
    scss: 'src/sass/*.scss',
    js: 'src/js/*.js',
    img: 'src/img/*'
  },
  dist : {
    scss: 'dist/css',
    js: 'dist/js',
    img: 'dist/img'
  }
}

const cleanCSS = () => del(['dist/css']);
const cleanJS = () => del(['dist/css']);
const cleanIMG = () => del(['dist/css']);

function _scss() {
  cleanCSS();
  return src(files.src.scss)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(files.dist.scss));
}

function _uglify() {
  cleanJS();
  return src(files.src.js)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest(files.dist.js));
}

function _nouglify() {
  cleanJS();
  return src(files.src.js)
    .pipe(dest(files.dist.js));
}
function _compress(){
  cleanIMG();
    return src(files.src.img)
        .pipe(imagemin())
        .pipe(dest(files.dist.img));
}

function serve(cb){
    server.init({
        server: {
          baseDir: "./"
        }
    });
    cb();
}

function _reload(cb){
  server.reload();
  cb();
}

watch(['input/*.js'], (cb) => { serve(); _scss(); _nouglify(); _compress();  cb();});
  
function watchTask(){
  watch(
      [files.src.scss, files.src.js],
      series(parallel(_scss, _nouglify), _reload)
  );
}
  
function watchImgs(){
  watch(
      [files.src.img],
      series(_compress, _reload)
  );
}
  
function watchHTML(){
  watch(
      ['index.html'],
      series(_reload)
  );
}

exports.default = parallel(_scss, _uglify, _compress, serve);
exports.dev = series(exports.default, parallel(watchTask, watchImgs, watchHTML));

// exports.browser_Sync = serve;
// exports.scss = _scss;
// exports.nouglify = _nouglify;
// exports.uglify = _uglify;
// exports.compress = _compress;
// exports.default = parallel(serve, _compress, _scss, _nouglify);