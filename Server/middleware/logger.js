const fs = require('node:fs');
const logEvents = require('../utils/log');
const fsSync = require('node:fs').promises;
const logger = async (req, res, next) => {
    logEvents(`${req.path} :\t ${req.host} :\t ${req.method} \t`, 'myLogs.txt')
    next();
}

module.exports = logger; 