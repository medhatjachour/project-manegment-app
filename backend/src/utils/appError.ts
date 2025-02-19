import { httpStatus, httpStatusCodeType } from "../config/http.config";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../enums/error-code.enum";

export class AppError extends Error {
  public statusCode: httpStatusCodeType;
  public errorCode?: ErrorCodeEnumType;

  constructor(
    message: string,
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCodeEnumType
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpException extends AppError {
  constructor(
    statusCode: httpStatusCodeType,
    errorCode?: ErrorCodeEnumType,
    message = "Http Exception Error"
  ) {
    super(message, statusCode, errorCode);
  }
}

export class InternalServerException extends AppError {
  constructor(
    message = "Internal Server Error",
    errorCode?: ErrorCodeEnumType
  ) {
    super(
      message,
      httpStatus.INTERNAL_SERVER_ERROR,
      errorCode ?? ErrorCodeEnum.INTERNAL_SERVER_ERROR
    );
  }
}

export class NotFoundException extends AppError {
  constructor(message = "Resource not found", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      httpStatus.NOT_FOUND,
      errorCode ?? ErrorCodeEnum.RESOURCE_NOT_FOUND
    );
  }
}

export class BadRequestException extends AppError {
  constructor(message = "Bad Request", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      httpStatus.BAD_REQUEST,
      errorCode ?? ErrorCodeEnum.VALIDATION_ERROR
    );
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized Access", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      httpStatus.UNAUTHORIZED,
      errorCode ?? ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }
}