const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

/**
 * @method compileScss
 * @param source {String}
 * @param dist {String}
 */
function compileScss (source, dist) {
    return src(source)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(dest(dist));
}

function buildHomePage() {
    compileScss('styles/home-page/main.scss', 'styles/home-page/');
}

function buildAboutPage() {
    compileScss('styles/about-page/main.scss', 'styles/about-page/');
}

function buildTeamPage() {
    compileScss('styles/team-page/main.scss', 'styles/team-page/');
}

function buildPostPage() {
    compileScss('styles/post-page/main.scss', 'styles/post-page/');
}

async function buildProject() {
    buildHomePage();
    buildAboutPage();
    buildTeamPage();
    buildPostPage();

    await Promise.resolve();
}

function watchFiles() {
    watch('styles/**/*.scss').on('change', buildProject);
}

exports.build = buildProject;
exports.watch = series(buildProject, watchFiles);
