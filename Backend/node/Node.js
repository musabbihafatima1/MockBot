const crypto = require('crypto');

// Generate a random 64-byte key in hexadecimal
const secretKey = crypto.randomBytes(64).toString('hex');

// Log the generated secret key
console.log(secretKey);
