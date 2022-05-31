import Sequelize from 'sequelize'
import sequelize from '../database/database.js'
import database from '../database/database.js'

const categoty = database.define('category', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
});

export default categoty;