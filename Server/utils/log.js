const fsPromise = require('fs').promises; // Use fs.promises only for async methods
const path = require('path');
const { format } = require('date-fns');

const logEvents = async (message, logName) => {
    const date = new Date();
    const formattedDate = format(date, 'yyyy-MM-dd\tHH:mm:ss');
    const logItem = `${formattedDate}\t${message}\n`;
    console.log(logItem);

    try {
        const logDir = path.join(__dirname, '..', 'logs'); // Get the logs directory path

        // Check if the directory exists asynchronously and create it if not
        try {
            await fsPromise.access(logDir); // Check if the directory exists
        } catch (error) {
            // If not, create the directory
            await fsPromise.mkdir(logDir, { recursive: true });
        }

        // Append the log item to the specified log file
        await fsPromise.appendFile(path.join(logDir, logName), logItem);
    }
    catch (error) {
        console.log('Error while logging:', error.message);
    }
};

module.exports = logEvents;
