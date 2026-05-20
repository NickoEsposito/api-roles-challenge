class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Captura el stack trace para depuración (solo en V8/Node)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
