'use strict';
const express       = require('express');
const path          = require('path');
const session       = require('express-session');
const FileStore     = require('session-file-store')(session);
const bodyParser    = require('body-parser');
const mysql         = require('mysql');
const myConnection  = require('express-myconnection');
const stylus        = require('stylus');
const nib           = require('nib');
const app           = express();
const config        = require('./config/server');


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
};

app.set('views', path.join(__dirname, 'build/views'));
app.set('view engine', 'ejs');

app.use(stylus.middleware({
  src: __dirname + '/public/stylesheets',
  compile: compile
}));

// Setup serving static assets
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
  secret: 'hjsdfkbhkdfhjbsdfhbsdfh', // CHANGE THIS!!!
  store: new FileStore(),
  saveUninitialized: true,
  resave: false
}));

app.use(bodyParser.urlencoded({extended: true}));

const dbOptions = config.dbOptions;

// Add connection middleware
app.use(myConnection(mysql, dbOptions, 'single'));

//Routes
const usersRouter     = require('./build/routers/users');
const categoryRouter  = require('./build/routers/category');
const aboutRouter     = require('./build/routers/about');
const adminRouter     = require('./build/routers/admin');
const frontpageRouter = require('./build/routers/frontpage');

app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);
app.use('/blog', frontpageRouter)

// This should be the ONLY route in this file!
app.get('/', function(req, res){
  res.redirect('/blog');
});

app.use(function (req, res){
  res.status(404);
  res.render('error', {status: 404, title: '404'});
});

app.use(function (req, res){
  res.status(500);
  res.render('error', {status: 500, title: '500'});
});

//  =================
//  = Start the app =
//  =================

const port = 3010;

app.listen(port, function(){
  console.log('App listening at http://localhost:'+port);
});