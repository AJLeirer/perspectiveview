// ---------------------------------------------------------------------------------------------------------------- Info

/**
 * @desc  Project build file.
 */


// ------------------------------------------------------------------------------------------------------------ Includes

var gulp  = require('gulp'),
    sass  = require('gulp-sass'),
    jsdoc = require('gulp-jsdoc');

// -------------------------------------------------------------------------------------------------------------- Config

var path = {
    sass :  {
        input  : './dist/scss/',
        output : './dist/css/'
    },
    docs : {
        input  : './perspectiveview.js',
        output : './docs/'
    }
};


// --------------------------------------------------------------------------------------------------------------- Tasks
// ------------------------------------------------------------------------------------------------------ SASS

gulp.task('sass', function () {
    return gulp.src(path.sass.input + '*.scss')
               .pipe(sass())
               .pipe(gulp.dest(path.sass.output));
});

// ------------------------------------------------------------------------------------------------------ DOCS

gulp.task('docs', function () {
    return gulp.src(path.docs.input)
        .pipe(jsdoc.parser({
            name: 'PerspectiveView',
            description: 'description',
            version: 'v0.1.0',
            licenses: ['MIT'],
            plugins: false}))
        .pipe(jsdoc.generator(
            path.docs.output, {
                cleverLinks: false,
                monospaceLinks: true,
                systemName: "PerspectiveView",
                footer: "Created by Danny Grübl",
                copyright: "2015",
                navType: "vertical",
                linenums: true,
                collapseSymbols: true,
                inverseNav: false
            }, {
                showPrivate: true,
                monospaceLinks: false,
                cleverLinks: false,
                outputSourceFiles: true
            }
        ));
});

// ------------------------------------------------------------------------------------------- Default / Watch

gulp.task('watch', function() {
    gulp.run('default');
    gulp.watch(path.sass.input + '/**/*.scss', function() {
        gulp.run('sass');
    });
});


gulp.task('default', function() {
    gulp.run('sass');
});


// ----------------------------------------------------------------------------------------------------------------- EOF
