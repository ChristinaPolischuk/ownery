let project_folder = 'build';
let source_folder = 'src';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        libsCSS: project_folder + '/css/',
        js: project_folder + '/js/',
        libsJS: project_folder + '/js/',
        img: project_folder + '/img/',
        libsImg: project_folder + '/css/',
        svg: project_folder + '/img/sprite/',
        fonts: project_folder + '/fonts/',
    },
    src: {
        html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
        css: source_folder + '/scss/style.scss',
        libsCss: [source_folder + '/js/libs/mCustomScrollbar/jquery.mCustomScrollbar.css', source_folder + '/js/libs/noUiSlider/nouislider.css'],
        js: source_folder + '/js/scripts.js',
        libsJS: [source_folder + '/js/libs/jquery-3.7.0(lib).min.js', source_folder + '/js/libs/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js', source_folder + '/js/libs/noUiSlider/nouislider.js'],
        img: [`${source_folder}/img/**/*.+(png|jpg|jpeg|ico|svg|webp)`, `!${source_folder}/img/sprite/*.svg`],
        imgConvert: [`${source_folder}/img/**/*.*`, `!${source_folder}/img/**/*.svg`],
        libsImg: `${source_folder}/js/libs/mCustomScrollbar/mCSB_buttons.png`,
        svg: source_folder + '/img/sprite/*.svg',
        fonts: source_folder + '/fonts/*',
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: `${source_folder}/img/**/*.+(png|jpg|jpeg|ico|svg|webp)`,
        svg: source_folder + '/img/sprite/*.svg',
        fonts: source_folder + '/fonts/*',
    },
    clean: './' + project_folder + '/',
}

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    newer = require('gulp-newer'),
    fonter = require('gulp-fonter'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    svgmin = require('gulp-svgmin'),
    svgSprite = require('gulp-svg-sprite'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    webp = require('gulp-webp'),
    avif = require('gulp-avif'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    terser = require('gulp-terser');

// Browser Sync
function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/',
        },
        port: 3000,
        notify: false,
    })
}

// HTML
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.reload({ stream: true }))
}

// Fonts
function fonts() {
    return gulp.src(path.src.fonts)
        .pipe(newer(path.build.fonts))
        .pipe(fonter({formats: ["ttf", "woff", "eot", "svg"]}))
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
}

// Images
function images() {
    return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

// Images Compress
// function img() {
//     return src(path.src.img)
//         .pipe(
//             imagemin([
//                 imagemin.gifsicle({ interlaced: true }),
//                 imagemin.mozjpeg({ quality: 75, progressive: true }),
//                 imagemin.optipng({ optimizationLevel: 5 }),
//                 imagemin.svgo({
//                     plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
//                 }),
//             ]),
//         )
//         .pipe(dest(path.build.img))
// }

function img() {
    return src(path.src.imgConvert)
        .pipe(newer(path.build.img))
        .pipe(avif({quality: 50}))

        .pipe(src(path.src.imgConvert))
        .pipe(newer(path.build.img))
        .pipe(webp())

        .pipe(src(path.src.img))
        .pipe(newer(path.build.img))
        .pipe(imagemin())

        .pipe(dest(path.build.img))
}

function libsImg() {
    return src(path.src.libsImg).pipe(dest(path.build.libsImg))
}

// JavaScript
function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js',
            }),
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function libsJS () {
    return gulp.src(path.src.libsJS)
        .pipe(concat("libs.min.js"))
        .pipe(terser())
        .pipe(gulp.dest(path.build.libsJS))
}

// CSS
function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded',
            }),
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                cascade: true,
                overrideBrowserslist: ['last 5 versions'],
            }),
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css',
            }),
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

// CSS Libs
function libsCSS() {
    return src(path.src.libsCss)
        .pipe(concat("libs.min.css"))
        .pipe(clean_css())
        .pipe(dest(path.build.libsCSS))
        .pipe(browsersync.stream())
}

// svg
function svg() {
    return src(path.src.svg)
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $("[fill]").removeAttr("fill");
                $("[stroke]").removeAttr("stroke");
                $("[style]").removeAttr("style");
            },
            parseOptions: {xmlMode: true}
        }))
        .pipe(replace("&gt;",">"))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(path.build.svg))
        .pipe(browsersync.stream())
}

// Watch Files
function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], img);
    gulp.watch([path.watch.svg], svg);
    gulp.watch([path.watch.fonts], fonts);
}

// Clean
function clean(params) {
    return del(path.clean)
}

    gulp.watch([path.watch.js], js);
let build = gulp.series(clean, gulp.parallel(html, js, libsJS, css, libsCSS, img, libsImg, svg, fonts));

// Without clean build
// let build = gulp.series(gulp.parallel(html, js, libsJS, css, libsCSS, img, libsImg, svg, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.img = img;
exports.images = images;
exports.libsImg = libsImg;
exports.svg = svg;
exports.js = js;
exports.libsJS = libsJS;
exports.html = html;
exports.css = css;
exports.libsCSS = libsCSS;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;