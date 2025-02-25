const { hash, genSalt } = require("bcrypt");
const { createHmac } = require("crypto");

// Hashing the password
exports.hash = async (value) => {
  const salt = await genSalt(12);

  const result = await hash(value, salt);
  return result;
};

exports.hmacProcess = async (value, key) => {
  const result = createHmac("sha256", key).update(value).digest("hex");
  return result;
};
