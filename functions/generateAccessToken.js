const jwt = require('jsonwebtoken')

const SECRET = "asdec"
function generateAccessToken(username, role) {
    return jwt.sign({ username, role }, SECRET, { expiresIn: "36000s" });
}

module.exports={generateAccessToken}