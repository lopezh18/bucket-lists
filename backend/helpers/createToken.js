const jwt = require("jsonwebtoken");
const { SECRET, OPTIONS } = require("../config");


/** return signed JWT from user data. */

function createToken(user) {
  let payload = {
    username: user,
  };

  return jwt.sign(payload, SECRET, OPTIONS);
}


module.exports = createToken;