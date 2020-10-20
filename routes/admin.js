const express = require('express');
const router = express.Router();


router.get('/add-product', (req, res, next) => {
    res.send('<form method="POST" action="/product"><input type="text" name="title" ><button type="submit" >send</button></input></form>');
});

router.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
    res.send('<h1>Hello to Product!</h1>');
});

module.exports = router; 