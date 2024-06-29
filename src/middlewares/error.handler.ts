const logErrors = (error, _req, _res, next) => {
  console.log(error);
  next(error);
};

const errorHandler = (error, _req, res, _next) => {
  if (!error.isBoom) {
    return res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
  _next(error); // Llama a _next solo si no es un error Boom
};

const boomErrorHandler = (error, _req, res, _next) => {
  if (error.isBoom) {
    const { output } = error;
    return res.status(output.statusCode).json(output.payload);
  }
  _next(error); // No necesita llamar a _next si es un error Boom
};

export { logErrors, errorHandler, boomErrorHandler };
