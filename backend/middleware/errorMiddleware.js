const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message; // will show the error message passed in throw new Error

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
  });
};

export { notFound, errorHandler };
