'use strict';

const gulp = require('gulp');
const log = require('fancy-log');
const del = require('del');
const browserSync = require('browser-sync').create();
const portfinder = require('portfinder');
const {spawn} = require('child_process');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pixels-to-rem');
const eslint = require('gulp-eslint');
const config = require('./.buildconfig.json');
const through = require('through2');
const rename = require('gulp-rename');

const BUILD_DIRECTORY = 'dist/';
const TMP_DIRECTORY = '.tmp/';

gulp.task('clean', () => del.sync([BUILD_DIRECTORY, TMP_DIRECTORY]));

const startServer = (port) => {
  const polymerCliParams = ['serve', '--npm', '-p', port];
  const polymerServe = spawn('polymer', polymerCliParams);

  polymerServe.stdout.on('data', (data) => {
    log(`${data}`);
    browserSync.init(getServerConfig(port));
  });

  polymerServe.stderr.on('data', (data) => {
    log(`Error: ${data}`);
  });

  polymerServe.on('close', (code) => {
    log(`child process exited with code ${code}`);
  });
};

const getServerConfig = (port) => {
  return JSON.parse(
    JSON.stringify(config.browsersync)
      .replace(/{{port}}/g, port)
    );
};

const styleModuleTemplate = [
  'import {css} from \'lit-element\';',
  'export const styles = css`',
  '{{styles}}`;',
].join('\n');

const stylesToScript = () => through.obj((file, encoding, next) => {
  const content = file.contents.toString(encoding);
  const result = styleModuleTemplate.replace(/{{styles}}/g, content);
  file.contents = new Buffer(result);

  return next(null, file);
});

gulp.task('styles', () => {
  return gulp.src(['src/**/*.css'])
    .pipe(postcss([
      pxtorem(config.pxtorem),
      autoprefixer(config.autoprefixer),
    ]))
    .pipe(stylesToScript())
    .pipe(rename({extname: '.css.js'}))
    .pipe(gulp.dest(TMP_DIRECTORY));
});

gulp.task('eslint', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest(TMP_DIRECTORY));
});

gulp.task('build:dist', ['clean', 'styles', 'eslint'], () => {
  return gulp.src(['.tmp/**/*.js'])
    .pipe(gulp.dest(BUILD_DIRECTORY));
});

gulp.task('start-server', () => {
  return portfinder.getPortPromise()
    .then(startServer)
    .catch((err) => log(err));
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
  'start-server',
  'watch:sources',
  'watch:dist',
]);
