'use strict';

var mysql = require('mysql');

/**
 * Represents the Data Access Layer (DAL).
 */
class DAL {
    /**
     * Creates a Data Access Layer.
     */
    constructor() {
        this._connectionPool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "wishlist"
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

module.exports = DAL;