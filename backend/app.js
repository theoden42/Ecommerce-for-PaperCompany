/* This file defines the necessary elements of the Express modules
Here we will also call our MySql Module to */

//importing the necessary modules here
const express = require('express');
const  path = require('path');
const session = require('express-session');
const bodyparser = require('body-parser');
const indexRouter = require('./routes/index');
const managerRouter = require('./routes/manager');
const employeeRouter = require('./routes/employee');
const customerRouter = require('./routes/customer');

const app = express();

//setting the view engine tpp ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** Useful MiddleWare */
app.use(bodyparser.urlencoded({extended:false})); // helps to parse request body for form data
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serves static files
app.use(session({
    secret: 'secret-key',
    resave: 'false',
    saveUninitialized : 'false'
})); // used to use sessions


// Routes are defined here
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/manager', managerRouter);
app.use('/', indexRouter);

module.exports = app;
