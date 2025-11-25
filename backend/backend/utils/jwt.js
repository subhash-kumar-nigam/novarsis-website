const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// Verify a token (both access or refresh)
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.secret);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

// Create access token
exports.createToken = (data) => {
  return jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.ttl });
};

// Create refresh token (usually longer expiry)
exports.createRefreshToken = (data) => {
  return jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.refreshTtl });
};
