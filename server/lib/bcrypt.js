const bcrypt = require("bcryptjs");

const generateHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const compareHash = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password) {
    try {
      req.body.password = await generateHash(password);
      next();
    } catch (error) {
      res.status(500).json({ message: "Error hashing password" });
    }
  } else {
    next();
  }
};

module.exports = {
  generateHash,
  compareHash,
  hashPassword,
};
