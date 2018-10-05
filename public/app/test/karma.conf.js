// Karma configuration
// Generated on Fri May 11 2018 16:02:27 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../../vendor/angular/angular.js',

            'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.15/angular-ui-router.min.js',
            '../../vendor/angular-route/angular-route.js',
            '../../vendor/angular-ui/build/angular-ui.js',
            '../../vendor/angular-ui-grid/ui-grid.min.js',
            '../../vendor/angular-ui-grid/ui-grid.core.min.js',
            '../../vendor/angular-ui-grid/ui-grid.grouping.min.js',


            '../../vendor/angular-resource/angular-resource.js',
            '../../vendor/angular-mocks/angular-mocks.js',


            '../app.js',
            '../services/general/*.js',
            '../services/budgetsservice/*.js',
            '../services/transactionsservice/*.js',
            '../filters/*.js',
            '../controllers/budgets/*.js',
            '../controllers/transactions/*.js',
            '../controllers/items/*.js',
            'unit/*js'
        ],


        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Allow remote debugging when using PhantomJS
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                debug: true,
            },
        },

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}