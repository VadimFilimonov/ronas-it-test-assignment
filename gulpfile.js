const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const yargs = require('yargs');
const webpackConfig = require('./webpack.config');

let errorHandler;

let argv = yargs.default({
	cache: true,
	ci: false,
	debug: true,
	fix: false,
	minify: false,
	minifyHtml: null,
	minifyCss: null,
	minifyJs: null,
	minifySvg: null,
	notify: true,
	open: true,
	port: 3000,
	spa: false,
	throwErrors: false,
}).argv;

argv.minify = !!argv.minify;
argv.minifyHtml = argv.minifyHtml !== null ? !!argv.minifyHtml : argv.minify;
argv.minifyCss = argv.minifyCss !== null ? !!argv.minifyCss : argv.minify;
argv.minifyJs = argv.minifyJs !== null ? !!argv.minifyJs : argv.minify;
argv.minifySvg = argv.minifySvg !== null ? !!argv.minifySvg : argv.minify;

if (argv.ci) {
	argv.cache = false;
	argv.notify = false;
	argv.open = false;
	argv.throwErrors = true;
}

if (argv.minifyJs) {
	webpackConfig.mode = 'production';
} else {
	webpackConfig.mode = webpackConfig.mode || 'development';
}

let $ = gulpLoadPlugins({
	overridePattern: false,
	pattern: [
		'autoprefixer',
		'browser-sync',
		'connect-history-api-fallback',
		'cssnano',
		'imagemin-mozjpeg',
		'merge-stream',
		'postcss-reporter',
		'postcss-scss',
		'stylelint',
		'uglifyjs-webpack-plugin',
		'vinyl-buffer',
		'webpack',
		'webpack-stream',
	],
	scope: [
		'dependencies',
		'devDependencies',
		'optionalDependencies',
		'peerDependencies',
	],
});

if (argv.throwErrors) {
	errorHandler = false;
} else if (argv.notify) {
	errorHandler = $.notify.onError('<%= error.message %>');
} else {
	errorHandler = null;
}

gulp.task('images', () => {
	return gulp.src('src/images/**/*.*')
		.pipe($.if(argv.cache, $.newer('build/images')))
		.pipe($.if(argv.debug, $.debug()))
		.pipe(gulp.dest('build/images'));
});

gulp.task('html', () => {
	return gulp.src([
		'src/**/*.html',
	])
		.pipe(gulp.dest('build/'));
});

gulp.task('scss', () => {
	return gulp.src([
		'src/scss/*.scss',
		'!src/scss/_*.scss',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.sourcemaps.init())
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.postcss([
			argv.minifyCss ?
				$.cssnano({
					autoprefixer: {
						add: true,
						browsers: ['> 0%'],
					},
					calc: true,
					discardComments: {
						removeAll: true,
					},
					zindex: false,
				})
				:
				$.autoprefixer({
					add: true,
					browsers: ['> 0%'],
				}),
		]))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('build/css'));
});

gulp.task('js', () => {
	return gulp.src(webpackConfig.entry)
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.webpackStream(webpackConfig))
		.pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task('lint:scss', () => {
	return gulp.src([
		'src/scss/**/*.scss',
		'!src/scss/vendor/**/*.scss',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.postcss([
			$.stylelint(),
			$.postcssReporter({
				clearReportedMessages: true,
				throwError: argv.throwErrors,
			}),
		], {
			parser: $.postcssScss,
		}));
});

gulp.task('lint:js', () => {
	return gulp.src([
		'*.js',
		'src/js/**/*.js',
		'!src/js/vendor/**/*.js',
	], {
		base: '.',
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.eslint({
			fix: argv.fix,
		}))
		.pipe($.eslint.format())
		.pipe($.if((file) => file.eslint && file.eslint.fixed, gulp.dest('.')));
});

gulp.task('watch', () => {
	gulp.watch('src/images/**/*.*', gulp.series('images'));
	gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
	gulp.watch('src/js/**/*.js', gulp.series('js'));
});

gulp.task('serve', () => {
	let middleware = [];

	if (argv.spa) {
		middleware.push($.connectHistoryApiFallback());
	}

	$.browserSync
		.create()
		.init({
			notify: false,
			open: argv.open,
			port: argv.port,
			files: [
				'./build/**/*',
			],
			server: {
				baseDir: './build',
				middleware,
			},
		});
});

gulp.task('lint', gulp.series(
	'lint:scss',
	'lint:js'
));

gulp.task('build', gulp.parallel(
	'images',
	'html',
	'scss',
	'js'
));

gulp.task('default', gulp.series(
	'build',
	gulp.parallel(
		'watch',
		'serve'
	)
));
