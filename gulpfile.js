'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const inlineSource = require('gulp-inline-source');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pixels-to-rem');
const eslint = require('gulp-eslint');
const config = require('./.buildconfig.json');

const BUILD_DIRECTORY = 'dist/';
const TMP_DIRECTORY = '.tmp/';

gulp.task('clean', () => del.sync([BUILD_DIRECTORY, TMP_DIRECTORY]));

gulp.task('styles', () => {
  return gulp.src(['src/**/*.css'])
    .pipe(postcss([
      pxtorem(config.pxtorem),
      autoprefixer(config.autoprefixer),
    ]))
    .pipe(gulp.dest(TMP_DIRECTORY));
});

gulp.task('eslint', () => {
  return gulp.src(['src/**/*.{html,js}'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest(TMP_DIRECTORY));
});

gulp.task('build:dist', ['clean', 'styles', 'eslint'], () => {
  return gulp.src(['.tmp/**/*.{html,js}'])
    .pipe(inlineSource(config.inlineSource))
    .pipe(gulp.dest(BUILD_DIRECTORY));
});

gulp.task('start-browsersync', () => {
  return browserSync.init(config.browsersync);
});

gulp.task('watch:sources', () => {
  gulp.watch(['src/**/*'], ['styles', 'eslint', 'build:dist']);
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
  'build:dist',
  'start-browsersync',
  'watch:sources',
  'watch:dist',
]);
