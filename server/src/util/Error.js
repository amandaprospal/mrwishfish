/**
 * Represents an Error.
 */
export default class Error {
    /**
     * Creates an Error.
     * 
     * @param {Number} statusCode The HTTP status code.
     * @param {String} description A description of the error.
     */
    constructor(statusCode, description) {
        this.statusCode = statusCode;
        this.description = description;
    }

    /**
     * Gets the status code.
     * 
     * @return {Number} The user's first name.
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * Sets the status code.
     * 
     * @param {Number} statusCode The status code.
     */
    setStatusCode(statusCode) {
        this.statusCode = statusCode;
    }

    /**
     * Gets the description.
     * 
     * @return {String} The description.
     */
    getDescription() {
        return this.description;
    }

    /**
     * Sets the description.
     * 
     * @param {String} description The description.
     */
    setDescription(description) {
        this.description = description;
    }

    toString() {
        return 'Status code: ' + this.statusCode + ', Description: ' + this.description;
    }

    print() {
        console.log(this.toString());
    }
}