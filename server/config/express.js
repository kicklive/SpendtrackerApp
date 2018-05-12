var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require("express-session");

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    // app.set('views',__dirname+'/server/views');
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(
        session({
            secret: "multi vision unicorns",
            resave: false,
            saveUninitialized: false
        })
    );

    //for stylus . Config stylus middleware
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));


    //this tells express that anytime a request come into the public directory that 
    //matches to a file in the public directory, go ahead and server up that file
    app.use(express.static(config.rootPath + '/public'));
};