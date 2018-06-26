'use strict';

var config = require('../../../../config/config.js');
var mysql = require('mysql');

/**
 * Represents the Data Access Layer (DAL).
 */
export default class DAL {
    /**
     * Creates a Data Access Layer.
     */
    constructor() {
        this._connectionPool = mysql.createPool({
            host: config.database.url,
            port: config.database.port,
            user: config.database.user,
            password: config.database.password,
            database: config.database.name
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