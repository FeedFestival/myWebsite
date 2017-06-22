
// npm install --save-dev gulp
var gulp = require('gulp');

// npm install --save-dev gulp-concat
var concat = require('gulp-concat');

// npm install --save-dev gulp-minify
var minify = require('gulp-minify');

// npm install --save-dev gulp-uglify
var uglify = require('gulp-uglify');

// npm install --save-dev gulp-css
var cssMin = require('gulp-css');

// npm install gulp-sass --save-dev
var sass = require('gulp-sass');

gulp.task('concat-libs',
    function () {
        return gulp.src([
            'js/jquery-1.12.3.min.js',
            'js/angular/angular.min.js',    // experimental
            'js/angular/angular-route.min.js',
            'js/ngFacebook.js',
            'js/angular/angular-translate.min.js',
            'js/angular/angular-translate-loader-static-files.min.js',
            'js/ui-bootstrap-tpls-1.3.2.min.js',
            'js/angular/ngStorage.min.js'   // experimental
        ])
            .pipe(concat('libs.js'))
            .pipe(gulp.dest('dist'))
    }
);

//gulp.task('concat-all-scripts',
//    function () {
//        return
//        gulp.src([
//            './app.js',
//            './scripts/services_directives/services.js',
//            './scripts/services_directives/directives.js',
//            './scripts/session/sessionController.js',
//            './scripts/session/sessionFactory.js',
//            './scripts/user/userFactory.js',
//            './scripts/menu/menuController.js',
//            './scripts/menu/menuFactory.js',
//            './scripts/home/homeController.js',
//            './scripts/tutorial/tutorialController.js',
//            './scripts/game/gameController.js',
//            './scripts/workflow/workflowController.js'
//        ])
//        .on('error', gutil.log)
//        .pipe(concat({ path: 'new.js', stat: { mode: 0666 } }))
//        .pipe(gulp.dest('dist'))
//    }
//);

gulp.task('concat-scripts',
    function () {
        return gulp.src('./scripts/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist'))
    }
);

gulp.task('compress-scripts', function () {
    return gulp.src('dist/scripts.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('css-min',
    function () {
        return gulp.src([
                'css/base.css',
                'css/font-awesome.min.css',
                'css/bootstrap.min.css',
                'css/main.css'
        ])
            .pipe(concat('app.css'))
            .pipe(cssMin())
            .pipe(gulp.dest('dist'))
    }
);

gulp.task('sass', function () {
    return gulp.src('./css/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/**/*.scss', ['sass']);
});

// gulp cs
gulp.task('cs', ['sass', 'css-min']);

// gulp merge
gulp.task('merge', ['concat-libs', 'concat-scripts']);

// gulp minify
gulp.task('minify', ['compress-scripts', 'sass', 'css-min']);