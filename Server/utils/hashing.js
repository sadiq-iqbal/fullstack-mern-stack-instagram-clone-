const bycrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = hashPassword;