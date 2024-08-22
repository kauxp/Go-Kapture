import { Sequelize, DataTypes } from 'sequelize';
import sequelize from './db.js';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Admin', 'User'),
        defaultValue: 'User'
    }
}, {
    timestamps: false 
});

await sequelize.sync({ force: true });
export default User;
