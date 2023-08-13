import {Request, Response} from 'express';
import {isCelebrateError} from 'celebrate';
import {StatusCodes} from 'http-status-codes';
import {UnauthorizedError} from '../../errors';

enum ErrorResponseCode {
  generalException = 'generalException',
  invalidRequest = 'invalidRequest',
  unauthorized = 'unauthorized',
}

class ErrorResponse {
  constructor(
    readonly code: ErrorResponseCode,
    readonly message: string,
    readonly innerError?: unknown
  ) {}
}

class ErrorHandler {
  public async handleError(error: Error, req: Request, res: Response) {
    req.log.error(error, error.message);

    if (isCelebrateError(error)) {
      const errors = Array.from(error.details, ([, value]) => value.message);
      const errorMessage = errors.join('\n');
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          new ErrorResponse(ErrorResponseCode.invalidRequest, errorMessage)
        );
    }

    if (error instanceof RangeError) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json(
          new ErrorResponse(ErrorResponseCode.invalidRequest, error.message)
        );
    }

    if (error instanceof UnauthorizedError) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          new ErrorResponse(ErrorResponseCode.unauthorized, 'unauthorized')
        );
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          ErrorResponseCode.generalException,
          'internal server error'
        )
      );
  }
}

const errorHandler = new ErrorHandler();

export {errorHandler};
