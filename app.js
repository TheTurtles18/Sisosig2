var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var favicon = require('serve-favicon');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//Set up envirnment 
process.env.NODE_ENv = 'developement';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


function _initializeModels (){
  mongoose.connect(config.db);
  mongoose.connection.on('error', function(err){
    console.log('Mongodb failed to connect', {err: err});
  })
}


_initializeModels();

  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
