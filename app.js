const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

//parse the req.body 
app.use('/', bodyParser.urlencoded({ extended: false }));

//serve fila statically 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {
        title: "Page Not Found",
        path: res.path,
        productCss: false,
        formsCss: false,
        activeAddProd: false,
        activeShop: false,
    })
});

app.listen(3000);
