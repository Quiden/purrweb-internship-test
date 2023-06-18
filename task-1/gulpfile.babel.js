import gulp from "gulp";
import rename from "gulp-rename";
import concat from "gulp-concat";
import flatten from "gulp-flatten";
import browserSync from "browser-sync";

const bSync = browserSync.create();

const concatScripts = () =>
  gulp
    .src("src/**/*.js")
    .pipe(concat("script.js"))
    .pipe(gulp.dest("build/"));

const concatCss = () => 
  gulp
    .src("src/**/*.css")
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("build/"));

const buildHtml = () =>
  gulp
    .src("src/index.html")
    .pipe(gulp.dest("build/"));

const findImages = () =>
  gulp
    .src("src/images/**/*")
    .pipe(flatten({ incudeParents: 0 }))
    .pipe(gulp.dest("build/images/"));  

const findFonts = () =>
  gulp
    .src("src/fonts/**/*")
    .pipe(flatten({ incudeParents: 0 }))
    .pipe(gulp.dest("build/fonts/")); 

const hotReload = async () => bSync.reload();

const serve = () => {
  bSync.init({
    server: {
      baseDir: "build/",
      index: "index.html"
    }
  });
  gulp.watch("src/**", gulp.parallel(build, hotReload));
}

const build = gulp.parallel(buildHtml, concatCss, findImages, concatScripts, findFonts);

export default gulp.series(
    build,
    serve
  );

