const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const server = require('gulp-develop-server');
const open = require('gulp-open');
const run = require('gulp-run');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const env = process.env.NODE_ENV || 'development';

let webpackConfFile;

if (env === 'production') {
  webpackConfFile = require('./webpack.prod.js');
} else {
  webpackConfFile = require('./webpack.common.js');
}

// Clean the bin directory
gulp.task('clean', () => {
  return gulp.src(['bin/**/*', '!**/bundle.js', '!**/index.html'], {read: false});
});

// Generate DOCs for server
gulp.task('doc', () => {
  return run('esdoc').exec('', () => {
    return gulp.src('./doc/index.html')
      .pipe(open({app: 'google chrome'}));
  });
});

// Process and package front-end modules
gulp.task('webpack-frontend', ['clean'], (callback) => {
  return webpack(webpackConfFile).run((error, stats) => {
    if (error) {
      console.log("Webpack err:", err);
    } else {
      console.log("Webpack stats:", stats.toString());
    }
    callback();
  });
});

// Copy static assets
gulp.task('copy-assets', ['clean'], () => {
  return gulp.src(['src/web/module/index.html'])
    .pipe(gulp.dest('bin/web/app'));
});

// Process front-end and run in-memory server
gulp.task('webpack-server', ['clean', 'copy-assets'], (callback) => {
  return new WebpackDevServer(webpack(webpackConfFile),
    webpackConfFile.devServer)
    .listen(80, '0.0.0.0', (error) => {
      if (error) {
        console.error(error);
      }
      callback();
    });
});

// Lint and copy backend source files
gulp.task('process-backend', ['clean'], () => {
  return gulp.src(['src/server/module/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel({
      presets: ['es2015'],
    })).pipe(gulp.dest('bin'));
});

// Start the backend server after processing the scripts
gulp.task('start-backend', ['process-backend'],
  (callback) => {
    server.listen({
      path: './bin/index.js',
    });
    callback();
  });

// Start watching for file changes
gulp.task('watch', () => {
  gulp.watch(
    ['src/server/module/**/*.js'],
    ['clean', 'process-backend', server.restart]);
});

// Build
gulp.task('build',
  ['clean', 'webpack-frontend', 'process-backend', 'copy-assets']);

// Build and watch for changes
gulp.task('serve', ['webpack-server', 'copy-assets', 'start-backend', 'watch']);
