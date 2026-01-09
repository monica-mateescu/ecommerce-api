import { type ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode =
    typeof err.cause === "number" ? err.cause : 500;

  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
      status: statusCode,
    },
  });
};

export default errorHandler;