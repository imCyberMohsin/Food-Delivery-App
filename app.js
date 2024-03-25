//! Food Delivery Main Server 
require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
// const ejs = require('ejs')
// const expressLayout = require('express-ejs-layouts')
const flash = require('connect-flash')

//? Middlewares
// app.use(expressLayout);
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(flash());

//? Getting all web routes
const webRouter = require('./routes/web')
// calling web.js to execute the function inside and passing app instance
webRouter(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
})