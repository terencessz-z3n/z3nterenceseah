require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    max: 30,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});

const UserConnection = require('./users.model');
const User = new UserConnection(pool);

module.exports = {
    User
};
