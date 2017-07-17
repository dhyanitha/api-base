import { Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { MongoError, ObjectID } from 'mongodb';

/*400*/
export class BadRequestException extends HttpException {
  constructor(msg: string | object) {
    new Logger('BadRequestException').warn(msg.toString());
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

/*401*/
export class UnauthorizedException extends HttpException {
  constructor(msg: string | object) {
    new Logger('v').warn(msg.toString());
    super(msg, HttpStatus.UNAUTHORIZED);
  }
}

/*403*/
export class ForbiddenException extends HttpException {
  constructor(msg: string | object) {
    new Logger('ForbiddenException').warn(msg.toString());
    super(msg, HttpStatus.FORBIDDEN);
  }
}

/*404*/
export class NotFoundException extends HttpException {
  constructor(msg: string | object) {
    new Logger('NotFoundException').warn(msg.toString());
    super(msg, HttpStatus.NOT_FOUND);
  }
}

/*409*/
export class ConflictException extends HttpException {
  constructor(msg: string | object) {
    new Logger('ConflictException').warn(msg.toString());
    super(msg, HttpStatus.CONFLICT);
  }
}

/*410*/
export class GoneException extends HttpException {
  constructor(msg: string | object) {
    new Logger('GoneException').warn(msg.toString());
    super(msg, HttpStatus.GONE);
  }
}

/*419*/
export class AuthenticationTimeoutException extends HttpException {
  constructor(msg: string | object) {
    new Logger('AuthenticationTimeoutException').warn(msg.toString());
    super(msg, 419);
  }
}

/*500*/
export class InternalServerErrorException extends HttpException {
  constructor(msg: string | object) {
    new Logger('InternalServerErrorException').warn(msg.toString());
    super(msg, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ObjectIDException extends BadRequestException {
  constructor(id: string) {
    new Logger('ObjectIDException').warn(id);
    super(`Id '${id}' is invalid`);
  }
}
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

@Catch(Error)
export class UnknowExceptionFilter implements ExceptionFilter {
  private logger = new Logger('UnknowExceptionFilter');
  private readonly duplicateKey = 11000;
  private readonly invalidId =
  'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
  private readonly EXPIRED_ERROR = "TokenExpiredError";
  private readonly TOKEN_ERROR = "JsonWebTokenError";

  public catch(exception, response) {
    this.logMessage(exception);
    let errorMessage: IErrorMessage = {
      message: 'Unknow Exception',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof MongoError) {
      errorMessage = this.mongoError(exception);
    }

    if (exception instanceof JsonWebTokenError || TokenExpiredError || NotBeforeError) {
      errorMessage = this.jwtParseError(exception);
    }

    if (exception.isValidationError) {
      errorMessage = this.smackError(exception);
    }

    response.status(errorMessage.status).json({ message: errorMessage.message });
  }

  private logMessage(exception) {
    let errorMessage = '';
    Reflect.ownKeys(exception).forEach(k => {
      errorMessage += (`${k}: ${exception[k]}/n`);
    });

    this.logger.log(errorMessage);
  }

  private smackError(exception): IErrorMessage {
    const errorMessage: IErrorMessage = {
      message: 'Unknow Exception',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception.message === this.invalidId) {
      errorMessage.message = exception.message;
      errorMessage.status = HttpStatus.BAD_REQUEST;
    }

    return errorMessage;
  }

  private mongoError(exception): IErrorMessage {
    const errorMessage: IErrorMessage = {
      message: 'Unknow Exception',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    switch (exception.code) {
      case this.duplicateKey:
        errorMessage.message = exception.message;
        errorMessage.status = HttpStatus.CONFLICT;
        break;
    }

    return errorMessage;
  }

  private jwtParseError(exception): IErrorMessage {
    const errorMessage: IErrorMessage = {
      message: 'Unknow Exception',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    switch (exception.name) {
      case this.EXPIRED_ERROR: {
        errorMessage.message = exception.message;
        errorMessage.status = HttpStatus.UNAUTHORIZED;
        break;
      }
      case this.TOKEN_ERROR: {
        errorMessage.message = exception.message;
        errorMessage.status = HttpStatus.UNAUTHORIZED;
        break;
      }
    }

    return errorMessage;
  }
}

interface IErrorMessage {
  message: string;
  status: number;
}
