// import { ErrorRequestHandler } from 'express';
// import { httpStatus } from '../config/http.config';
// import { AppError } from '../utils/appError';

// export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
//   console.error(`Error occurred at ${req?.path}`, error);

//   if (error instanceof SyntaxError) {
//     return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid JSON', error: error?.message || 'Unknown error' });
//   }
//   if (error instanceof AppError) {
//     return res.status(error.statusCode).json({ message:error.message, errorCode: error.errorCode });
//   }


//   if (error.name === 'ValidationError') {
//     return res.status(httpStatus.BAD_REQUEST).json({ message: 'Validation Error', error: error.message });
//   }

//   if (error.name === 'UnauthorizedError') {
//     return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized', error: error.message });
//   }

//   if (error.name === 'ForbiddenError') {
//     return res.status(httpStatus.FORBIDDEN).json({ message: 'Forbidden', error: error.message });
//   }

//   if (error.status === httpStatus.NOT_FOUND) {
//     return res.status(httpStatus.NOT_FOUND).json({ message: 'Not Found', error: error.message });
//   }

//   // Default to 500 Internal Server Error for all other cases
//   return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error?.message || 'Unknown error' });
// };

import { ErrorRequestHandler, Response } from "express";
import { httpStatus } from "../config/http.config";
import { AppError } from "../utils/appError";
import { z, ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(httpStatus.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.error(`Error Occured on PATH: ${req.path} `, error);

  if (error instanceof SyntaxError) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknow error occurred",
  });
};