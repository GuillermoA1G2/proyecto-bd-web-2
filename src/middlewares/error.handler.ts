const logErrors = (error, _req, _res, next) => {
  console.log(error);
  next(error);
}

const errorHandler = (error, _req, res, _next) => {
  if (!error.isBoom) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
  next(error); // Llama a next solo si no es un error Boom
}

const boomErrorHandler = (error, _req, res, _next) => {
  if (error.isBoom) {
    const { output } = error;
    return res.status(output.statusCode).json(output.payload);
  }
  next(error); // No necesita llamar a next si es un error Boom
}

export { logErrors, errorHandler, boomErrorHandler };