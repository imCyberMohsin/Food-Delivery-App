require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const path = require('path')
// const expressLayout = require('express-ejs-layouts')
const app = express()

//? View Engine Setup
// app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs')

app.get('/', (req, res)=> {
    res.render("index")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
})