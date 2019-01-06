'use strict';

require('dotenv').config();

var mysql = require('mysql');

/**
 * Represents the Data Access Layer (DAL).
 */
class DataAccessLayer {
    /**
     * Creates a Data Access Layer.
     */
    constructor() {
        console.log("Creating a new connection POOL");
        this._connectionPool = mysql.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || 3306,
            database: process.env.DB_DATABASE || 'wishlist',
            user: process.env.DB_USERNAME || '',
            password: process.env.DB_PASSWORD || ''
        });
    }

    /**
     * Gets the connection pool from the Data Access Layer.
     * 
     * @return {Object} The Data Access Layer's connection pool.
     */
    getConnectionPool() {
        return this._connectionPool;
    }

    /**
     * Closes the Data Access Layer's connection pool.
     * 
     * @return void
     */
    closeConnectionPool() {
        this._connectionPool.end();
    }
}

const DAL = new DataAccessLayer();

export default DAL.getConnectionPool();