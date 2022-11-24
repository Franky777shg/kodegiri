const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY);
  },
  validateToken: (token) => {
    return jwt.verify(token, process.env.JWT_KEY);
  },
};
