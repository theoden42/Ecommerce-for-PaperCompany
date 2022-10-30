/* This file defines the necessary elements of the Express modules
Here we will also call our MySql Module to */

/* commenting out the non required modules for now */
// const createError = require('http-errors');

//importing the necessary modules here
const express = require('express');
const  path = require('path');
const session = require('express-session');
const bodyparser = require('body-parser');
const multer = require('multer');
const indexRouter = require('./routes/index');

const app = express();
const upload = multer();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** Useful MiddleWare */
app.use(upload.array());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret-key',
    resave: 'false',
    saveUninitialized: 'false'
}));


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
