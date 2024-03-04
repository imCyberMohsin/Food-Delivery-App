let mix = require('laravel-mix')


// (location of file to compile, location to store compiled file)
mix.js('/resources/js/app.js', '/public/js/app.js').sass('/resources/js/app.scss', '/public/js/app.css')