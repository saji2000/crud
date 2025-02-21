const { hash, genSalt } = require("bcrypt");

// Hashing the password
exports.hash = async (value) => {
  const salt = await genSalt(12);

  const result = await hash(value, salt);
  return result;
};
