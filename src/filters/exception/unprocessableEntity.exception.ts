import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export class UnprocessableEntityException extends HttpException {
  constructor(err: ValidationError[]) {
    super(err, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
