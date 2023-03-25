const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let message = errors.array().map(({ msg }) => msg);
    res.status(400);
    throw new Error(message);
  }
  next();
};

module.exports = validator;
