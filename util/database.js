const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'lamiss98', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize; 