//! Food Delivery Main Server 
require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
// const expressLayout = require('express-ejs-layouts')
const flash = require('connect-flash')

//? Middlewares
// app.use(expressLayout);
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(flash());

//? Getting index router
const indexRouter = require('./routes/index')
// Using Routers
app.use('/', indexRouter);
app.use('/cart', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
})