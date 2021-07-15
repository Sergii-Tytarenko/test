"use strict";

const { src, dest, parallel, series } = require('gulp'),
      del = require('del'),
      gulp = require("gulp"),
      webpack = require('webpack'),
      webpackStream = require('webpack-stream'),
      babel = require('babel-loader'),
      browserSync = require("browser-sync").create(),
      fileinclude = require('gulp-file-include'),
      plumber = require('gulp-plumber'),
      rename = require("gulp-rename"),
      replace = require('gulp-replace'),
      beautify = require('gulp-beautify'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCss = require('gulp-cleancss'),
      groupMedia = require("gulp-group-css-media-queries"),
      imagemin = require("gulp-imagemin"),
      svgSprite = require('gulp-svg-sprite'),
      svgMin = require('gulp-svgmin'),
      cheerio = require('gulp-cheerio'),
      fonter = require('gulp-fonter'),
      ttf2woff = require('gulp-ttf2woff'),
      ttf2woff2 = require('gulp-ttf2woff2');


/* Paths
---------------------------------------------------------------*/
const srcPath = '#src/';
const distPath = 'dist/';

const path = {
    build: {
        html:     distPath,
        css:      distPath + "css/",
        js:       distPath + "js/",
        fonts:    distPath + "fonts/",
        img:      distPath + "img/",
        favicons: distPath + "img/favicons/"
    },
    src: {
        html:     [`${srcPath}*.html`, `!${srcPath}_*.html`],
        css:      srcPath + "scss/style.scss",
        js:       srcPath + "js/main.js",
        fonts:    srcPath + "fonts/*.ttf",
        img:      [`${srcPath}img/**/*.{jpg,jpeg,png,gif,ico,svg,webp}`, `!${srcPath}img/sprite/*`, `!${srcPath}img/favicons/*`],
        sprite:   srcPath + "img/sprite/*.svg",
        favicons: srcPath + "img/favicons/*"
    },
    watch: {
        html:     srcPath + "*.html",
        css:      srcPath + "scss/**/*.scss",
        js:       srcPath + "js/**/*.js",
        img:      srcPath + "img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
        sprite:   srcPath + "img/sprite/*.svg",
        favicons: srcPath + "img/favicons/**"
    },
    clean:  "./" + distPath
}


/* Tasks
---------------------------------------------------------------*/
function html() {
    return src(path.src.html)
    .pipe(plumber())
    .pipe(
        fileinclude({
            prefix: '@',
            basepath: '@file'
        })
    )
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}

function styles() {
    return src(path.src.css)
    .pipe(plumber())
    .pipe(
        sass({
            outputStyle: 'expanded',
        })
    )
    .pipe(groupMedia())
    .pipe(
        autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: false
        })
    )
    .pipe(dest(path.build.css))
    .pipe(
        rename({
            suffix: ".min"
        })
    )
    .pipe(cleanCss())
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
}

function js() {
    return src(path.src.js)
      .pipe(webpackStream({
        mode: "development",
        devtool: '#@source-map',
        output: {
            filename: 'script.js',
        }
    }))
    .on('error', function (err) { console.log(err.toString()); this.emit('end'); })
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

function jsProd() {
    return src(path.src.js)
    .pipe(webpackStream({
        mode: "production",
        output: {
          filename: 'script.min.js',
        },
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/env']
                  }
                }
              }
            ]
          }
      }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

function images() {
    return src(path.src.img)
    .pipe(
        imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        })
    )
    .pipe(dest(path.build.img))
}

function sprite() {
    return src(path.src.sprite)
    .pipe(
        svgMin({
            js2svg: {
                pretty: true
            }
        })
    )
    .pipe(
        cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(
        svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                },
            }
        })
    )
    .pipe(dest(path.build.img))
}

function favicon() {
    return src(path.src.favicons)
    .pipe(dest(path.build.favicons))
}

function fonts_otf() {
	return src('./#src/fonts/*.otf')
    .pipe(plumber())
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(dest('./#src/fonts/'));
}

function fonts() {
    src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream())
}

function clean() {
    return del(path.clean)
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath,
            port: 3000,
        },
        browser: 'chrome',
        notify: false,
    });
}

function watchFiles() {
    gulp.watch(path.watch.css, styles);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.img, images);
    gulp.watch(path.watch.sprite, sprite);
    gulp.watch(path.watch.favicons, favicon);
    gulp.watch(path.watch.js, js);
}

const build = series( clean, fonts_otf, parallel(html, js, images, sprite, favicon), fonts, styles, server);
const watch = parallel( build, watchFiles);

exports.html = html;
exports.styles = styles;
exports.js = js;
exports.jsProd = jsProd;
exports.images = images;
exports.sprite = sprite;
exports.favicon = favicon;
exports.fonts_otf = fonts_otf;
exports.fonts = fonts;
exports.watchFiles = watchFiles;
exports.build = build;
exports.watch = watch;
exports.clean = clean;
exports.server = server;
exports.default = watch;