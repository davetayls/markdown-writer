
/**
 * Module dependencies.
 */
/*jshint node:true */
var express = require('express'),
	routes = require('./routes'),
	app = module.exports = express.createServer(),
	port = process.env.PORT || 3000,
	everyauth = require('everyauth')
;

everyauth.debug = true;

// Everyauth
everyauth.github
  .appId("2445bff35beb187e2fe3")
  .appSecret("ab583a48c70eccad5396e81be4e540de8127f349")
  .entryPath('/auth/github')
  .callbackPath('/auth/github/callback')
  .scope('gist')
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, ghUser) {
	session.oauth = accessToken;
	session.uid = ghUser.login;
	console.log(session);
	return session.uid;
  })
  .redirectPath('/')
 ;


// Configuration
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());

	app.use(express.session({ secret: 'your secret here' }));
	app.use(everyauth.middleware());

	app.use(require('stylus').middleware({ src: __dirname + '/public' }));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	port = 3001;
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
	app.use(express.errorHandler());
});
app.locals({
	env: app.settings.env
});

// Routes
app.get('/', routes.index);
app.get('/articles', routes.index);
app.get('/article/:id', routes.index);

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

