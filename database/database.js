import Sequelize from 'sequelize'
const sequelize = new Sequelize(
    'shop_online',
    'root',
    'admin',
    {
        dialect: 'mysql',
        host: 'localhost',

    }
);

export default sequelize;