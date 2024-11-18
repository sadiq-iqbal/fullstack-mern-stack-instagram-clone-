
const { ValidationError } = require('joi');
const logger = require('./logger');
const logEvents = require('../utils/log');

const errorHandler = (error, req, res, next) => {
    // default error
    let status = 500;
    let data = {
        message: 'Internal Server Error'
    }

    if (error instanceof ValidationError) {
        status = 422;
        data.message = error.message;

        return res.status(status).json(data);
    }

    if (error.status) {
        status = error.status;
    }

    if (error.message) {
        data.message = error.message;
    }
    logEvents(`${error.message} : ${error.name}`, 'errorLogs.txt');
    return res.status(status).json(data);
}

module.exports = errorHandler;
