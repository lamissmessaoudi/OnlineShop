const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

//add user to req
app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    })
        .catch(err => console.log(err))
})

//parse the req.body 
app.use('/', bodyParser.urlencoded({ extended: false }));

//serve fila statically 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    //.sync({ force: true })// to overwrite the old tabls and create new ones 
    .sync()
    .then(result => { return User.findByPk(1) })
    .then(user => {
        if (!user) { return User.create({ name: 'lamiss', email: 'a@a.com' }); }
        return user;
    })
    .then(result => {
        //console.log(result);
        app.listen(3000);
    })
    .catch(err => { console.log(err); })

