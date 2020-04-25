const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'app.db')
});

module.exports = sequelize;