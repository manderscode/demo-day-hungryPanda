// server.js

// set up ======================================================================
// get all the tools we need
// change all of these to "const"
var express = require('express')
var app = express()
var port = process.env.PORT || 8800
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')
var ObjectId = require ('mongodb').ObjectId

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
require("dotenv").config({ path: "./config/.env" });
var configDB = require('./config/database.js')
const override = require('method-override')

var db

// configuration ===============================================================
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(configDB.url, (err, database) => {
	if (err) return console.log(err)
	db = database
	require('./app/routes.js')(app, passport, db, ObjectId)
}) // connect to our database

require('./config/passport')(passport) // pass passport for configuration

// set up our express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs') // set up ejs for templating
app.use(override('_method'))
// required for passport
app.use(
	session({
		secret: 'rcbootcamp2021b', // session secret
		resave: true,
		saveUninitialized: true,
	})
)
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

// launch ======================================================================
app.listen(port)
console.log('The magic happens on port ' + port)
