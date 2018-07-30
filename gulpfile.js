'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const processInline = require('gulp-process-inline');
const inlineSource = require('gulp-inline-source');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pixels-to-rem');

const BUILD_DIRECTORY = 'dist/';
const PXTOREM_CONFIG = {
  exclude: [
    'border',
    'box-shadow',
    'border-radius',
  ],
};

gulp.task('clean', () => del([BUILD_DIRECTORY]));

gulp.task('inline-styles', () => {
  const styles = processInline();
  return gulp.src(['src/**/*.{html,js}'])
    .pipe(inlineSource({
      compress: false,
      swallowErrors: true,
    }))
    .pipe(styles.extract('style'))
    .pipe(postcss([
      pxtorem(PXTOREM_CONFIG),
      autoprefixer({
        flexbox: 'no-2009',
      }),
    ]))
    .pipe(styles.restore())
    .pipe(gulp.dest(BUILD_DIRECTORY));
});

gulp.task('start-browsersync', () => {
  return browserSync.init({
    open: false,
    notify: false,
    ghostMode: false,
    server: {
      baseDir: ['./'],
      index: 'index.html',
      routes: {
        '/': './bower_components',
      },
    },
  });
});

gulp.task('watch:sources', () => {
  gulp.watch(['src/**/*'], ['inline-styles']);
});

gulp.task('watch:dist', () => {
  gulp.watch([
    'index.html',
    'styles.css',
    'dist/**/*',
    'test/**/*',
  ]).on('change', browserSync.reload);
});

gulp.task('serve', [
  'clean',
  'inline-styles',
  'start-browsersync',
  'watch:sources',
  'watch:dist',
]);
