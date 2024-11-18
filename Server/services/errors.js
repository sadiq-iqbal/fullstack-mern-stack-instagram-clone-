class DuplicateValueError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateValueError';
        this.status = 409;
    }
}
module.exports = DuplicateValueError;