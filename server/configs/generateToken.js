const jwt = require("jsonwebtoken")

// FUNCTION TO GENERATE JWT TOKEN
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

module.exports = generateToken