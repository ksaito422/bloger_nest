import {
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError, EntityNotFoundError, TypeORMError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError, EntityNotFoundError)
export class DbExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception.stack);

    switch (exception.constructor) {
      case QueryFailedError:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
      path: request.url,
    });
  }
}
