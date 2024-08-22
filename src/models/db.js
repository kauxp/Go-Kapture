import { Sequelize } from 'sequelize';

// Extract database connection parameters from environment variables
const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
} = process.env;

console.log("DATABASE DATA => ", DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME);


// Create a new Sequelize instance with the extracted parameters
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false, // Disable logging
});

export default sequelize;
