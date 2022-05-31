import Sequelize from 'sequelize'
import sequelize from '../database/database.js'
import database from '../database/database.js'

const User = database.define('User', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fName: Sequelize.STRING,
    lName: Sequelize.STRING,
    userEmail: Sequelize.STRING,
    userPassword: Sequelize.STRING,
    userPasscode: Sequelize.INTEGER,
    isAuthorized: {
        type: Sequelize.BOOLEAN,
        default: false
    }
});
export default User;