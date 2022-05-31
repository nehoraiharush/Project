import Sequelize from 'sequelize'
import sequelize from '../database/database'
import database from '../database/database'

const catrgoty = database.define('categoty', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
});

export default categoty;