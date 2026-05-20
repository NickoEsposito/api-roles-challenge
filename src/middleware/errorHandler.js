// Middleware centralizado de manejo de errores
const errorHandler = (err, req, res, next) => {
  // Si el error tiene un statusCode, es un error operacional controlado (AppError)
  // Si no, lo asumimos como un Error 500 (Interno del servidor)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Si estamos en entorno de desarrollo, podríamos querer imprimir el stack trace, 
  // pero para la respuesta del cliente mantenemos la estructura JSON limpia
  console.error(`[Error] ${statusCode} - ${message}`);
  if (statusCode === 500 && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: message
    }
  });
};

module.exports = errorHandler;
