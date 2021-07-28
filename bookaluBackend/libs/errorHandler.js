'use strict';

class ErrorHandler {

    /**
     * Handle the errors
     */
    static handleError(error) {
        return {
            status: error.status || 500,
            data: {
                message: error.message,
            }
        };
    }
}

module.exports = ErrorHandler;