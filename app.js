//! Food Delivery Main Server 
require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
// const ejs = require('ejs')
// const expressLayout = require('express-ejs-layouts')
const flash = require('express-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');   // passport.js for login

//? Database Connection
mongoose.connect(process.env.MONGO_URI);
const DB = mongoose.connection;
DB.on('open', () => console.log("Connected To FoodWebsite-DB"));
DB.on('error', (error) => console.error(error));

//? Middlewares
// app.use(expressLayout);                          // using express layout
app.use(express.urlencoded({ extended: true }));    // to parse form data
app.set('views', path.join(__dirname, '/views'));   // views path
app.set('view engine', 'ejs');                      // view engine setup
app.use(express.static('public'));                  // static folder path
app.use(flash());                                   // using flash message
app.use(express.json());                            // to parse json data

//? Session Config (to store a session to the DB)
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },     // 24hrs cookies validation
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,         // MongoDB connection URL
        collectionName: 'sessions',              // Collection name in the DB
    })
}))

//? Passport config 
const passportConfig = require('./app/config/passport');
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//? Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session; // For Session
    res.locals.user = req.user;       // For User
    next()
    // console.log(req.session);
})

//? Getting all web routes
const webRouter = require('./routes/web')
// calling web.js to execute the function inside and passing app instance
webRouter(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})