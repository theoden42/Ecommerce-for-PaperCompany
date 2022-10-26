/* This file defines the necessary elements of the Express modules
Here we will also call our MySql Module to */

/* commenting out the non required modules for now */
// const createError = require('http-errors');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');


//importing the necessary modules here
const express = require('express');
const  path = require('path');
const { db } = require('./connectsql.js');
const indexRouter = require('./routes/index');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* unused middleware */

// initialising app with utility packages
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

/** Useful MiddleWare */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);




// /** Utility Error Handling requires error module*/
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
