'use strict';

var gulp = require('gulp'),
	gulpif = require("gulp-if"),
	changed = require('gulp-changed'),
	sass = require('gulp-ruby-sass'),
	csso = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	to5ify = require('6to5ify'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	rev = require('gulp-rev'),
	config = {
		jsx: './app/scripts/app.jsx',
		scss: 'app/styles/main.scss',
		bundle: 'app.js',
		distJs: 'dist/js',
		distCss: 'dist/css',
		sassPath: './app/styles'
	},
	fs = require('fs'),
	through = require('through2'),
	gutil = require('gulp-util'),
	log = gutil.log,
	colors = gutil.colors,
	replace = require("gulp-replace"),
	$ = require('gulp-load-plugins')();
var concatCss = require('gulp-concat-css');


var libs = [
	"jquery",
	"bootstrap"
];

gulp.task('browserify-libs', function () {
	var b = browserify({
		debug: true
	});

	libs.forEach(function (lib) {
		b.require(lib);
	});

	return b.bundle()
		//   .on('error', handleErrors)
		.pipe(source('appLibs.js'))
		// TODO use node_env instead of "global.buildNoWatch"
		.pipe(gulpif(global.buildNoWatch, buffer()))
		.pipe(gulpif(global.buildNoWatch, uglify()))
		.pipe(gulp.dest('./build'));
});

gulp.task('icons', function () { 
	return gulp.src('./app/styles/libs/fontawesome/fonts/**.*') 
		.pipe(gulp.dest('./dist/fonts')); 
});

gulp.task('clean', function (cb) {
	del(['dist'], cb);
});

gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: './dist'
		}
	})
});


gulp.task('css', function () { 
	return sass(config.sassPath, { 
			style: 'compressed',
			 loadPath: ['./app/styles/libs/bootstrap-sass-3.3.2/assets/stylesheets', './app/styles/libs/fontawesome/scss', './app/styles/libs/readability']
		})
		.on("error", notify.onError(function (error) { 
			return "Error: " + error.message; 
		}))  
		.pipe(gulp.dest('./dist/css')); 
});


gulp.task('watchify', function () {
	var bundler = watchify(browserify(config.jsx, watchify.args));

	function rebundle() {
		return bundler
			.bundle()
			.on('error', notify.onError())
			.pipe(source(config.bundle))
			.pipe(gulp.dest(config.distJs))
			.pipe(reload({
				stream: true
			}));
	}

	bundler.transform(to5ify)
		.on('update', rebundle);
	return rebundle();
});


// HTML
gulp.task('html', function () {
	return gulp.src('app/*.html')
		.pipe($.useref())
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});


// Images
gulp.task('images', function () {
	return gulp.src('app/images/**/*')
		.pipe($.cache($.imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
		.pipe($.size());
});

// Robots.txt and favicon.ico
gulp.task('extras', function () {
	return gulp.src(['app/*.txt', 'app/*.ico'])
		.pipe(gulp.dest('dist/'))
		.pipe($.size());
});


gulp.task('browserify', function () {
	return browserify(config.jsx)
		.transform(to5ify)
		.bundle()
		.pipe(source(config.bundle))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.distJs))
});

gulp.task('styles', function () {
	return gulp.src(['app/styles/main.scss'])
		.pipe(changed(config.distCss))
		.pipe(sass({
			errLogToConsole: true
		}))
		.on('error', notify.onError())
		.pipe(autoprefixer('last 1 version'))
		.pipe(csso())
		.pipe(gulp.dest(config.distCss))
		.pipe(reload({
			stream: true
		}));
});
var rmOrig = function () {
	return through.obj(function (file, enc, cb) {
		this.push(file); // We'll just pass this file along

		if (!file.revOrigPath) {
			log('nothing to remove');
			return cb(); // Nothing to remove :)
		}

		log(colors.red('DELETING'), file.revOrigPath);
		fs.unlink(file.revOrigPath, function (err) {
			// TODO: emit an error if err
			cb();
		});
	});
};


gulp.task('revision-css', ['css'], function () {
	return gulp.src(['dist/css/*.css'])
		.pipe(gulp.dest('dist/css'))
		.pipe(rev())
		.pipe(gulp.dest('dist/css'))
		.pipe(rmOrig())
		.pipe(rev.manifest('dist/rev-manifest.json', {
			merge: true
		}))
		.pipe(gulp.dest(''));
});

gulp.task('revision-js', ['browserify'], function () {
	return gulp.src(['dist/js/*.js'])
		.pipe(gulp.dest('dist/js'))
		.pipe(rev())
		.pipe(gulp.dest('dist/js'))
		.pipe(rmOrig())
		.pipe(rev.manifest('dist/rev-manifest.json', {
			merge: true
		}))
		.pipe(gulp.dest(''));
});


gulp.task("revreplace", ["revision-js", "revision-css"], function () {
	var manifest = require("./dist/rev-manifest.json");
	var stream = gulp.src(["./dist/index.html"]);


	Object.keys(manifest)
		.reduce(function (stream, key) {
			return stream.pipe(replace(key, manifest[key]));
		}, stream)
		.pipe(gulp.dest('./dist'));
});

gulp.task('watchTask', function () {
	gulp.watch(['app/styles/*.css'], ['css']);
});

gulp.task('watch', ['clean'], function () {
	gulp.start(['browserSync', 'watchTask', 'watchify', 'css', 'html']);
});

gulp.task('build', ['clean'], function () {
	//	process.env.NODE_ENV = 'production';
	gulp.start(['browserify', 'css', 'revision-css', 'revision-js', 'revreplace', 'html']);
});

gulp.task('default', ['watch'], function () {
	console.log('Running "gulp watch"');
});
