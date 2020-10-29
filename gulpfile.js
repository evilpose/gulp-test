var gulp = require('gulp');
// var $ = require('gulp-load-plugins')();


var concat = require('gulp-concat') // 这些接受的都是方法
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var less = require('gulp-less')
var cleanCss = require('gulp-clean-css')
var htmlmin = require('gulp-htmlmin')
var livereload = require('gulp-livereload')
var connect = require('gulp-connect')
var open = require('open')
const debug = require("gulp-debug");


// 注册任务
// gulp.task('任务名', function (){
//     // 配置任务的操作
// })

// 注册合并压缩js任务  
gulp.task('js', function(){
    // return gulp.src('src/js/**/*.js')  // 深度遍历 就是在js文件下又有一个文件里面还有js的
    return gulp.src('src/js/*.js')  //  找到目标源文件，将数据读取到gulp的内存中
        .pipe(concat('build.js'))   //  临时合并文件
        .pipe(gulp.dest('dist/js/')) //  临时输出文件到本地
        .pipe(uglify())             //  压缩文件
        // .pipe(rename('build.min.js'))   // 直接改名字为build.min.js
        .pipe(rename({suffix: '.min'}))     // 后缀名
        .pipe(gulp.dest('dist/js/')) 
        .pipe(livereload()) // 实时刷新
        .pipe(connect.reload())
})
 
// 注册转换less的任务
gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())   // 编译less文件为css文件
        .pipe(gulp.dest('src/css'))
        .pipe(livereload()) // 实时刷新
        .pipe(connect.reload())
})

// 注册合并压缩css文件
gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('build.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload()) // 实时刷新
        .pipe(connect.reload())
});

// 注册压缩html的任务
gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload()) // 实时刷新
        .pipe(debug({ title: "versioned html sources:" }))
        .pipe(connect.reload())
})

// 注册默认任务
gulp.task('default', gulp.series(['js', 'less', 'css', 'html']));

// 注册监视任务
gulp.task('watch', gulp.series('default', function () {
    // 开启监听
    livereload.listen();
    // 确认监听的目标以及绑定相应的任务
    gulp.watch('src/js/*.js', gulp.series('js'))
    gulp.watch('src/css/*.css', gulp.series('css'))
    gulp.watch('src/less/*.less', gulp.series('less'))
}));

// 注册监视任务 (全自动)
gulp.task('server', gulp.series('default', function () {
    // 配置服务器的选项
    // 微型服务器，读取当前文件的所有配置
    connect.server({
        root: 'dist/',
        livereload: true,   // 实时刷新
        port: 5000
    })

    //open 可以自动打开指定的链接
    open('http://localhost:5000/');

    gulp.watch('src/js/*.js', gulp.series('js'))
    gulp.watch('src/css/*.css', gulp.series('css'))
    gulp.watch('src/less/*.less', gulp.series('less'))
}))