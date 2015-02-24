# boilerplated react 
React w/ gulp, browserify, sass, uglify, cache-busting, routing, superagent, bootstrap

I wanted to try out react and ended up with something that could be used as a starter / boilerplate.

## Usage

__Clone this repository:__

`git clone git@github.com:m4tty/boilerplated-react.git`

__Install the dependencies:__

`npm install`

__Development mode with livereload:__

`gulp watch`

__Create a minified/rev-ed dist:__

`gulp build`

## Tools used:

__Build__
- [Gulp](http://gulpjs.com/)

__Styles__
- [Gulp-sass](https://www.npmjs.org/package/gulp-sass)
- [Gulp-csso](https://www.npmjs.org/package/gulp-csso)
- [gulp-autoprefixer](https://www.npmjs.org/package/gulp-autoprefixer)

__JSX tranform/ES6 support__
- [6to5](https://github.com/6to5/6to5)

__Minification__
- [Gulp-uglify](https://github.com/terinjokes/gulp-uglify/)

__Cache Busting__
- [Gulp-rev](https://github.com/sindresorhus/gulp-rev)
- [Gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace)

__Modules__
- [Browserify](http://browserify.org/)

__Ajax__
- [Superagent](http://visionmedia.github.io/superagent/)

__Routing__
- [React-router](https://github.com/rackt/react-router)

__Server/livereload__
- [Browser Sync](http://www.browsersync.io/)
