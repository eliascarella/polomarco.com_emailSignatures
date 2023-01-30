var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cleanCss = require('gulp-clean-css'),
    inlineCss = require('gulp-inline-css'),
    gulpTemplate = require('gulp-template')


var data = require('./data.json')

const cleanScss = function(){
    return gulp.src('./src/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename(function(path){
            path.extname = ".css"
        }))
        .pipe(gulp.dest('./dist/'))
}

const html = function(){
    data.forEach((d) =>{
        return gulp.src('./src/index.html')
        .pipe(inlineCss())
        .pipe(gulpTemplate({nom:d.nom, fonction:d.fonction}))
        .pipe(rename(function(path){
            path.basename = d.nom
            path.extname = ".html"
        }))
        .pipe(gulp.dest("./dist/"))
        })
}
exports.default = gulp.parallel(cleanScss,html);
