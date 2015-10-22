var gulp = require('gulp');
var gulpInject = require('gulp-inject');
var concat = require('gulp-concat');

var config = {
	clientAppFolder: './client/app',
	clientAngularAppFiles: './client/app/**/*.js',
	clientStylesFiles: './client/styles/**/*.css',
	serverPublicFolder: './server/public',
	webIndex: './server/views/layout.ejs',
	libraries: ['./node_modules/angular/angular.js', 
		'./node_modules/angular-aria/angular-aria.js', 
		'./node_modules/angular-animate/angular-animate.js', 
		'./node_modules/angular-material/angular-material.js'
	]
}

gulp.task('default', ['include-files-in-html', 'watch']);

gulp.task('move-application-files', function() {
	// Copy all the client static files to the server public folder
	// so they can be serve
	return gulp.src(['./client/app/todoApp.js' , config.clientAngularAppFiles])
		.pipe(concat('todo.js'))
		.pipe(gulp.dest(config.serverPublicFolder));
});

gulp.task('move-libraries', function() {
	return gulp.src(config.libraries)
		.pipe(gulp.dest(config.serverPublicFolder + '/libs'));
});

gulp.task('move-styles', function() {
	return gulp.src(['./node_modules/angular-material/angular-material.css', config.clientStylesFiles])
		.pipe(gulp.dest(config.serverPublicFolder + '/styles'));
});

gulp.task('include-files-in-html', [ 'move-libraries', 'move-application-files', 'move-styles'], function() {
	// Get the target file for injection
	var target = gulp.src(config.webIndex);
	
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var librarySources = gulp.src([config.serverPublicFolder + '/libs/angular.js', config.serverPublicFolder + '/libs/**/*.js'], {read: false});
	
	// Get Styles
	var styles = gulp.src([config.serverPublicFolder + '/styles/**/*.css']);
	
	// Get the application files
	var appSources = gulp.src([config.serverPublicFolder + '/**/*.js', '!' + config.serverPublicFolder + '/libs/**/*'], {read: false});
 
 	// Inject the dependencies and application files into the index.html
  return target
		.pipe(gulpInject(librarySources, {ignorePath: 'server/public'}))
		.pipe(gulpInject(styles, {ignorePath: 'server/public'}))
		.pipe(gulpInject(appSources, {name: 'application', ignorePath: 'server/public'}))
    .pipe(gulp.dest('./server/views'));
});

gulp.task('watch', function() {
	gulp.watch([config.clientAngularAppFiles, config.webIndex], ['include-files-in-html'])
});