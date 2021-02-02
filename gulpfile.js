const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build:graphql', () =>
  gulp.src('./src/serve/**/*.graphql').pipe(gulp.dest('./dist/'))
);

gulp.task('build:ts', () =>
  gulp
    .src('./src/serve/**/*.ts')
    .pipe(
      // 使用 .babelrc 配置
      babel()
    )
    .pipe(gulp.dest('./dist/'))
);

// 定义 default 任务
gulp.task("default", gulp.series("build:graphql", "build:ts"));

if (process.env.NODE_ENV !== 'production') {
  gulp.watch('./src/serve/**/*.ts', gulp.series('default'));
}
