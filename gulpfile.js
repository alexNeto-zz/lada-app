const gulp = require('gulp');
const purify = require('gulp-purifycss');

gulp.task('purifyCSS', () => {
    return gulp.src('./dist/styles.*.css')
        .pipe(
            purify(
                ['./src/app/**/*.ts', './src/app/**/*.html'],
                {
                    info: true,
                    minify: true,
                    rejected: false,
                    whitelist: ['*transition*', '*dimmer*']
                }
            ),
        )
        .pipe(gulp.dest('./dist/'));
});