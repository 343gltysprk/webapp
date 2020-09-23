var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var n = 0;
app.use(function(req, res, next) {
    n++;
     console.log("Received "+n+" requests so far");
next();
});

app.use(session({
    secret: '508510c6-19f3-4278-91ed-347ed4a473e7',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: false }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
