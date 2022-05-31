import Sequelize from 'sequelize'
import sequelize from '../database/database'
import database from '../database/database'

const Product = database.define('product', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    category: Sequelize.INTEGER,
    createTime: Sequelize.TIME,
    price: Sequelize.INTEGER,
    imageUrl: Sequelize.STRING,
    unitsInStock: Sequelize.IINTEGER
});

export default Product;