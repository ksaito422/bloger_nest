import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UnprocessableEntityException } from 'src/filters/exception/unprocessableEntity.exception';

type validateError = {
  property: string;
  constraints: Record<string, string>;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(exception.stack);

    // validationエラーの場合
    if (exception instanceof UnprocessableEntityException) {
      const exceptionResponse = exception.getResponse();

      const errors = Object(exceptionResponse).map(
        (value: validateError): validateError => {
          return {
            property: value.property,
            constraints: value.constraints,
          };
        },
      );

      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo',
        }),
        path: request.url,
        validateErrors: errors,
      });
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
      path: request.url,
    });
  }
}
