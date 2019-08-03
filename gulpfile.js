const gulp = require('gulp');
const purify = require('gulp-purifycss');

gulp.task('purifyCSS', () => {
    return gulp.src('./dist/**/*.css')
        .pipe(
            purify(
                ['./src/app/**/*.ts', './src/app/**/*.html'],
                {
                    info: true,
                    minify: true,
                    rejected: false,
                    whitelist: ['*ng-autocomplete*', '*ng-dropdown*', '*dropdown-item*', 'animated']
                }
            ),
        )
        .pipe(gulp.dest('./dist/'));
});
