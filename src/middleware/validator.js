const AppError = require('../utils/AppError');

const validateRole = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(new AppError('Role name is required and cannot be empty', 400));
  }
  next();
};

module.exports = {
  validateRole
};
