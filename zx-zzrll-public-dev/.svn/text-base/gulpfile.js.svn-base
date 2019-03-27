var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins({
	DEBUG: false, // when set to true, the plugin will log info to console. Useful for bug reporting and issue debugging
	pattern: '*', // the glob(s) to search for
	scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
	replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
	camelize: true, // if true, transforms hyphenated plugins names to camel case
	lazy: true, // whether the plugins should be lazy loaded on demand
	rename: {
		'gulp-clean-css': 'cleanCSS',
		'jshint': 'jshint1',
		'imagemin-pngquant': 'pngquant'
	},
	
});

$.config = {
	//DEV DEBUG PRO
	env: 'DEV',
	publishMobile: false,
	srcPath: "./src",
	distPath: "./target/webroot",
	tmpPath: "./tmp",
	androidPath: '/Users/LHY/Documents/workspace/Cordova/ProjectManage/platforms/android/assets/www',
	iOSPath: '/Users/LHY/Documents/workspace/Cordova/ProjectManage/platforms/ios/www',
}

function isDebug() {
	return 'DEBUG' == $.config.env;
}

// 什么都不做 用于临时替换操作
var _return = $.through2.obj(function(file, enc, cb) {
	console.log(file.path);
	cb(null, file);
});

var doNothing = function() {
	return _return;
}
doNothing.init = function() {
	return _return;
};
doNothing.write = function() {
	return _return;
};

//清理dist 和 tmp 文件夹 为构建新的发布文件做清理工作
gulp.task('clean-dist', () => {
	//默认的删除路径
	var deleteArrs = [$.config.distPath + '/{index.html,css,html,js,resources}', $.config.tmpPath];
	if($.config.publishMobile) {
		deleteArrs.push($.config.androidPath, $.config.iOSPath)
	}

	return $.del(deleteArrs, {
		force: true
	});
});

//清空cache
gulp.task('clean-cache', function(done) {
	return $.cache.clearAll(done);
});

//清理cache 以及相关目录
gulp.task('clear', ['clean-dist', 'clean-cache']);
//复制其他文件任务
gulp.task('copy-others', ['clear'], task_copy_others);
gulp.task('copy-others-watch', task_copy_others);
//复制html文件任务
gulp.task('useref-html', ['clear'], task_useref_html);
gulp.task('useref-html-watch', task_useref_html);
//复制html文件任务
gulp.task('copy-html', ['clear'], task_copy_html);
gulp.task('copy-html-watch', task_copy_html);
//检查js错误 暂时不用
gulp.task('jslint', ['clear'], task_jslint);
gulp.task('jslint-watch', task_jslint);
//压缩js
gulp.task('minify-js', ['clear'], task_minify_js);
gulp.task('minify-js-watch', task_minify_js);
//压缩图片
gulp.task('minify-image', ['clear'], task_minify_image);
gulp.task('minify-image-watch', task_minify_image);

//复制其他文件
function task_copy_others() {
	return gulp.src([$.config.srcPath + '/resources/fonts/*', $.config.srcPath + '/css/module.css', $.config.srcPath + '/js/config/*'], {
			base: $.config.srcPath
		})
		.pipe(gulp.dest($.config.distPath))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.androidPath)))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.iOSPath)));
}
//复制并处理html中的js 以及 css
function task_useref_html() {
	return gulp.src([$.config.srcPath + '/index.html'], {
			base: $.config.srcPath
		})
		.pipe($.useref({}, $.lazypipe().pipe($.sourcemaps.init, {
			loadMaps: true
		})))
		.pipe($.if('*.js', $.if(!isDebug(), $.uglify())))
		.pipe($.if('*.css', $.if(!isDebug(), $.cleanCSS())))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest($.config.distPath))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.androidPath)))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.iOSPath)));
}
//复制html 文件 由于在watch时useref对某些文件并不更新 所以单独处理 watch时只复制修改了的文件
function task_copy_html() {
	return gulp.src([$.config.srcPath + '/html/**/*.html'], {
			base: $.config.srcPath
		})
		.pipe($.cached('html'))
		.pipe(gulp.dest($.config.distPath))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.androidPath)))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.iOSPath)));
}
//检查js错误
function task_jslint() {
	return gulp.src($.config.tmpPath + '/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'));
}
//压缩js
function task_minify_js() {
	return gulp.src([$.config.srcPath + '/js/**/*.{js,jsx}', '!'+$.config.srcPath + '/js/lib/*/*.js', '!'+$.config.srcPath + '/js/{config,app}/**', '!'+$.config.srcPath + '/js/*.js'], {
			base: $.config.srcPath
		})
		.pipe($.cached('js'))
		.pipe($.sourcemaps.init())
		.pipe($.if(!isDebug(), $.uglify()))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest($.config.distPath))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.androidPath)))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.iOSPath)));
}
//压缩图片
function task_minify_image() {
	return gulp.src($.config.srcPath + '/resources/**/*.{png,jpg,gif,ico}', {
			base: $.config.srcPath
		})
		.pipe($.cached('imgs'))
		.pipe($.if('PRO' == $.config.env, $.cache($.imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [$.pngquant()]
		}))))
		.pipe(gulp.dest($.config.distPath))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.androidPath)))
		.pipe($.if($.config.publishMobile, gulp.dest($.config.iOSPath)));
}

var webserverConfig = {
	livereload: true,
	host: '192.168.8.104',
	directoryListing: true,
	port: 8000, //测试服务端口号 默认为 8000
	open: '/index.html', //自动打开浏览器 并打开http://localhost:8000/index.html
}

//开发构建流程 会清空相关目录 进行全新的构建流程 由于压缩图片耗时太长
gulp.task('build', ['copy-others', 'useref-html', 'copy-html', 'minify-js', 'minify-image']);

gulp.task('default', ['watch']);

//检测文件变化 构建页面 不清空相关路径
gulp.task('watch', ['build'], () => {
	gulp.src($.config.distPath).pipe($.webserver(webserverConfig));
	//js修改则压缩js
	addDeleteEvent(gulp.watch([$.config.srcPath + '/js/**/*.{js,jsx}', '!' + $.config.srcPath + '/js/lib/**' , '!' + $.config.srcPath + '/js/config/**',  '!' + $.config.srcPath + '/js/*.js'], ['minify-js-watch']));
	//index.html等相关修改 需要压缩合并 js和 css
	addDeleteEvent(gulp.watch([$.config.srcPath + '/index.html', $.config.srcPath + '/css/**', $.config.srcPath + '/js/*.js', $.config.srcPath + '/js/lib/**', $.config.srcPath + '/js/config/**', $.config.srcPath + '/js/utils/**', $.config.srcPath + '/js/app/**'], ['useref-html-watch']));
	//html文件修改 只需要复制文件
	addDeleteEvent(gulp.watch([$.config.srcPath + '/html/**'], ['copy-html-watch']));
	//其他资源文件修改 增量复制
	addDeleteEvent(gulp.watch($.config.srcPath + '/resources/fonts/*', ['copy-others-watch']));
	//图片修改则增量压缩图片
	addDeleteEvent(gulp.watch($.config.srcPath + '/resources/**/*.{png,jpg,gif,ico}', ['minify-image-watch']));
});

/**
 * 如果文件删除 则从缓存列表中去掉文件
 * @param watcher
 */
function addDeleteEvent(watcher) {
	watcher.on('change', function(e) {
		if(e.type === 'deleted') {
			var cacheNameArr = ['html', 'css', 'js', 'imgs', 'html-js'];
			for(var i of cacheNameArr) {
				if($.cached.caches[cacheNameArr[i]] && e.path) {
					delete $.cached.caches[cacheNameArr[i]][e.path];
					$.remember.forget(cacheNameArr[i], e.path);
				}
			}
		}
	});
}