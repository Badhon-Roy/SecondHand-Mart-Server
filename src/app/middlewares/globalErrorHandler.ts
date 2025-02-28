import { ErrorRequestHandler } from "express";
import config from "../config";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
  return;
};

export default globalErrorHandler;
