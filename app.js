const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars')


const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')


const app = express();
app.engine('handlebars', expressHbs({ layoutsDir: "views/layouts/", defaultLayout: "main" }));
app.set('view engine', 'handlebars');
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
        productCss: false,
        formsCss: false,
        activeAddProd: false,
        activeShop: false,
    })
});

app.listen(3000);
