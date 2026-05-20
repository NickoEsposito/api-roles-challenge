const AppError = require('../utils/AppError');

// Middleware para validar la creación o actualización de roles
const validateRole = (req, res, next) => {
  const { name } = req.body;
  
  // Validamos que el nombre esté presente y no sea un string vacío
  if (!name || typeof name !== 'string' || name.trim() === '') {
    // Pasamos el error al middleware manejador de errores
    return next(new AppError('Role name is required and cannot be empty', 400));
  }
  
  next();
};

module.exports = {
  validateRole
};
