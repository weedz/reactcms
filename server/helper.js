const jwt = require('jsonwebtoken');
const config = require('config');

function verifyAuth(token, accessLevel) {
    if (token) {
        const secret = config.get('authSecretKey');
        try {
            const decoded = jwt.verify(token, secret);
            return decoded.accessLevel >= accessLevel;
        } catch (err) {
            return false;
        }
    }
}

module.exports = {
    verifyAuth
};