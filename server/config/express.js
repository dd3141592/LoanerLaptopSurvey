
		var express  = require("express"),
		bodyParser   = require('body-parser'),
		pug          = require('pug'),
		cookieParser = require("cookie-parser");
		expressLogging = require('express-logging'),
		path			= require('path'),
    	logger = require('logops');



module.exports = function (config, app) {
    logger.setLevel(config.loggingLevel);

	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
    app.use(expressLogging(logger));

	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'pug');

	app.use(express.static(path.join(config.rootPath,'public')));
	console.log('look for static files at: ' + config.rootPath + '/public' );

};
