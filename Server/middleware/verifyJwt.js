const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJwt = (req, res, next) => {
    // Extract access token from cookies
    console.log(req.cookies);
    const accessToken = req.cookies?.accessToken;
    console.log(accessToken);
    // If no access token is found in cookies, respond with 401 Unauthorized
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    try {
        // Verify the access token using the secret key
        const decoded = jwt.verify(accessToken, process.env.ATSK);

        // Attach the decoded user ID to the request object for further use
        req.user_Id = decoded.id;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid or expired, respond with 401 Unauthorized
        return res.status(401).json({ message: 'Invalid or expired access token' });
    }
};

module.exports = verifyJwt;
