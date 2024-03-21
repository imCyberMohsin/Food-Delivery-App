const express = require('express')
const router = express.Router()

//? Landing Page / Home
router.get('/', (req, res) => {
    res.render('homePage');
})

//? Cart
router.get('/cart', (req, res)=> {
    res.render('cartPage');
})

module.exports = router;